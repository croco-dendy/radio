import pkg from '../../package.json';

export const version = pkg.version;

export const getEnv = () => import.meta.env.VITE_APP_ENV;

export const apiUrl = import.meta.env.VITE_API_URL || 'https://wave.adoo.one';

export const isDev = getEnv() === 'development';
export const isProd = getEnv() === 'production';
export const isPreview = getEnv() === 'preview';

export const gitBranch = import.meta.env.VERCEL_GIT_BRANCH;
export const gitCommitMessage = import.meta.env.VERCEL_GIT_COMMIT_MESSAGE;
