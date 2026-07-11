import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getMe, clearToken, getUserStats, getAgentHistory } from "../api";
import { serverRunToSession } from "../utils/chatSessions";
import { useChatSessions } from "../hooks/useChatSessions";
import { useBackendHealth } from "../hooks/useBackendHealth";
import DashboardHeader from "../components/layout/DashboardHeader";
import Sidebar from "../components/layout/Sidebar";
import ChatPanel from "../components/chat/ChatPanel";
import StatsPanel from "../components/dashboard/StatsPanel";
import ProfileDrawer from "../components/dashboard/ProfileDrawer";
import LoadingSpinner from "../components/common/LoadingSpinner";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState(null);
  const [serverRuns, setServerRuns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [showStats, setShowStats] = useState(true);
  const navigate = useNavigate();
  const { health, loading: healthLoading } = useBackendHealth();

  const {
    sessions,
    activeId,
    saveSession,
    deleteSession,
    startNewChat,
    selectSession,
    setActiveId,
  } = useChatSessions();

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

  function handleSaveSession(session) {
    const isNew = saveSession(session);
    if (isNew) {
      setStats((prev) =>
        prev ? { ...prev, agent_runs: (prev.agent_runs || 0) + 1 } : prev
      );
    }
  }

  function selectServerRun(run) {
    setActiveId(`server-${run.id}`);
    setSidebarOpen(false);
  }

  const activeSession =
    sessions.find((s) => s.id === activeId) ||
    (activeId?.startsWith("server-")
      ? serverRuns.map(serverRunToSession).find((s) => s.id === activeId) || null
      : null);

  if (loading) {
    return (
      <div className="dashboard-page">
        <LoadingSpinner message="Loading your dashboard..." />
      </div>
    );
  }

  return (
    <div className="dashboard-page">
      <DashboardHeader
        user={user}
        stats={stats}
        health={health}
        healthLoading={healthLoading}
        onToggleSidebar={() => setSidebarOpen((o) => !o)}
        onLogout={handleLogout}
        onOpenProfile={() => setProfileOpen(true)}
      />

      <div className="dashboard-body">
        <Sidebar
          open={sidebarOpen}
          sessions={sessions}
          serverRuns={serverRuns}
          activeId={activeId}
          onSelect={(id) => { selectSession(id); setSidebarOpen(false); }}
          onSelectServerRun={selectServerRun}
          onNew={startNewChat}
          onDelete={deleteSession}
        />

        <div className="dashboard-main">
          <ChatPanel
            key={activeId ?? "new"}
            initialState={activeSession}
            onSave={handleSaveSession}
          />
        </div>

        {showStats && (
          <StatsPanel
            stats={stats}
            serverRuns={serverRuns}
            localSessions={sessions}
            user={user}
          />
        )}
      </div>

      <button
        className="stats-toggle-btn"
        onClick={() => setShowStats((s) => !s)}
        title={showStats ? "Hide stats panel" : "Show stats panel"}
      >
        {showStats ? "Hide Stats" : "Show Stats"}
      </button>

      <ProfileDrawer
        open={profileOpen}
        onClose={() => setProfileOpen(false)}
        user={user}
        stats={stats}
      />
    </div>
  );
}
