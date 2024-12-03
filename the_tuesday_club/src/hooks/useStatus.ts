import { useState, useEffect, useCallback } from "react";
import privatApiClient from "../services/private-api-client";


type User = {
  isAuthenticated: boolean;
  isSuperuser: boolean;
};

export type UseStatusHook = {
  user: User | null;
  loading: boolean;
  error: string | null;
  refreshStatus: () => Promise<void>;
};

export const useStatusHook = (): UseStatusHook => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStatus = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const sessionId = localStorage.getItem("session_id");
      const response = await privatApiClient.get("/api/users/auth/status", {"params": {"session_id": sessionId}});

      setUser(response.data); // Axios returnerer data direkte i response.data
    } catch (err: any) {
      setUser(null);
      setError(err.response?.data?.message || err.message || "Unknown error occurred");
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch status on mount
  useEffect(() => {
    fetchStatus();
  }, [fetchStatus]);

  return { user, loading, error, refreshStatus: fetchStatus };
};
