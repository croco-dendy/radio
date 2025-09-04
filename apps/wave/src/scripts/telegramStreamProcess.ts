#!/usr/bin/env bun

import { exec } from 'node:child_process';
import { promisify } from 'node:util';
import { telegramStreamService } from '../services/telegramStreamService';

const execAsync = promisify(exec);

// Colors for console output
const colors = {
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  reset: '\x1b[0m',
};

function log(message: string) {
  console.log(
    `${colors.green}[${new Date().toISOString()}]${colors.reset} ${message}`,
  );
}

function error(message: string) {
  console.error(
    `${colors.red}[${new Date().toISOString()}] ERROR:${colors.reset} ${message}`,
  );
}

function warning(message: string) {
  console.warn(
    `${colors.yellow}[${new Date().toISOString()}] WARNING:${colors.reset} ${message}`,
  );
}

function info(message: string) {
  console.info(
    `${colors.blue}[${new Date().toISOString()}] INFO:${colors.reset} ${message}`,
  );
}

// Check if FFmpeg is installed
async function checkFFmpeg(): Promise<boolean> {
  try {
    await execAsync('ffmpeg -version');
    return true;
  } catch (err) {
    error('FFmpeg is not installed. Please install FFmpeg first.');
    return false;
  }
}

// Start the Telegram stream
async function startTelegramStream(): Promise<void> {
  try {
    // Check if FFmpeg is available
    const ffmpegAvailable = await checkFFmpeg();
    if (!ffmpegAvailable) {
      process.exit(1);
    }

    // Check if stream is already running
    const isRunning = await telegramStreamService.isTelegramStreamRunning();
    if (isRunning) {
      warning('Telegram stream is already running');
      return;
    }

    // Get configuration
    const config = await telegramStreamService.getTelegramConfig();

    log('Starting Telegram stream...');
    log(`Input: ${config.inputUrl}`);
    log(`Output: ${config.rtmpUrl}${config.streamKey}`);
    log(`Quality: ${config.quality} (${config.audioBitrate} audio only)`);

    // Build FFmpeg command for audio-only streaming
    const ffmpegCmd = `ffmpeg -i '${config.inputUrl}' \
      -vn -c:a aac \
      -b:a ${config.audioBitrate} \
      -ar 44100 -ac 2 \
      -preset ultrafast -tune zerolatency \
      -f flv '${config.rtmpUrl}${config.streamKey}'`;

    log('Executing FFmpeg command...');

    // Start FFmpeg process
    const childProcess = exec(ffmpegCmd, (execError, stdout, stderr) => {
      if (execError) {
        error(`FFmpeg process error: ${execError.message}`);
        process.exit(1);
      }
    });

    // Handle process events
    childProcess.stdout?.on('data', (data) => {
      process.stdout.write(data);
    });

    childProcess.stderr?.on('data', (data) => {
      process.stderr.write(data);
    });

    childProcess.on('close', (code) => {
      if (code === 0) {
        log('Telegram stream completed successfully');
      } else {
        error(`Telegram stream exited with code ${code}`);
      }
      process.exit(code || 0);
    });

    childProcess.on('error', (err) => {
      error(`Failed to start Telegram stream: ${err.message}`);
      process.exit(1);
    });

    // Handle graceful shutdown
    process.on('SIGINT', () => {
      log('Received SIGINT, stopping Telegram stream...');
      childProcess.kill('SIGTERM');
    });

    process.on('SIGTERM', () => {
      log('Received SIGTERM, stopping Telegram stream...');
      childProcess.kill('SIGTERM');
    });

    log('✅ Telegram stream started successfully');
    log('Press Ctrl+C to stop the stream');
  } catch (err) {
    error(`Failed to start Telegram stream: ${err}`);
    process.exit(1);
  }
}

// Main execution
async function main() {
  const command = process.argv[2] || 'start';

  switch (command) {
    case 'start':
      await startTelegramStream();
      break;
    case 'help':
      console.log(`
🎵 Telegram Audio Stream Process

Usage: bun telegramStreamProcess.ts [command]

Commands:
  start    Start the Telegram stream (default)
  help     Show this help message

This process starts an FFmpeg stream to Telegram and runs until stopped.
Use PM2 to manage this process in production.
      `);
      break;
    default:
      error(`Unknown command: ${command}`);
      console.log('Use "help" to see available commands');
      process.exit(1);
  }
}

// Run main function
main().catch((err) => {
  error(`Unhandled error: ${err}`);
  process.exit(1);
});
