import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

export default function useSpeechRecognition({ onTranscriptChange } = {}) {
  const recognitionRef = useRef(null);
  const committedTranscriptRef = useRef('');
  const interimTranscriptRef = useRef('');
  const [transcript, setTranscript] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [error, setError] = useState('');

  const appendTranscript = (base, chunk) => {
    const normalizedBase = base.trimEnd();
    const normalizedChunk = chunk.trim();
    if (!normalizedChunk) return normalizedBase;
    if (!normalizedBase) return normalizedChunk;
    return `${normalizedBase} ${normalizedChunk}`;
  };

  const isSupported = useMemo(() => {
    if (typeof window === 'undefined') return false;
    return Boolean(window.SpeechRecognition || window.webkitSpeechRecognition);
  }, []);

  useEffect(() => {
    if (!isSupported || typeof window === 'undefined') return undefined;

    const Recognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new Recognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-US';

    recognition.onstart = () => {
      setIsListening(true);
      setError('');
    };

    recognition.onresult = (event) => {
      let interimText = '';
      let finalText = '';

      for (let index = event.resultIndex; index < event.results.length; index += 1) {
        const result = event.results[index];
        const chunk = result[0]?.transcript || '';
        if (result.isFinal) {
          finalText += chunk;
        } else {
          interimText += chunk;
        }
      }

      if (finalText) {
        committedTranscriptRef.current = appendTranscript(committedTranscriptRef.current, finalText);
      }

      interimTranscriptRef.current = interimText.trim();

      const nextTranscript = appendTranscript(committedTranscriptRef.current, interimTranscriptRef.current);
      setTranscript(nextTranscript);
      onTranscriptChange?.(nextTranscript);
    };

    recognition.onerror = (event) => {
      if (event.error === 'not-allowed' || event.error === 'service-not-allowed') {
        setError('Microphone access was denied. You can still type your answer.');
      } else if (event.error === 'network') {
        setError('Speech recognition network error. You can still type your answer.');
      } else if (event.error !== 'aborted') {
        setError('Voice recognition encountered an error. You can still type your answer.');
      }
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognitionRef.current = recognition;

    return () => {
      try {
        recognition.stop();
      } catch {
        // ignore stop errors during cleanup
      }
      recognitionRef.current = null;
    };
  }, [isSupported, onTranscriptChange]);

  const startListening = useCallback((seed = '') => {
    if (!isSupported || !recognitionRef.current) {
      setError('Voice input is not supported in this browser. Please type your answer.');
      return;
    }

    committedTranscriptRef.current = seed.trim();
    interimTranscriptRef.current = '';
    setTranscript(committedTranscriptRef.current);
    onTranscriptChange?.(committedTranscriptRef.current);
    setError('');

    try {
      recognitionRef.current.start();
      setIsListening(true);
    } catch {
      setError('Voice recording could not start. Please type your answer.');
    }
  }, [isSupported]);

  const stopListening = useCallback(() => {
    try {
      recognitionRef.current?.stop();
    } catch {
      // ignore stop errors
    }
    setIsListening(false);
  }, []);

  const resetTranscript = useCallback(() => {
    committedTranscriptRef.current = '';
    interimTranscriptRef.current = '';
    setTranscript('');
    setError('');
  }, []);

  useEffect(() => () => {
    try {
      recognitionRef.current?.stop();
    } catch {
      // ignore cleanup errors
    }
  }, []);

  return {
    transcript,
    isListening,
    isSupported,
    startListening,
    stopListening,
    resetTranscript,
    error,
  };
}
