import { BarChart3, MessageSquare, History, Zap, User, Calendar } from "lucide-react";
import { formatDate, formatTokenCount } from "../../utils/formatters";

export default function StatsPanel({ stats, serverRuns, localSessions, user }) {
  if (!stats) return null;

  const totalTokens = serverRuns.reduce(
    (sum, r) => sum + (r.prompt_tokens || 0) + (r.completion_tokens || 0),
    0
  );

  return (
    <aside className="stats-panel">
      <h3 className="stats-panel-title">
        <BarChart3 size={18} />
        Your Activity
      </h3>

      <div className="stats-panel-user">
        <User size={14} />
        <span>{user?.email}</span>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <MessageSquare size={20} className="stat-icon" />
          <div className="stat-value">{stats.agent_runs}</div>
          <div className="stat-label">Agent Runs</div>
        </div>
        <div className="stat-card">
          <History size={20} className="stat-icon" />
          <div className="stat-value">{localSessions.length}</div>
          <div className="stat-label">Local Chats</div>
        </div>
        <div className="stat-card">
          <Zap size={20} className="stat-icon" />
          <div className="stat-value">{formatTokenCount(totalTokens)}</div>
          <div className="stat-label">Tokens Used</div>
        </div>
        <div className="stat-card">
          <Calendar size={20} className="stat-icon" />
          <div className="stat-value">{serverRuns.length}</div>
          <div className="stat-label">Server History</div>
        </div>
      </div>

      {serverRuns.length > 0 && (
        <div className="stats-recent">
          <h4>Recent Runs</h4>
          <ul>
            {serverRuns.slice(0, 5).map((run) => (
              <li key={run.id}>
                <span className="stats-recent-query">{run.query.slice(0, 50)}…</span>
                <span className="stats-recent-date">{formatDate(run.created_at)}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </aside>
  );
}
