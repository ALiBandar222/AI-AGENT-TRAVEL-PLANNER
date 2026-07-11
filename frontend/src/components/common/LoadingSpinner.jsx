import { Loader2 } from "lucide-react";

export default function LoadingSpinner({ message = "Loading..." }) {
  return (
    <div className="loading-spinner">
      <Loader2 size={24} className="spin" />
      <span>{message}</span>
    </div>
  );
}
