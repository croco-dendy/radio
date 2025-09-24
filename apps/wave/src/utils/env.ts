import 'dotenv/config';
import { join } from 'node:path';

// Determine environment
const NODE_ENV = process.env.NODE_ENV || 'development';
const isProduction = NODE_ENV === 'production';

// Set chat history file based on environment
const getChatHistoryFile = () => {
  const dataDir = join(process.cwd(), 'data');
  if (isProduction) {
    return join(dataDir, 'prod-chats.json');
  }
  return join(dataDir, 'dev-chats.json');
};

export const env = {
  port: Number.parseInt(process.env.PORT || '6870'),
  socketPort: Number.parseInt(process.env.SOCKET_PORT || '6871'),
  environment: isProduction ? 'production' : 'development',
  chatHistoryFile: getChatHistoryFile(),
  dbFileName: process.env.DB_FILE_NAME || 'data/wave.sqlite',
};
