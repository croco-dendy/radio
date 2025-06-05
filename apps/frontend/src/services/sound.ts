interface SoundConfig {
  src: string;
  volume: number;
}

interface SoundSettings {
  interfaceSounds: boolean;
}

interface Storage {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
}

type SoundChangeCallback = () => void;

const SOUNDS = {
  message: { src: '/sounds/message.mp3', volume: 0.2 },
  send: { src: '/sounds/send.wav', volume: 0.2 },
  join: { src: '/sounds/join.wav', volume: 0.3 },
} as const;

type SoundName = keyof typeof SOUNDS;

export class SoundService {
  private interfaceSoundsEnabled: boolean;
  private lastPlayTime: number;
  private readonly debounceTime: number;
  private readonly storage: Storage;
  private changeCallbacks: Set<SoundChangeCallback> = new Set();

  constructor(storage: Storage = window.localStorage) {
    this.storage = storage;
    this.lastPlayTime = 0;
    this.debounceTime = 1000; // 1 second
    this.interfaceSoundsEnabled = this.loadSettings();
  }

  private loadSettings(): boolean {
    const saved = this.storage.getItem('soundSettings');
    if (saved) {
      const settings = JSON.parse(saved) as SoundSettings;
      return settings.interfaceSounds;
    }
    return true;
  }

  private saveSettings(): void {
    this.storage.setItem(
      'soundSettings',
      JSON.stringify({ interfaceSounds: this.interfaceSoundsEnabled }),
    );
    this.notifyChange();
  }

  private notifyChange(): void {
    for (const callback of this.changeCallbacks) {
      callback();
    }
  }

  public subscribe(callback: SoundChangeCallback): () => void {
    this.changeCallbacks.add(callback);
    return () => this.changeCallbacks.delete(callback);
  }

  private createAudio(config: SoundConfig): HTMLAudioElement {
    const audio = new Audio(config.src);
    audio.volume = config.volume;
    return audio;
  }

  public playSound(sound: SoundName): void {
    if (!this.interfaceSoundsEnabled) return;

    const now = Date.now();
    if (now - this.lastPlayTime < this.debounceTime) return;

    const audio = this.createAudio(SOUNDS[sound]);
    audio.play().catch(() => {});
    this.lastPlayTime = now;
  }

  public toggleInterfaceSounds(): void {
    this.interfaceSoundsEnabled = !this.interfaceSoundsEnabled;
    this.saveSettings();
  }

  public isInterfaceSoundsEnabled(): boolean {
    return this.interfaceSoundsEnabled;
  }
}

// Create a singleton instance
export const soundService = new SoundService();
