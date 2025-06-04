import { existsSync, readFileSync, writeFileSync } from 'fs';

export interface ChatMessage {
  nickname: string;
  text: string;
  timestamp: string;
}

const HISTORY_FILE = './chat.log';

let history: ChatMessage[] = [];

loadHistory();

export function loadHistory() {
  try {
    if (!existsSync(HISTORY_FILE)) return;
    const data = readFileSync(HISTORY_FILE, 'utf8');
    history = data
      .split('\n')
      .filter(Boolean)
      .map((line) => JSON.parse(line) as ChatMessage);
    prune();
  } catch (err) {
    console.error('Failed to load chat history', err);
  }
}

export function addMessage(msg: ChatMessage) {
  history.push(msg);
  prune();
  try {
    writeFileSync(
      HISTORY_FILE,
      history.map((m) => JSON.stringify(m)).join('\n'),
      'utf8',
    );
  } catch (err) {
    console.error('Failed to write chat history', err);
  }
}

export function getHistory() {
  prune();
  return [...history];
}

function prune() {
  const cutoff = Date.now() - 60 * 60 * 1000;
  history = history.filter((m) => Date.parse(m.timestamp) >= cutoff);
}

