import { AlertTriangle } from "lucide-react";
import { API_BASE } from "../../api";

export default function BackendWarning() {
  return (
    <div className="auth-warning">
      <AlertTriangle size={16} />
      <span>
        Backend seems unreachable at {API_BASE} — make sure it's running, then try again.
      </span>
    </div>
  );
}
