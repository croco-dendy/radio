export const getEnv = () => import.meta.env.VITE_APP_ENV;

export const apiUrl = import.meta.env.VITE_API_URL;
export const socketUrl = import.meta.env.VITE_SOCKET_URL;
export const streamUrl = import.meta.env.VITE_STREAM_URL;

export const isDev = getEnv() === 'development';
export const isProd = getEnv() === 'production';
export const isPreview = getEnv() === 'preview';
