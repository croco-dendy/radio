# Extract and Format Audio Duration in Backend

## Current State Analysis

Duration extraction and formatting is currently handled inconsistently:
- **Backend**: `extractAudioMetadata()` in `audioFileService.ts` returns placeholder `'0:00'` with TODO comment
- **Backend**: `syncMediaService.ts` hardcodes duration as `'0:00'` when syncing tracks
- **Frontend**: `song-item.tsx` has complex fallback logic that loads audio metadata in browser to extract duration
- **Frontend**: `collection-detail.tsx` has simple formatting logic
- Duration can be stored in multiple formats: seconds as string ("125"), MM:SS ("2:05"), or invalid values ("0:00", "0")

## Implementation Plan

### 1. Add Audio Metadata Extraction Library

Install `music-metadata` package (or use `ffprobe` via command line since FFmpeg is already available):
- Add `music-metadata` to `apps/wave/package.json` dependencies
- This library can extract duration from various audio formats (mp3, m4a, flac, etc.)

### 2. Create Duration Utility Functions

Create `apps/wave/src/utils/audioMetadata.ts` with:
- `extractDurationFromFile(filePath: string): Promise<number>` - Extract duration in seconds from file path
- `formatDuration(seconds: number): string | null` - Format seconds to MM:SS or return null for invalid
- `formatDurationFromString(duration: string): string | null` - Handle existing duration strings (seconds, MM:SS, invalid)

### 3. Update Audio File Service

Update `apps/wave/src/services/audioFiles/audioFileService.ts`:
- Replace placeholder `extractAudioMetadata()` with real implementation using `music-metadata`
- Extract actual duration from uploaded file
- Format duration to MM:SS before storing

### 4. Update Media Sync Service

Update `apps/wave/src/services/albums/syncMediaService.ts`:
- In `syncTracks()`, extract duration from actual audio files instead of hardcoding `'0:00'`
- Use file path from scanned tracks to extract duration
- Format duration before storing in database

### 5. Apply Formatting in Service Layer

Ensure all services format duration consistently before returning:
- `songService.getSongsByAlbum()` - Format song durations
- `albumService.getAlbumWithSongs()` - Format song durations
- `collectionService.getCollectionWithItems()` - Format audio file durations
- `audioFileService.getAudioFileById()` - Format audio file duration

### 6. Remove Frontend Formatting Logic

**Remove from `apps/admin/src/features/collection/components/content/albums/songs/song-item.tsx`**:
- Remove `formatDuration()` function (lines 14-38)
- Remove `formatDurationFromSeconds()` function (lines 40-47)
- Remove the `useEffect` that loads audio metadata for duration fallback (lines 64-106)
- Remove `audioDuration` state (line 57)
- Simplify duration display to use `song.duration` directly (line 172)

**Remove from `apps/admin/src/features/collection/components/content/playlists/collection-detail.tsx`**:
- Remove `formatDuration()` function (lines 56-59)
- Use `item.duration` directly (line 170)

### 7. Handle File Paths for Media Sync

When syncing tracks, need to construct full file paths:
- Track files are in: `${baseDir}/${folderSlug}/${fileSlug}.m4a`
- Extract duration from these files during sync
- Handle errors gracefully (file not found, invalid format, etc.)

## Data Flow

```
Audio File Upload:
  File → extractDurationFromFile() → formatDuration() → Database (MM:SS or null)

Media Sync:
  File Path → extractDurationFromFile() → formatDuration() → Database (MM:SS or null)

API Response:
  Database (MM:SS or null) → Service Layer (format if needed) → Frontend (display directly)
```

## Files to Modify

**Backend:**
- `apps/wave/package.json` (add music-metadata dependency)
- `apps/wave/src/utils/audioMetadata.ts` (new file)
- `apps/wave/src/services/audioFiles/audioFileService.ts`
- `apps/wave/src/services/albums/syncMediaService.ts`
- `apps/wave/src/services/albums/songService.ts` (format duration in responses)
- `apps/wave/src/services/albums/albumService.ts` (format duration in responses)
- `apps/wave/src/services/collections/collectionService.ts` (format duration in responses)

**Frontend:**
- `apps/admin/src/features/collection/components/content/albums/songs/song-item.tsx`
- `apps/admin/src/features/collection/components/content/playlists/collection-detail.tsx`

## Notes

- Duration will always be returned as MM:SS format string or null
- Frontend can display duration directly without any transformation
- The fallback to loading audio metadata in the frontend will be removed since backend extracts real duration
- Need to handle errors gracefully when extracting duration (file not found, corrupted files, unsupported formats)
- For media sync, duration extraction may be slow for large libraries - consider making it async/non-blocking or adding progress reporting
