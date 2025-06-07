interface SoundConfig {
  src: string;
  volume: number;
}

interface SoundSettings {
  interfaceSounds: boolean;
  messageSounds: boolean;
  sendSounds: boolean;
  joinSounds: boolean;
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
  private settings: SoundSettings;
  private lastPlayTime: number;
  private readonly debounceTime: number;
  private readonly storage: Storage;
  private changeCallbacks: Set<SoundChangeCallback> = new Set();

  constructor(storage: Storage = window.localStorage) {
    this.storage = storage;
    this.lastPlayTime = 0;
    this.debounceTime = 1000; // 1 second
    this.settings = this.loadSettings();
  }

  private loadSettings(): SoundSettings {
    const saved = this.storage.getItem('soundSettings');
    if (saved) {
      try {
        const settings = JSON.parse(saved) as Partial<SoundSettings>;
        // Ensure all properties exist with default values
        return {
          interfaceSounds: settings.interfaceSounds ?? true,
          messageSounds: settings.messageSounds ?? true,
          sendSounds: settings.sendSounds ?? true,
          joinSounds: settings.joinSounds ?? true,
        };
      } catch {
        // If parsing fails, return defaults
        return this.getDefaultSettings();
      }
    }
    return this.getDefaultSettings();
  }

  private getDefaultSettings(): SoundSettings {
    return {
      interfaceSounds: true,
      messageSounds: true,
      sendSounds: true,
      joinSounds: true,
    };
  }

  private saveSettings(): void {
    this.storage.setItem('soundSettings', JSON.stringify(this.settings));
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
    // Check both master switch and individual sound type
    if (!this.settings.interfaceSounds) return;

    // Check individual sound type settings
    const soundTypeEnabled = {
      message: this.settings.messageSounds,
      send: this.settings.sendSounds,
      join: this.settings.joinSounds,
    }[sound];
    if (!soundTypeEnabled) return;

    const now = Date.now();
    if (now - this.lastPlayTime < this.debounceTime) return;

    const audio = this.createAudio(SOUNDS[sound]);
    audio.play();
    this.lastPlayTime = now;
  }

  public toggleInterfaceSounds(): void {
    this.settings.interfaceSounds = !this.settings.interfaceSounds;
    this.saveSettings();
  }

  public isInterfaceSoundsEnabled(): boolean {
    return this.settings.interfaceSounds;
  }

  // Individual sound type methods
  public toggleMessageSounds(): void {
    this.settings.messageSounds = !this.settings.messageSounds;
    this.saveSettings();
  }

  public isMessageSoundsEnabled(): boolean {
    return this.settings.messageSounds;
  }

  public toggleSendSounds(): void {
    this.settings.sendSounds = !this.settings.sendSounds;
    this.saveSettings();
  }

  public isSendSoundsEnabled(): boolean {
    return this.settings.sendSounds;
  }

  public toggleJoinSounds(): void {
    this.settings.joinSounds = !this.settings.joinSounds;
    this.saveSettings();
  }

  public isJoinSoundsEnabled(): boolean {
    return this.settings.joinSounds;
  }
}

// Create a singleton instance
export const soundService = new SoundService();
