import { join } from 'node:path';
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import type { AudioTrack, NowPlaying } from '../types/streaming';

export class AudioTrackService {
  private audioTracks: AudioTrack[] = [];
  private currentTrackIndex = 0;
  private playlistStartTime = Date.now();
  private dataDir = join(process.cwd(), 'data');
  private tracksFile = join(this.dataDir, 'audio-tracks.json');

  constructor() {
    this.initializeDataDirectory();
    this.loadAudioTracks();
  }

  private async initializeDataDirectory() {
    if (!existsSync(this.dataDir)) {
      await mkdir(this.dataDir, { recursive: true });
    }
  }

  // Load audio tracks from file
  private async loadAudioTracks(): Promise<void> {
    try {
      if (existsSync(this.tracksFile)) {
        const data = await readFile(this.tracksFile, 'utf-8');
        this.audioTracks = JSON.parse(data);
      } else {
        // Initialize with default track
        this.audioTracks = [
          {
            id: 'default-1',
            url: 'https://stream.adoo.one/audio/money-for-nothing.mp3',
            title: 'Money for Nothing',
            addedAt: new Date().toISOString(),
          },
        ];
        await this.saveAudioTracks();
      }
    } catch (error) {
      console.error('Error loading audio tracks:', error);
      this.audioTracks = [];
    }
  }

  // Save audio tracks to file
  private async saveAudioTracks(): Promise<void> {
    try {
      await writeFile(
        this.tracksFile,
        JSON.stringify(this.audioTracks, null, 2),
      );
    } catch (error) {
      console.error('Error saving audio tracks:', error);
    }
  }

  // Get all audio tracks
  async getAudioTracks(): Promise<AudioTrack[]> {
    return this.audioTracks;
  }

  // Add new audio track
  async addAudioTrack(
    track: Omit<AudioTrack, 'id' | 'addedAt'>,
  ): Promise<AudioTrack> {
    const newTrack: AudioTrack = {
      ...track,
      id: `track-${Date.now()}`,
      addedAt: new Date().toISOString(),
    };

    this.audioTracks.push(newTrack);
    await this.saveAudioTracks();

    return newTrack;
  }

  // Update audio track
  async updateAudioTrack(
    id: string,
    updates: Partial<AudioTrack>,
  ): Promise<AudioTrack> {
    const trackIndex = this.audioTracks.findIndex((track) => track.id === id);

    if (trackIndex === -1) {
      throw new Error(`Track with id ${id} not found`);
    }

    this.audioTracks[trackIndex] = {
      ...this.audioTracks[trackIndex],
      ...updates,
    };

    await this.saveAudioTracks();
    return this.audioTracks[trackIndex];
  }

  // Delete audio track
  async deleteAudioTrack(id: string): Promise<void> {
    const trackIndex = this.audioTracks.findIndex((track) => track.id === id);

    if (trackIndex === -1) {
      throw new Error(`Track with id ${id} not found`);
    }

    this.audioTracks.splice(trackIndex, 1);
    await this.saveAudioTracks();

    // Adjust current track index if necessary
    if (this.currentTrackIndex >= this.audioTracks.length) {
      this.currentTrackIndex = Math.max(0, this.audioTracks.length - 1);
    }
  }

  // Get current track
  getCurrentTrack(): AudioTrack | undefined {
    if (this.audioTracks.length === 0) {
      return undefined;
    }
    return this.audioTracks[this.currentTrackIndex];
  }

  // Get now playing information
  async getNowPlaying(): Promise<NowPlaying> {
    const currentTrack = this.getCurrentTrack();
    const now = Date.now();
    const elapsed = now - this.playlistStartTime;

    if (!currentTrack || !currentTrack.duration) {
      return {
        track: currentTrack,
        position: 0,
        duration: 0,
        isPlaying: false,
      };
    }

    const position = Math.min(elapsed / 1000, currentTrack.duration);
    const isPlaying = position < currentTrack.duration;

    return {
      track: currentTrack,
      position,
      duration: currentTrack.duration,
      isPlaying,
    };
  }

  // Skip to next track
  async skipToNext(): Promise<{ success: boolean; message: string }> {
    if (this.audioTracks.length === 0) {
      return { success: false, message: 'No tracks available' };
    }

    this.currentTrackIndex =
      (this.currentTrackIndex + 1) % this.audioTracks.length;
    this.playlistStartTime = Date.now();

    return { success: true, message: 'Skipped to next track' };
  }

  // Set current track index
  setCurrentTrackIndex(index: number): void {
    if (index >= 0 && index < this.audioTracks.length) {
      this.currentTrackIndex = index;
      this.playlistStartTime = Date.now();
    }
  }

  // Get current track index
  getCurrentTrackIndex(): number {
    return this.currentTrackIndex;
  }

  // Reset playlist start time (useful when starting streaming)
  resetPlaylistStartTime(): void {
    this.playlistStartTime = Date.now();
  }
}

export const audioTrackService = new AudioTrackService();
