import { useState, useCallback } from "react";
import { loadSessions, persistSessions } from "../utils/chatSessions";

export function useChatSessions() {
  const [sessions, setSessions] = useState(loadSessions);
  const [activeId, setActiveId] = useState(null);

  const saveSession = useCallback((session) => {
    let isNew = false;
    setSessions((prev) => {
      const idx = prev.findIndex((s) => s.id === session.id);
      let updated;
      if (idx >= 0) {
        updated = [...prev];
        updated[idx] = session;
      } else {
        updated = [session, ...prev];
        isNew = true;
      }
      persistSessions(updated);
      return updated;
    });
    setActiveId(session.id);
    return isNew;
  }, []);

  const deleteSession = useCallback((id) => {
    if (id.startsWith("server-")) return;
    setSessions((prev) => {
      const updated = prev.filter((s) => s.id !== id);
      persistSessions(updated);
      return updated;
    });
    setActiveId((current) => (current === id ? null : current));
  }, []);

  const startNewChat = useCallback(() => setActiveId(null), []);

  const selectSession = useCallback((id) => setActiveId(id), []);

  return {
    sessions,
    activeId,
    saveSession,
    deleteSession,
    startNewChat,
    selectSession,
    setActiveId,
  };
}
