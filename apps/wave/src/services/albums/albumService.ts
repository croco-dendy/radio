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
  updateAlbumCoverArt,
  type NewAlbumData,
} from '@/db/albums/albums';
import { findSongsByAlbum } from '@/db/albums/songs';
import { authService } from '../auth';
import { getErrorMessage } from '@/utils/errorMessages';

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
    return findPublicAlbums(limit, offset);
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
    return findPublicAlbumsWithFilters(filters, limit, offset);
  }

  async getUserAlbums(accountId: number, limit: number, offset: number) {
    return findAlbumsByOwner(accountId, limit, offset);
  }

  async getAlbumById(id: number) {
    const album = await findAlbumById(id);
    if (!album) {
      throw new Error(getErrorMessage.collection('NOT_FOUND', id));
    }
    return album;
  }

  async getAlbumWithSongs(id: number) {
    const album = await this.getAlbumById(id);
    const songs = await findSongsByAlbum(id);
    return { ...album, songs };
  }

  async createAlbum(
    accountId: number,
    data: Omit<NewAlbumData, 'ownerId'>,
  ) {
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

    if (album.coverArtPath && existsSync(album.coverArtPath)) {
      unlinkSync(album.coverArtPath);
    }

    await deleteAlbum(id);
  }

  async uploadCoverArt(albumId: number, accountId: number, file: File) {
    const album = await this.getAlbumById(albumId);
    await authService.requireOwnership(accountId, album.ownerId);

    const extension = file.name.split('.').pop() || 'jpg';
    const fileName = this.generateCoverFileName(albumId, extension);
    const filePath = join(this.coversDir, fileName);

    if (album.coverArtPath && existsSync(album.coverArtPath)) {
      unlinkSync(album.coverArtPath);
    }

    const buffer = await file.arrayBuffer();
    writeFileSync(filePath, new Uint8Array(buffer));

    await updateAlbumCoverArt(albumId, filePath);

    return {
      coverArtPath: filePath,
      fileName,
    };
  }

  async getCoverArt(albumId: number) {
    const album = await this.getAlbumById(albumId);

    if (!album.coverArtPath || !existsSync(album.coverArtPath)) {
      throw new Error('Cover art not found');
    }

    const buffer = readFileSync(album.coverArtPath);
    const extension = album.coverArtPath.split('.').pop() || 'jpg';
    const mimeType = this.getMimeType(extension);

    return {
      buffer,
      mimeType,
      size: buffer.length,
    };
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

