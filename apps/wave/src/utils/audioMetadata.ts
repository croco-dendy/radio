import { parseFile } from 'music-metadata';
import { existsSync } from 'node:fs';

/**
 * Extract duration in seconds from an audio file
 * @param filePath - Absolute path to the audio file
 * @returns Duration in seconds, or null if extraction fails
 */
export async function extractDurationFromFile(
  filePath: string,
): Promise<number | null> {
  try {
    if (!existsSync(filePath)) {
      return null;
    }

    const metadata = await parseFile(filePath);
    const duration = metadata.format.duration;

    if (duration && !Number.isNaN(duration) && duration > 0) {
      return duration;
    }

    return null;
  } catch (error) {
    // Handle errors gracefully (corrupted files, unsupported formats, etc.)
    console.error(`Failed to extract duration from ${filePath}:`, error);
    return null;
  }
}

/**
 * Format duration from seconds to MM:SS format
 * @param seconds - Duration in seconds
 * @returns Formatted duration string (MM:SS) or null if invalid
 */
export function formatDuration(seconds: number): string | null {
  if (!seconds || Number.isNaN(seconds) || seconds <= 0) {
    return null;
  }

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);

  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
}

/**
 * Format duration from string (handles existing formats: seconds, MM:SS, invalid values)
 * @param duration - Duration string (could be seconds as string, MM:SS, or invalid)
 * @returns Formatted duration string (MM:SS) or null if invalid
 */
export function formatDurationFromString(
  duration: string | null | undefined,
): string | null {
  if (!duration || duration.trim() === '') {
    return null;
  }

  // Handle '0:00' or '0' as invalid/unknown duration
  if (duration === '0:00' || duration === '0') {
    return null;
  }

  // If duration is in seconds format (e.g., "125"), convert to MM:SS
  const seconds = Number.parseInt(duration, 10);
  if (
    !Number.isNaN(seconds) &&
    duration === seconds.toString() &&
    seconds > 0
  ) {
    return formatDuration(seconds);
  }

  // Return the duration as-is if it's already in MM:SS format
  // Validate MM:SS format (e.g., "2:05", "10:30")
  const mmssPattern = /^\d+:\d{2}$/;
  if (mmssPattern.test(duration)) {
    return duration;
  }

  // Invalid format
  return null;
}
