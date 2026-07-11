import { HISTORY_KEY, MAX_SESSIONS } from "../constants/storage";

export function loadSessions() {
  try {
    return JSON.parse(localStorage.getItem(HISTORY_KEY)) || [];
  } catch {
    return [];
  }
}

export function persistSessions(sessions) {
  localStorage.setItem(HISTORY_KEY, JSON.stringify(sessions.slice(0, MAX_SESSIONS)));
}
