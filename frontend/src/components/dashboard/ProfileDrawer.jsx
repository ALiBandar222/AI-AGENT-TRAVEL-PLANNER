import { X, User, Mail, Calendar, BarChart3 } from "lucide-react";
import { formatDate } from "../../utils/formatters";

export default function ProfileDrawer({ open, onClose, user, stats }) {
  if (!open) return null;

  return (
    <div className="profile-drawer-overlay" onClick={onClose}>
      <div className="profile-drawer" onClick={(e) => e.stopPropagation()}>
        <div className="profile-drawer-header">
          <h2>Profile</h2>
          <button className="profile-drawer-close" onClick={onClose} aria-label="Close">
            <X size={20} />
          </button>
        </div>

        <div className="profile-drawer-body">
          <div className="profile-avatar">
            <User size={32} />
          </div>

          <div className="profile-field">
            <Mail size={14} />
            <div>
              <span className="profile-field-label">Email</span>
              <span className="profile-field-value">{user?.email}</span>
            </div>
          </div>

          {user?.created_at && (
            <div className="profile-field">
              <Calendar size={14} />
              <div>
                <span className="profile-field-label">Member since</span>
                <span className="profile-field-value">{formatDate(user.created_at)}</span>
              </div>
            </div>
          )}

          {stats && (
            <div className="profile-field">
              <BarChart3 size={14} />
              <div>
                <span className="profile-field-label">Total agent runs</span>
                <span className="profile-field-value">{stats.agent_runs}</span>
              </div>
            </div>
          )}

          <div className="profile-about">
            <h3>About Smart Travel Planner</h3>
            <p>
              Your AI travel assistant powered by LangGraph, 5 real data tools,
              and two LLM models. All conversations are scoped to your account.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
