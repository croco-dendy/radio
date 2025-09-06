// Radio project shared types
export interface StreamInfo {
  id: string;
  name: string;
  url: string;
  isLive: boolean;
  listeners: number;
  bitrate: number;
  format: string;
}

export interface AudioFile {
  id: string;
  name: string;
  path: string;
  duration: number;
  size: number;
  format: string;
  uploadedAt: Date;
}

export interface User {
  id: string;
  username: string;
  email: string;
  role: 'admin' | 'user';
  createdAt: Date;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  hasNext: boolean;
  hasPrev: boolean;
}
