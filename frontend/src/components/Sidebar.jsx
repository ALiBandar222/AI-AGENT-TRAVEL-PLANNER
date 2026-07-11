import { SquarePen, MessageSquare, Trash2, History } from "lucide-react";

function formatDate(iso) {
  if (!iso) return "";
  const d = new Date(iso);
  return d.toLocaleDateString(undefined, { month: "short", day: "numeric" });
}

export default function Sidebar({
  open,
  sessions,
  serverRuns,
  activeId,
  onSelect,
  onSelectServerRun,
  onNew,
  onDelete,
}) {
  return (
    <aside className={`sidebar ${open ? "sidebar--open" : ""}`}>
      <div className="sidebar-inner">
        <button className="sidebar-new-btn" onClick={onNew}>
          <SquarePen size={16} />
          New Chat
        </button>

        <div className="sidebar-section-label">Your chats</div>
        <div className="sidebar-list">
          {sessions.length === 0 && (
            <p className="sidebar-empty">No local chats yet</p>
          )}
          {sessions.map((s) => (
            <div
              key={s.id}
              className={`sidebar-item ${s.id === activeId ? "sidebar-item--active" : ""}`}
            >
              <button
                className="sidebar-item-body"
                onClick={() => onSelect(s.id)}
              >
                <MessageSquare size={14} className="sidebar-item-icon" />
                <span className="sidebar-item-title">{s.title}</span>
              </button>
              <button
                className="sidebar-item-delete"
                onClick={(e) => { e.stopPropagation(); onDelete(s.id); }}
                aria-label="Delete chat"
                title="Delete chat"
              >
                <Trash2 size={13} />
              </button>
            </div>
          ))}
        </div>

        {serverRuns.length > 0 && (
          <>
            <div className="sidebar-section-label">
              <History size={12} />
              Server history
            </div>
            <div className="sidebar-list">
              {serverRuns.map((run) => {
                const id = `server-${run.id}`;
                return (
                  <div
                    key={id}
                    className={`sidebar-item sidebar-item--server ${id === activeId ? "sidebar-item--active" : ""}`}
                  >
                    <button
                      className="sidebar-item-body"
                      onClick={() => onSelectServerRun(run)}
                    >
                      <History size={14} className="sidebar-item-icon" />
                      <span className="sidebar-item-title">
                        {run.query.slice(0, 36)}
                        {run.query.length > 36 ? "…" : ""}
                      </span>
                      {run.created_at && (
                        <span className="sidebar-item-date">
                          {formatDate(run.created_at)}
                        </span>
                      )}
                    </button>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
    </aside>
  );
}
