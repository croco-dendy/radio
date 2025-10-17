import { join } from 'node:path';
import {
  existsSync,
  mkdirSync,
  writeFileSync,
  unlinkSync,
  readFileSync,
} from 'node:fs';
import {
  createAudioFile,
  findAudioFileById,
  deleteAudioFile as deleteAudioFileFromDb,
  type NewAudioFileData,
} from '@/db/collections/audioFiles';
import { authService } from '../auth';
import { getErrorMessage } from '@/utils/errorMessages';

export class AudioFileService {
  private uploadsDir: string;

  constructor() {
    this.uploadsDir = join(process.cwd(), 'data', 'uploads');
    this.ensureUploadsDir();
  }

  private ensureUploadsDir() {
    if (!existsSync(this.uploadsDir)) {
      mkdirSync(this.uploadsDir, { recursive: true });
    }
  }

  private generateFileName(originalName: string, accountId: number): string {
    const timestamp = Date.now();
    const extension = originalName.split('.').pop();
    return `${accountId}_${timestamp}.${extension}`;
  }

  private getMimeType(format: string): string {
    const mimeTypes: Record<string, string> = {
      mp3: 'audio/mpeg',
      wav: 'audio/wav',
      ogg: 'audio/ogg',
      aac: 'audio/aac',
      flac: 'audio/flac',
      m4a: 'audio/mp4',
    };
    return mimeTypes[format.toLowerCase()] || 'audio/mpeg';
  }

  private async extractAudioMetadata(file: File): Promise<{
    duration: string;
    format: string;
  }> {
    // For now, extract basic info from file
    const format = file.name.split('.').pop()?.toLowerCase() || 'unknown';

    // TODO: Use a library like node-ffmpeg or similar to extract actual duration
    // For now, return placeholder values
    return {
      duration: '0:00', // Placeholder - should extract actual duration
      format,
    };
  }

  async uploadAudioFile(accountId: number, file: File) {
    const fileName = this.generateFileName(file.name, accountId);
    const filePath = join(this.uploadsDir, fileName);

    // Extract metadata
    const metadata = await this.extractAudioMetadata(file);

    // Save file to disk
    const buffer = await file.arrayBuffer();
    writeFileSync(filePath, new Uint8Array(buffer));

    // Save to database
    const audioFileData: NewAudioFileData = {
      name: file.name,
      path: filePath,
      duration: metadata.duration,
      size: file.size,
      format: metadata.format,
      uploadedBy: accountId,
      metadata: JSON.stringify({
        originalName: file.name,
        mimeType: file.type,
      }),
    };

    const audioFileId = await createAudioFile(audioFileData);

    return {
      id: audioFileId,
      name: file.name,
      size: file.size,
      format: metadata.format,
      duration: metadata.duration,
    };
  }

  async getAudioFileById(id: number) {
    const audioFile = await findAudioFileById(id);
    if (!audioFile) {
      throw new Error(getErrorMessage.resource('NOT_FOUND'));
    }
    return audioFile;
  }

  async streamAudioFile(id: number) {
    const audioFile = await this.getAudioFileById(id);

    if (!existsSync(audioFile.path)) {
      throw new Error(
        getErrorMessage.file('NOT_FOUND', 'Audio file on disk'),
      );
    }

    const buffer = readFileSync(audioFile.path);
    const mimeType = this.getMimeType(audioFile.format);

    return {
      buffer,
      mimeType,
      size: audioFile.size,
    };
  }

  async deleteAudioFile(id: number, accountId: number) {
    const audioFile = await this.getAudioFileById(id);
    await authService.requireOwnership(accountId, audioFile.uploadedBy);

    // Delete from database
    await deleteAudioFileFromDb(id);

    // Delete file from disk
    if (existsSync(audioFile.path)) {
      unlinkSync(audioFile.path);
    }
  }
}

export const audioFileService = new AudioFileService();
