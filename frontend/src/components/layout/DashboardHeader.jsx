import { MapPin, BarChart3, LogOut, Menu, User } from "lucide-react";
import { BackendStatusBadge } from "../common/BackendWarning";

export default function DashboardHeader({
  user,
  stats,
  health,
  healthLoading,
  onToggleSidebar,
  onLogout,
  onOpenProfile,
}) {
  return (
    <header className="dashboard-header">
      <div className="dashboard-header-left">
        <button
          className="hamburger"
          onClick={onToggleSidebar}
          aria-label="Toggle sidebar"
        >
          <Menu size={20} />
        </button>
        <div className="dashboard-brand">
          <MapPin size={24} />
          <span>Smart Travel Planner</span>
        </div>
        <BackendStatusBadge health={health} loading={healthLoading} />
      </div>
      <div className="dashboard-user-bar">
        {stats && (
          <span className="dashboard-stats" title="Total agent runs">
            <BarChart3 size={14} />
            {stats.agent_runs} run{stats.agent_runs !== 1 ? "s" : ""}
          </span>
        )}
        <button className="profile-btn" onClick={onOpenProfile} title="View profile">
          <User size={16} />
        </button>
        <span className="dashboard-email">{user?.email}</span>
        <button onClick={onLogout} className="logout-button">
          <LogOut size={16} />
          Logout
        </button>
      </div>
    </header>
  );
}
