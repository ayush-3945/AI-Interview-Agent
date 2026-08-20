import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

export default function useSpeechSynthesis() {
  const utteranceRef = useRef(null);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const isSupported = useMemo(() => {
    if (typeof window === 'undefined') return false;
    return Boolean(window.speechSynthesis && window.SpeechSynthesisUtterance);
  }, []);

  const stop = useCallback(() => {
    if (!isSupported || typeof window === 'undefined') return;
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
  }, [isSupported]);

  const speak = useCallback((text) => {
    if (!isSupported || typeof window === 'undefined' || !text?.trim()) {
      return;
    }

    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    utterance.rate = 1;
    utterance.pitch = 1;
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    utteranceRef.current = utterance;
    window.speechSynthesis.speak(utterance);
  }, [isSupported]);

  useEffect(() => () => {
    if (!isSupported || typeof window === 'undefined') return;
    window.speechSynthesis.cancel();
  }, [isSupported]);

  return {
    speak,
    stop,
    isSpeaking,
    isSupported,
  };
}
