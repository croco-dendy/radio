import { join } from 'node:path';
import {
  existsSync,
  mkdirSync,
  writeFileSync,
  unlinkSync,
  readFileSync,
} from 'node:fs';
import {
  findAlbumById,
  findAlbumsByOwner,
  findPublicAlbums,
  findPublicAlbumsWithFilters,
  createAlbum,
  updateAlbum,
  deleteAlbum,
  updateAlbumCover,
  type NewAlbumData,
} from '@/db/albums/albums';
import { findSongsByAlbum } from '@/db/albums/songs';
import { authService } from '../auth';
import { getErrorMessage } from '@/utils/errorMessages';
import { env } from '@/utils/env';
import { formatDurationFromString } from '@/utils/audioMetadata';

export class AlbumService {
  private coversDir: string;

  constructor() {
    this.coversDir = join(process.cwd(), 'data', 'uploads', 'covers');
    this.ensureCoversDir();
  }

  private ensureCoversDir() {
    if (!existsSync(this.coversDir)) {
      mkdirSync(this.coversDir, { recursive: true });
    }
  }

  private generateCoverFileName(albumId: number, extension: string): string {
    const timestamp = Date.now();
    return `cover_${albumId}_${timestamp}.${extension}`;
  }

  private getMimeType(extension: string): string {
    const mimeTypes: Record<string, string> = {
      jpg: 'image/jpeg',
      jpeg: 'image/jpeg',
      png: 'image/png',
      webp: 'image/webp',
    };
    return mimeTypes[extension.toLowerCase()] || 'image/jpeg';
  }

  async getPublicAlbums(limit: number, offset: number) {
    const albums = await findPublicAlbums(limit, offset);
    return albums.map((album) => ({
      ...album,
      coverImageUrl: this.computeCoverImageUrl(
        album.folderSlug,
        album.cover,
        album.id,
      ),
    }));
  }

  async getPublicAlbumsWithFilters(
    filters: {
      artist?: string;
      year?: number;
      tags?: string[];
      search?: string;
    },
    limit: number,
    offset: number,
  ) {
    const albums = await findPublicAlbumsWithFilters(filters, limit, offset);
    return albums.map((album) => ({
      ...album,
      coverImageUrl: this.computeCoverImageUrl(
        album.folderSlug,
        album.cover,
        album.id,
      ),
    }));
  }

  async getUserAlbums(accountId: number, limit: number, offset: number) {
    const albums = await findAlbumsByOwner(accountId, limit, offset);
    return albums.map((album) => ({
      ...album,
      coverImageUrl: this.computeCoverImageUrl(
        album.folderSlug,
        album.cover,
        album.id,
      ),
    }));
  }

  async getAlbumById(id: number) {
    const album = await findAlbumById(id);
    if (!album) {
      throw new Error(getErrorMessage.collection('NOT_FOUND', id));
    }
    return {
      ...album,
      coverImageUrl: this.computeCoverImageUrl(
        album.folderSlug,
        album.cover,
        album.id,
      ),
    };
  }

  /**
   * Computes audioUrl dynamically for tracks based on MEDIA_BASE_URL, album folderSlug, and track fileSlug.
   * Format: ${MEDIA_BASE_URL}/${folderSlug}/${fileSlug}.m4a
   */
  private computeAudioUrl(
    folderSlug: string | null,
    fileSlug: string | null,
  ): string | null {
    if (!folderSlug || !fileSlug) {
      return null;
    }
    // Normalize MEDIA_BASE_URL to remove trailing slashes
    const normalizedBaseUrl = env.mediaBaseUrl.replace(/\/+$/, '');
    return `${normalizedBaseUrl}/${folderSlug}/${fileSlug}.m4a`;
  }

  /**
   * Computes coverImageUrl dynamically for albums.
   * - If cover is a relative path (starts with "img/"), compute from MEDIA_BASE_URL
   * - If cover is set but not a relative path, it's an uploaded cover - use cover endpoint
   * - If cover is null, fallback to default media folder cover (img/cover.webp)
   */
  private computeCoverImageUrl(
    folderSlug: string | null,
    cover: string | null,
    albumId?: number,
  ): string | null {
    // If cover is set and is a relative path from media folder
    if (cover?.startsWith('img/')) {
      if (!folderSlug) {
        return null;
      }
      const normalizedBaseUrl = env.mediaBaseUrl.replace(/\/+$/, '');
      return `${normalizedBaseUrl}/${folderSlug}/${cover}`;
    }

    // If cover is set but not a relative path, it's an uploaded cover
    // Use the cover endpoint to serve it
    if (cover && !cover.startsWith('img/') && albumId) {
      // For uploaded covers, use the API endpoint
      // For uploaded covers, construct API endpoint URL
      // Extract origin from mediaBaseUrl
      try {
        const url = new URL(env.mediaBaseUrl);
        return `${url.origin}/api/albums/${albumId}/cover`;
      } catch {
        // Fallback if mediaBaseUrl is not a full URL
        return `/api/albums/${albumId}/cover`;
      }
    }

    // Fallback: if cover is null but folderSlug exists, use default media folder cover
    if (!cover && folderSlug) {
      const normalizedBaseUrl = env.mediaBaseUrl.replace(/\/+$/, '');
      return `${normalizedBaseUrl}/${folderSlug}/img/cover.webp`;
    }

    return null;
  }

