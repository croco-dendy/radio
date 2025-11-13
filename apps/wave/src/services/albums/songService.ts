import {
  findSongById,
  findSongsByAlbum,
  createSong,
  updateSong,
  deleteSong,
  reorderSongs,
  type NewSongData,
} from '@/db/albums/songs';
import { findAudioFileById } from '@/db/collections/audioFiles';
import { authService } from '../auth';
import { albumService } from './albumService';
import { getErrorMessage } from '@/utils/errorMessages';

export class SongService {
  async getSongById(id: number) {
    const song = await findSongById(id);
    if (!song) {
      throw new Error('Song not found');
    }
    return song;
  }

  async getSongsByAlbum(albumId: number) {
    return findSongsByAlbum(albumId);
  }

  async addSongToAlbum(
    albumId: number,
    accountId: number,
    audioFileId: number,
    data: { trackNumber: number; title: string; artist?: string },
  ) {
    const album = await albumService.getAlbumById(albumId);
    await authService.requireOwnership(accountId, album.ownerId);

    const audioFile = await findAudioFileById(audioFileId);
    if (!audioFile) {
      throw new Error('Audio file not found');
    }

    const songData: NewSongData = {
      albumId,
      audioFileId,
      trackNumber: data.trackNumber,
      title: data.title,
      artist: data.artist,
      duration: audioFile.duration,
      format: audioFile.format,
    };

    return createSong(songData);
  }

  async updateSong(
    id: number,
    accountId: number,
    data: Partial<Omit<NewSongData, 'albumId' | 'audioFileId'>>,
  ) {
    const song = await this.getSongById(id);
    const album = await albumService.getAlbumById(song.albumId);
    await authService.requireOwnership(accountId, album.ownerId);

    await updateSong(id, data);
  }

  async deleteSong(id: number, accountId: number) {
    const song = await this.getSongById(id);
    const album = await albumService.getAlbumById(song.albumId);
    await authService.requireOwnership(accountId, album.ownerId);

    await deleteSong(id);
  }

  async reorderSongs(
    albumId: number,
    accountId: number,
    songOrders: Array<{ id: number; trackNumber: number }>,
  ) {
    const album = await albumService.getAlbumById(albumId);
    await authService.requireOwnership(accountId, album.ownerId);

    await reorderSongs(albumId, songOrders);
  }
}

export const songService = new SongService();

