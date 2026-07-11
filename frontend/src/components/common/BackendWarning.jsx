import { AlertTriangle, CheckCircle, Loader2 } from "lucide-react";

export default function BackendWarning({ health, loading }) {
  if (loading) return null;

  if (!health) {
    return (
      <div className="auth-warning">
        <AlertTriangle size={16} />
        <span>
          Backend seems unreachable at http://localhost:8000 — make sure
          it&apos;s running, then try again.
        </span>
      </div>
    );
  }

  if (health.status === "degraded") {
    return (
      <div className="auth-warning auth-warning--info">
        <AlertTriangle size={16} />
        <span>
          Backend is running but some services are degraded
          (ML: {health.ml_model}, LLM: {health.llm}).
          Chat may still work with limited features.
        </span>
      </div>
    );
  }

  return null;
}

export function BackendStatusBadge({ health, loading }) {
  if (loading) {
    return (
      <span className="backend-badge backend-badge--loading">
        <Loader2 size={12} className="spin" /> Checking…
      </span>
    );
  }
  if (!health) {
    return (
      <span className="backend-badge backend-badge--offline">
        <AlertTriangle size={12} /> Offline
      </span>
    );
  }
  if (health.status === "degraded") {
    return (
      <span className="backend-badge backend-badge--degraded">
        <AlertTriangle size={12} /> Degraded
      </span>
    );
  }
  return (
    <span className="backend-badge backend-badge--ok">
      <CheckCircle size={12} /> Online
    </span>
  );
}
