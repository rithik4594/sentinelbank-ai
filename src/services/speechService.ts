/**
 * Web Speech API Voice Guidance Service
 * Provides audio assistance for senior citizens & visually impaired users.
 */
class SpeechService {
  private isSupported: boolean;
  private isSpeaking: boolean = false;

  constructor() {
    this.isSupported = typeof window !== 'undefined' && 'speechSynthesis' in window;
  }

  public speak(text: string, onEnd?: () => void): void {
    if (!this.isSupported) {
      console.warn('Speech synthesis is not supported on this browser.');
      return;
    }

    // Cancel any previous speech
    window.speechSynthesis.cancel();

    // Clean text of technical symbols for smooth pronunciation
    const cleanText = text
      .replace(/₹/g, 'rupees ')
      .replace(/[•🚨⚠️✓⚡]/g, '')
      .replace(/\s+/g, ' ')
      .trim();

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.rate = 0.95; // Slightly slower for clarity
    utterance.pitch = 1.0;
    utterance.lang = 'en-IN'; // Indian English if available

    this.isSpeaking = true;

    utterance.onend = () => {
      this.isSpeaking = false;
      if (onEnd) onEnd();
    };

    utterance.onerror = (e) => {
      console.warn('Speech synthesis error:', e);
      this.isSpeaking = false;
    };

    window.speechSynthesis.speak(utterance);
  }

  public stop(): void {
    if (this.isSupported) {
      window.speechSynthesis.cancel();
      this.isSpeaking = false;
    }
  }

  public getSpeakingStatus(): boolean {
    return this.isSpeaking;
  }
}

export const speechService = new SpeechService();
