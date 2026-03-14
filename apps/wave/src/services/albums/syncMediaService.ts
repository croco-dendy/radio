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
 *   – Existing track → only UPDATE audio_url if it changed.
 *   – NEVER overwrites manually-entered metadata (title, artist, duration, etc.).
 *
 * @param baseDir      – absolute path to the media root directory
 * @param mediaBaseUrl – URL prefix used to construct audio_url values
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
      await syncTracks(albumId, scanned, result);
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
    if (!existing.hasMedia) {
      await updateAlbum(existing.id, { hasMedia: 1 });
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
  });

  result.albumsCreated++;
  return albumId;
}

async function syncTracks(
  albumId: number,
  scanned: ScannedAlbum,
  result: SyncResult,
): Promise<void> {
  for (let i = 0; i < scanned.tracks.length; i++) {
    const track = scanned.tracks[i];
    const existing = await findSongByAlbumAndFileSlug(albumId, track.fileSlug);

    if (existing) {
      // Only update audioUrl if it actually changed – never touch other fields
      if (existing.audioUrl !== track.audioUrl) {
        await updateSong(existing.id, { audioUrl: track.audioUrl });
        result.tracksUpdated++;
      }
      continue;
    }

    // Insert a new track with sensible defaults.
    // Manual metadata (title, artist, duration) can be edited later via the admin UI.
    // audioFileId is set to 0 as a placeholder – these tracks come from the
    // media directory and don't have an associated audioFiles record.
    await createSong({
      albumId,
      audioFileId: 0,
      trackNumber: i + 1,
      title: trackSlugToTitle(track.fileSlug),
      duration: '0:00',
      format: 'm4a',
      fileSlug: track.fileSlug,
      audioUrl: track.audioUrl,
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
