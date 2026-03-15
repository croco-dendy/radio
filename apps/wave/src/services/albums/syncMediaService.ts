import { join } from 'node:path';
import {
  findAlbumByFolderSlug,
  findAlbumsWithFolderSlug,
  createAlbum,
  updateAlbum,
} from '@/db/albums/albums';
import {
  findSongByAlbumAndFileSlug,
  createSong,
  updateSong,
} from '@/db/albums/songs';
import {
  scanMediaDirectory,
  trackSlugToTitle,
  type ScannedAlbum,
} from '@/utils/scanMediaDirectory';
import {
  extractDurationFromFile,
  formatDuration,
} from '@/utils/audioMetadata';

export interface SyncResult {
  albumsCreated: number;
  albumsUpdated: number;
  albumsMarkedOffline: number;
  tracksCreated: number;
  tracksUpdated: number;
  errors: string[];
}

/**
 * Scans a media directory and synchronises the results into the database.
 *
 * Album logic:
 *   – If an album with the given folder_slug exists → set has_media = true.
 *   – If it doesn't exist → create it (has_media = true, is_published = false).
 *   – Albums that have a folder_slug in the DB but were NOT found in this scan → has_media = false.
 *
 * Track logic (upsert by album_id + file_slug):
 *   – New track   → INSERT with defaults derived from the file slug.
 *   – Existing track → UPDATE duration (extracted from file) if successfully extracted.
 *   – NEVER overwrites manually-entered metadata (title, artist).
 *   – Duration is always recalculated from the file during sync.
 *   – audio_url is computed dynamically at API layer, not stored in database.
 *
 * @param baseDir      – absolute path to the media root directory
 * @param mediaBaseUrl – URL prefix used to construct audio_url values (not stored, only for scanning)
 * @param ownerId      – account id used as the owner when creating new albums
 */
export async function syncMediaToDatabase(
  baseDir: string,
  mediaBaseUrl: string,
  ownerId: number,
): Promise<SyncResult> {
  const result: SyncResult = {
    albumsCreated: 0,
    albumsUpdated: 0,
    albumsMarkedOffline: 0,
    tracksCreated: 0,
    tracksUpdated: 0,
    errors: [],
  };

  // 1. Scan the file system
  const scannedAlbums = scanMediaDirectory(baseDir, mediaBaseUrl);
  const scannedSlugs = new Set(scannedAlbums.map((a) => a.folderSlug));

  // 2. Sync each scanned album → DB
  for (const scanned of scannedAlbums) {
    try {
      const albumId = await syncAlbum(scanned, ownerId, result);
      await syncTracks(albumId, scanned, result, baseDir);
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      result.errors.push(`[${scanned.folderSlug}] ${msg}`);
    }
  }

  // 3. Mark albums that are no longer on disk as has_media = false
  try {
    await markMissingAlbums(scannedSlugs, result);
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    result.errors.push(`[mark-missing] ${msg}`);
  }

  return result;
}

// ---------------------------------------------------------------------------
// Internal helpers
// ---------------------------------------------------------------------------

async function syncAlbum(
  scanned: ScannedAlbum,
  ownerId: number,
  result: SyncResult,
): Promise<number> {
  const existing = await findAlbumByFolderSlug(scanned.folderSlug);

  if (existing) {
    // Only touch hasMedia – never overwrite other metadata
    const updateData: { hasMedia?: number; cover?: string } = {};
    if (!existing.hasMedia) {
      updateData.hasMedia = 1;
    }
    // Update cover only if it's currently null (don't overwrite manually set covers)
    if (scanned.cover && !existing.cover) {
      updateData.cover = scanned.cover;
    }
    if (Object.keys(updateData).length > 0) {
      await updateAlbum(existing.id, updateData);
    }
    result.albumsUpdated++;
    return existing.id;
  }

  // Create a brand-new album from the scan data
  const albumId = await createAlbum({
    title: scanned.albumName,
    artist: scanned.artistName,
    ownerId,
    folderSlug: scanned.folderSlug,
    hasMedia: 1,
    isPublished: 0,
    isPublic: 0,
    cover: scanned.cover,
  });

  result.albumsCreated++;
  return albumId;
}

async function syncTracks(
  albumId: number,
  scanned: ScannedAlbum,
  result: SyncResult,
  baseDir: string,
): Promise<void> {
  for (let i = 0; i < scanned.tracks.length; i++) {
    const track = scanned.tracks[i];
    const existing = await findSongByAlbumAndFileSlug(albumId, track.fileSlug);

    // Extract duration from the actual audio file
    const filePath = join(baseDir, scanned.folderSlug, `${track.fileSlug}.m4a`);
    let duration: string | null = null;

    try {
      const durationSeconds = await extractDurationFromFile(filePath);
      if (durationSeconds !== null) {
        duration = formatDuration(durationSeconds);
      }
    } catch (error) {
      // Handle errors gracefully - continue with null duration
      const msg = error instanceof Error ? error.message : String(error);
      result.errors.push(
        `[${scanned.folderSlug}/${track.fileSlug}] Failed to extract duration: ${msg}`,
      );
    }

    if (existing) {
      // Track already exists - update duration if we successfully extracted it
      // Duration is a technical property extracted from the file, so it's safe to update
      if (duration) {
        await updateSong(existing.id, { duration });
        result.tracksUpdated++;
      }
      // audio_url is computed dynamically at API layer, not stored
      continue;
    }

    // Insert a new track with sensible defaults.
    // Manual metadata (title, artist) can be edited later via the admin UI.
    // Duration is always extracted from the file.
    // audioFileId is set to 0 as a placeholder – these tracks come from the
    // media directory and don't have an associated audioFiles record.
    // audio_url is computed dynamically at API layer using MEDIA_BASE_URL
    await createSong({
      albumId,
      audioFileId: 0,
      trackNumber: i + 1,
      title: trackSlugToTitle(track.fileSlug),
      duration: duration || '0:00',
      format: 'm4a',
      fileSlug: track.fileSlug,
    });

    result.tracksCreated++;
  }
}

async function markMissingAlbums(
  scannedSlugs: Set<string>,
  result: SyncResult,
): Promise<void> {
  const albumsWithSlug = await findAlbumsWithFolderSlug();

  for (const album of albumsWithSlug) {
    if (
      album.folderSlug &&
      !scannedSlugs.has(album.folderSlug) &&
      album.hasMedia
    ) {
      await updateAlbum(album.id, { hasMedia: 0 });
      result.albumsMarkedOffline++;
    }
  }
}
