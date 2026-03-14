import { db } from '../db';
import { songs, audioFiles } from '../schema';
import { eq, desc, and } from 'drizzle-orm';

type NewSongData = {
  albumId: number;
  audioFileId: number;
  trackNumber: number;
  title: string;
  artist?: string;
  duration: string;
  format: string;
  fileSlug?: string;
  audioUrl?: string;
};

const findSongById = async (id: number) =>
  db.select().from(songs).where(eq(songs.id, id)).get();

const findSongsByAlbum = async (albumId: number) => {
  return db
    .select({
      id: songs.id,
      albumId: songs.albumId,
      audioFileId: songs.audioFileId,
      trackNumber: songs.trackNumber,
      title: songs.title,
      artist: songs.artist,
      duration: songs.duration,
      format: songs.format,
      fileSlug: songs.fileSlug,
      audioUrl: songs.audioUrl,
      createdAt: songs.createdAt,
      audioFilePath: audioFiles.path,
      audioFileName: audioFiles.name,
    })
    .from(songs)
    .leftJoin(audioFiles, eq(songs.audioFileId, audioFiles.id))
    .where(eq(songs.albumId, albumId))
    .orderBy(songs.trackNumber)
    .all();
};

const createSong = async (data: NewSongData) => {
  const result = db
    .insert(songs)
    .values(data)
    .returning({ id: songs.id })
    .get();

  return result.id;
};

const updateSong = async (id: number, data: Partial<NewSongData>) => {
  db.update(songs).set(data).where(eq(songs.id, id)).run();
};

const deleteSong = async (id: number) => {
  db.delete(songs).where(eq(songs.id, id)).run();
};

const deleteSongsByAlbum = async (albumId: number) => {
  db.delete(songs).where(eq(songs.albumId, albumId)).run();
};

const reorderSongs = async (
  albumId: number,
  songOrders: Array<{ id: number; trackNumber: number }>,
) => {
  for (const { id, trackNumber } of songOrders) {
    db.update(songs)
      .set({ trackNumber })
      .where(and(eq(songs.id, id), eq(songs.albumId, albumId)))
      .run();
  }
};

const findSongByAlbumAndFileSlug = async (albumId: number, fileSlug: string) =>
  db
    .select()
    .from(songs)
    .where(and(eq(songs.albumId, albumId), eq(songs.fileSlug, fileSlug)))
    .get();

export {
  findSongById,
  findSongsByAlbum,
  findSongByAlbumAndFileSlug,
  createSong,
  updateSong,
  deleteSong,
  deleteSongsByAlbum,
  reorderSongs,
};

export type { NewSongData };
