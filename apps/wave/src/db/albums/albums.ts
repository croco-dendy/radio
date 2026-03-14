import { db } from '../db';
import { albums, songs } from '../schema';
import { eq, desc, sql, and, like, isNotNull } from 'drizzle-orm';

type NewAlbumData = {
  title: string;
  artist: string;
  year?: number;
  coverArtPath?: string;
  description?: string;
  tags?: string;
  isPublic?: number;
  ownerId: number;
  folderSlug?: string;
  hasMedia?: number;
  isPublished?: number;
  releaseYear?: number;
  rpmSpeed?: string;
  vinylCondition?: string;
  digitizationDate?: string;
  equipmentUsed?: string;
};

const findAlbumById = async (id: number) =>
  db.select().from(albums).where(eq(albums.id, id)).get();

const findAlbumsByOwner = async (ownerId: number, limit = 50, offset = 0) => {
  const result = await db
    .select({
      id: albums.id,
      title: albums.title,
      artist: albums.artist,
      year: albums.year,
      coverArtPath: albums.coverArtPath,
      description: albums.description,
      tags: albums.tags,
      isPublic: albums.isPublic,
      ownerId: albums.ownerId,
      folderSlug: albums.folderSlug,
      hasMedia: albums.hasMedia,
      isPublished: albums.isPublished,
      releaseYear: albums.releaseYear,
      rpmSpeed: albums.rpmSpeed,
      vinylCondition: albums.vinylCondition,
      digitizationDate: albums.digitizationDate,
      equipmentUsed: albums.equipmentUsed,
      createdAt: albums.createdAt,
      updatedAt: albums.updatedAt,
      songCount: sql<number>`COALESCE(COUNT(${songs.id}), 0)`.as('songCount'),
    })
    .from(albums)
    .leftJoin(songs, eq(albums.id, songs.albumId))
    .where(eq(albums.ownerId, ownerId))
    .groupBy(albums.id)
    .orderBy(desc(albums.createdAt))
    .limit(limit)
    .offset(offset)
    .all();

  return result.map((album) => ({
    ...album,
    songCount: Number(album.songCount),
  }));
};

const findPublicAlbums = async (limit = 50, offset = 0) => {
  return db
    .select()
    .from(albums)
    .where(eq(albums.isPublic, 1))
    .orderBy(desc(albums.createdAt))
    .limit(limit)
    .offset(offset)
    .all();
};

const findPublicAlbumsWithFilters = async (
  filters: {
    artist?: string;
    year?: number;
    tags?: string[];
    search?: string;
  },
  limit = 50,
  offset = 0,
) => {
  const conditions = [eq(albums.isPublic, 1)];

  if (filters.artist) {
    conditions.push(like(albums.artist, `%${filters.artist}%`));
  }

  if (filters.year) {
    conditions.push(eq(albums.year, filters.year));
  }

  if (filters.search) {
    conditions.push(
      sql`(${albums.title} LIKE ${`%${filters.search}%`} OR ${albums.artist} LIKE ${`%${filters.search}%`})`,
    );
  }

  return db
    .select()
    .from(albums)
    .where(and(...conditions))
    .orderBy(desc(albums.createdAt))
    .limit(limit)
    .offset(offset)
    .all();
};

const createAlbum = async (data: NewAlbumData) => {
  const result = db
    .insert(albums)
    .values({
      ...data,
      isPublic: data.isPublic ?? 0,
    })
    .returning({ id: albums.id })
    .get();

  return result.id;
};

const updateAlbum = async (id: number, data: Partial<NewAlbumData>) => {
  db.update(albums)
    .set({
      ...data,
      updatedAt: sql`CURRENT_TIMESTAMP`,
    })
    .where(eq(albums.id, id))
    .run();
};

const deleteAlbum = async (id: number) => {
  db.delete(albums).where(eq(albums.id, id)).run();
};

const updateAlbumCoverArt = async (id: number, coverArtPath: string) => {
  db.update(albums)
    .set({
      coverArtPath,
      updatedAt: sql`CURRENT_TIMESTAMP`,
    })
    .where(eq(albums.id, id))
    .run();
};

const findAlbumByFolderSlug = async (folderSlug: string) =>
  db.select().from(albums).where(eq(albums.folderSlug, folderSlug)).get();

const findAlbumsWithFolderSlug = async () =>
  db
    .select({
      id: albums.id,
      folderSlug: albums.folderSlug,
      hasMedia: albums.hasMedia,
    })
    .from(albums)
    .where(isNotNull(albums.folderSlug))
    .all();

export {
  findAlbumById,
  findAlbumsByOwner,
  findPublicAlbums,
  findPublicAlbumsWithFilters,
  findAlbumByFolderSlug,
  findAlbumsWithFolderSlug,
  createAlbum,
  updateAlbum,
  deleteAlbum,
  updateAlbumCoverArt,
};

export type { NewAlbumData };
