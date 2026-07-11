import { useState, useEffect } from "react";
import { checkBackendHealth } from "../api";

export function useBackendHealth() {
  const [health, setHealth] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    checkBackendHealth().then((data) => {
      if (!cancelled) {
        setHealth(data);
        setLoading(false);
      }
    });
    return () => { cancelled = true; };
  }, []);

  const isReachable = health !== null;
  const isHealthy = health?.status === "ok";
  const isDegraded = health?.status === "degraded";

  return { health, loading, isReachable, isHealthy, isDegraded };
}
