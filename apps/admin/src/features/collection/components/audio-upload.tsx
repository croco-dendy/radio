import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { useUploadAudioFile } from '@/services/api';

type AudioUploadProps = {
  onUploadSuccess?: (audioFile: {
    id: number;
    name: string;
    size: number;
    format: string;
    duration: string;
  }) => void;
};

export const AudioUpload = ({ onUploadSuccess }: AudioUploadProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const uploadAudioFile = useUploadAudioFile();

  const handleFileSelect = async (files: FileList | null) => {
    if (!files || files.length === 0) return;

    const file = files[0];

    // Validate file type
    const allowedTypes = [
      'audio/mpeg',
      'audio/mp3',
      'audio/wav',
      'audio/ogg',
      'audio/aac',
      'audio/flac',
      'audio/m4a',
    ];
    if (!allowedTypes.includes(file.type)) {
      alert('Please select a valid audio file (MP3, WAV, OGG, AAC, FLAC, M4A)');
      return;
    }

    // Validate file size (50MB)
    if (file.size > 50 * 1024 * 1024) {
      alert('File size must be less than 50MB');
      return;
    }

    try {
      setUploadProgress(0);
      const result = await uploadAudioFile.mutateAsync(file);
      setUploadProgress(100);

      setTimeout(() => {
        setUploadProgress(null);
        onUploadSuccess?.(result);
      }, 1000);
    } catch (error) {
      console.error('Upload failed:', error);
      alert('Failed to upload audio file');
      setUploadProgress(null);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleFileSelect(e.dataTransfer.files);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="w-full">
      <input
        ref={fileInputRef}
        type="file"
        accept="audio/*"
        onChange={(e) => handleFileSelect(e.target.files)}
        className="hidden"
      />

      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={`
          relative border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-all
          ${
            isDragging
              ? 'border-blue-500 bg-blue-50'
              : 'border-gray-300 hover:border-gray-400 hover:bg-gray-50'
          }
          ${uploadProgress !== null ? 'pointer-events-none' : ''}
        `}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={handleClick}
      >
        {uploadProgress !== null ? (
          <div className="space-y-4">
            <div className="text-blue-600">
              <svg
                className="w-12 h-12 mx-auto animate-spin"
                fill="none"
                viewBox="0 0 24 24"
                aria-label="Uploading"
              >
                <circle
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                  className="opacity-25"
                />
                <path
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  className="opacity-75"
                />
              </svg>
            </div>
            <div>
              <div className="text-sm text-gray-600 mb-2">
                Uploading... {uploadProgress}%
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="text-gray-400">
              <svg
                className="w-12 h-12 mx-auto"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-label="Upload audio"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"
                />
              </svg>
            </div>
            <div>
              <p className="text-lg font-medium text-gray-900">
                {isDragging ? 'Drop your audio file here' : 'Upload Audio File'}
              </p>
              <p className="text-sm text-gray-600 mt-1">
                Drag & drop or click to select • MP3, WAV, OGG, AAC, FLAC, M4A •
                Max 50MB
              </p>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};
