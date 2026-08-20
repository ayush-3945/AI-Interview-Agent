const HISTORY_KEY = 'interview-agent-history-v1';
const SESSION_KEY = 'interview-agent-session-v1';

const safeParse = (value, fallback) => {
  if (!value) return fallback;
  try {
    return JSON.parse(value);
  } catch {
    return fallback;
  }
};

const readStorage = (key, fallback) => {
  if (typeof window === 'undefined') return fallback;
  return safeParse(window.localStorage.getItem(key), fallback);
};

const writeStorage = (key, value) => {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(key, JSON.stringify(value));
};

export const getInterviewHistory = () => readStorage(HISTORY_KEY, []);

export const saveInterviewHistory = (history) => writeStorage(HISTORY_KEY, history);

export const clearInterviewHistory = () => {
  if (typeof window === 'undefined') return;
  window.localStorage.removeItem(HISTORY_KEY);
};

export const getInterviewSession = () => readStorage(SESSION_KEY, null);

export const saveInterviewSession = (session) => writeStorage(SESSION_KEY, session);

export const clearInterviewSession = () => {
  if (typeof window === 'undefined') return;
  window.localStorage.removeItem(SESSION_KEY);
};

export const createSafeJsonParser = safeParse;
