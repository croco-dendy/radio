import { readdirSync, statSync } from 'node:fs';
import { join, basename, extname } from 'node:path';

const FOLDER_PATTERN = /^(.+?)_(.+)$/;
const AUDIO_EXT = '.m4a';

export interface ScannedTrack {
  fileSlug: string;
  audioUrl: string;
}

export interface ScannedAlbum {
  folderSlug: string;
  artistName: string;
  albumName: string;
  tracks: ScannedTrack[];
}

/**
 * Converts a slug like "my-cool-album" into a Title Case name "My Cool Album".
 */
function slugToTitle(slug: string): string {
  return slug.replace(/-/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase());
}

/**
 * Strips the vinyl side+track prefix (e.g. "a1-", "b12-") from a file slug
 * and converts the remainder to Title Case.
 *
 * "a1-break-on-through" → "Break On Through"
 * "b5-the-end"          → "The End"
 */
export function trackSlugToTitle(fileSlug: string): string {
  const withoutPrefix = fileSlug.replace(/^[a-z]\d+-/, '');
  return slugToTitle(withoutPrefix);
}

/**
 * Scans a base directory for subdirectories matching the `artist-slug_album-slug` pattern.
 * Inside each matching subdirectory, collects all `.m4a` files as tracks.
 *
 * @param baseDir      - Absolute path to the media root directory
 * @param mediaBaseUrl - URL prefix used to construct audio_url values
 * @returns Array of parsed album objects with their tracks
 */
export function scanMediaDirectory(
  baseDir: string,
  mediaBaseUrl: string,
): ScannedAlbum[] {
  const results: ScannedAlbum[] = [];

  let entries: string[];
  try {
    entries = readdirSync(baseDir);
  } catch {
    return results;
  }

  for (const entry of entries) {
    const entryPath = join(baseDir, entry);

    // Only process directories
    if (!statSync(entryPath).isDirectory()) {
      continue;
    }

    // Match the artist-slug_album-slug naming convention
    const match = entry.match(FOLDER_PATTERN);
    if (!match) {
      continue;
    }

    const [, artistSlug, albumSlug] = match;
    const folderSlug = entry;

    // Collect all .m4a files inside this subdirectory
    let files: string[];
    try {
      files = readdirSync(entryPath);
    } catch {
      continue;
    }

    const tracks: ScannedTrack[] = files
      .filter((file) => extname(file).toLowerCase() === AUDIO_EXT)
      .sort()
      .map((file) => {
        const fileSlug = basename(file, AUDIO_EXT);
        return {
          fileSlug,
          audioUrl: `${mediaBaseUrl}/${folderSlug}/${file}`,
        };
      });

    results.push({
      folderSlug,
      artistName: slugToTitle(artistSlug),
      albumName: slugToTitle(albumSlug),
      tracks,
    });
  }

  return results;
}
