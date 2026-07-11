import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getMe, clearToken, getUserStats, getAgentHistory } from "../api";
import { LogOut, MapPin, BarChart3, Menu } from "lucide-react";
import ChatPanel from "./ChatPanel";
import Sidebar from "./Sidebar";

const HISTORY_KEY = "travel_planner_chats";
const MAX_SESSIONS = 30;

function loadSessions() {
  try { return JSON.parse(localStorage.getItem(HISTORY_KEY)) || []; }
  catch { return []; }
}

function persistSessions(sessions) {
  localStorage.setItem(
    HISTORY_KEY,
    JSON.stringify(sessions.slice(0, MAX_SESSIONS))
  );
}

function serverRunToSession(run) {
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

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState(null);
  const [serverRuns, setServerRuns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sessions, setSessions] = useState(loadSessions);
  const [activeId, setActiveId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function load() {
      try {
        const [me, userStats, history] = await Promise.all([
          getMe(),
          getUserStats(),
          getAgentHistory(),
        ]);
        setUser(me);
        setStats(userStats);
        setServerRuns(history);
      } catch {
        clearToken();
        navigate("/login", { replace: true });
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [navigate]);

  function handleLogout() {
    clearToken();
    navigate("/login", { replace: true });
  }

  function startNewChat() {
    setActiveId(null);
  }

  function selectSession(id) {
    setActiveId(id);
    setSidebarOpen(false);
  }

  function selectServerRun(run) {
    setActiveId(`server-${run.id}`);
    setSidebarOpen(false);
  }

  function deleteSession(id) {
    if (id.startsWith("server-")) return;
    setSessions((prev) => {
      const updated = prev.filter((s) => s.id !== id);
      persistSessions(updated);
      return updated;
    });
    if (activeId === id) setActiveId(null);
  }

  function saveSession(session) {
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
    if (isNew) {
      setStats((prev) =>
        prev ? { ...prev, agent_runs: (prev.agent_runs || 0) + 1 } : prev
      );
    }
  }

  const activeSession =
    sessions.find((s) => s.id === activeId) ||
    (activeId?.startsWith("server-")
      ? serverRuns
          .map(serverRunToSession)
          .find((s) => s.id === activeId) || null
      : null);

  if (loading) {
    return (
      <div className="dashboard-page">
        <div className="dashboard-loading">Loading...</div>
      </div>
    );
  }

  return (
    <div className="dashboard-page">
      <header className="dashboard-header">
        <div className="dashboard-header-left">
          <button
            className="hamburger"
            onClick={() => setSidebarOpen((o) => !o)}
            aria-label="Toggle sidebar"
          >
            <Menu size={20} />
          </button>
          <div className="dashboard-brand">
            <MapPin size={24} />
            <span>Smart Travel Planner</span>
          </div>
        </div>
        <div className="dashboard-user-bar">
          {stats && (
            <span className="dashboard-stats" title="Total agent runs">
              <BarChart3 size={14} />
              {stats.agent_runs} run{stats.agent_runs !== 1 ? "s" : ""}
            </span>
          )}
          <span className="dashboard-email">{user?.email}</span>
          <button onClick={handleLogout} className="logout-button">
            <LogOut size={16} />
            Logout
          </button>
        </div>
      </header>

      <div className="dashboard-body">
        <Sidebar
          open={sidebarOpen}
          sessions={sessions}
          serverRuns={serverRuns}
          activeId={activeId}
          onSelect={selectSession}
          onSelectServerRun={selectServerRun}
          onNew={startNewChat}
          onDelete={deleteSession}
        />
        <ChatPanel
          key={activeId ?? "new"}
          initialState={activeSession}
          onSave={saveSession}
        />
      </div>
    </div>
  );
}