  async getAlbumWithSongs(id: number) {
    const album = await this.getAlbumById(id);
    const songs = await findSongsByAlbum(id);

    // Add computed audioUrl and format duration for each song
    const songsWithAudioUrl = songs.map((song) => ({
      ...song,
      audioUrl: this.computeAudioUrl(album.folderSlug, song.fileSlug),
      duration: formatDurationFromString(song.duration) || null,
    }));

    return { ...album, songs: songsWithAudioUrl };
  }

  async createAlbum(accountId: number, data: Omit<NewAlbumData, 'ownerId'>) {
    const albumData: NewAlbumData = {
      ...data,
      ownerId: accountId,
    };
    return createAlbum(albumData);
  }

  async updateAlbum(
    id: number,
    accountId: number,
    data: Partial<NewAlbumData>,
  ) {
    const album = await this.getAlbumById(id);
    await authService.requireOwnership(accountId, album.ownerId);
    await updateAlbum(id, data);
  }

  async deleteAlbum(id: number, accountId: number) {
    const album = await this.getAlbumById(id);
    await authService.requireOwnership(accountId, album.ownerId);

    // Delete uploaded cover file if it exists and is not from media folder
    if (
      album.cover &&
      !album.cover.startsWith('img/') &&
      existsSync(album.cover)
    ) {
      unlinkSync(album.cover);
    }

    await deleteAlbum(id);
  }

  async uploadCoverArt(albumId: number, accountId: number, file: File) {
    const album = await this.getAlbumById(albumId);
    await authService.requireOwnership(accountId, album.ownerId);

    const extension = file.name.split('.').pop() || 'jpg';
    const fileName = this.generateCoverFileName(albumId, extension);
    const filePath = join(this.coversDir, fileName);

    // Delete old uploaded cover file if it exists
    if (
      album.cover &&
      !album.cover.startsWith('img/') &&
      existsSync(album.cover)
    ) {
      unlinkSync(album.cover);
    }

    const buffer = await file.arrayBuffer();
    writeFileSync(filePath, new Uint8Array(buffer));

    // Save file path to cover field
    await updateAlbumCover(albumId, filePath);

    return {
      cover: filePath,
      fileName,
    };
  }

  async getCoverArt(albumId: number) {
    const album = await this.getAlbumById(albumId);

    // If cover is from media folder, we need to read from media root
    if (album.cover?.startsWith('img/')) {
      if (!album.folderSlug) {
        throw new Error('Cover art not found');
      }
      const coverPath = join(env.mediaRootPath, album.folderSlug, album.cover);
      if (!existsSync(coverPath)) {
        throw new Error('Cover art not found');
      }
      const buffer = readFileSync(coverPath);
      const extension = album.cover.split('.').pop() || 'webp';
      const mimeType = this.getMimeType(extension);
      return {
        buffer,
        mimeType,
        size: buffer.length,
      };
    }

    // If cover is an uploaded file path
    if (album.cover && !album.cover.startsWith('img/')) {
      if (!existsSync(album.cover)) {
        throw new Error('Cover art not found');
      }
      const buffer = readFileSync(album.cover);
      const extension = album.cover.split('.').pop() || 'jpg';
      const mimeType = this.getMimeType(extension);
      return {
        buffer,
        mimeType,
        size: buffer.length,
      };
    }

    throw new Error('Cover art not found');
  }

  async checkAlbumAccess(
    album: { isPublic: boolean | number | null; ownerId: number },
    accountId?: number,
  ) {
    if (album.isPublic) {
      return true;
    }

    if (!accountId) {
      throw new Error(getErrorMessage.auth('UNAUTHORIZED'));
    }

    if (album.ownerId !== accountId) {
      throw new Error(getErrorMessage.auth('FORBIDDEN'));
    }

    return true;
  }
}

export const albumService = new AlbumService();
