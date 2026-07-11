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

export function serverRunToSession(run) {
  return {
    id: `server-${run.id}`,
    title: run.query.slice(0, 40),
    messages: [
      { role: "user", content: run.query },
      {
        role: "agent",
        content: run.response,
        toolLogs: [],
        streaming: false,
        tokenUsage: {
          prompt_tokens: run.prompt_tokens,
          completion_tokens: run.completion_tokens,
        },
      },
    ],
    chatHistory: [
      { role: "user", content: run.query },
      { role: "assistant", content: run.response },
    ],
    originCountry: null,
    ts: run.created_at ? new Date(run.created_at).getTime() : Date.now(),
    readonly: true,
    serverRunId: run.id,
  };
}

export function createSessionTitle(messages) {
  const firstUser = messages.find((m) => m.role === "user");
  return firstUser ? firstUser.content.slice(0, 40) : "Untitled chat";
}
