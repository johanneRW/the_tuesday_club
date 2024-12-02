import { useState } from "react";
import apiClient from "../../services/api-client";

type ErrorDetail = {
  type: string;
  loc: string[];
  msg: string;
  ctx?: Record<string, any>;
};

type Error = {
  detail: ErrorDetail[];
};

type UsePostDataResponse<T> = {
  data: T | null;
  error: ErrorDetail[] | null;
  isLoading: boolean;
  execute: (payload: any) => Promise<void>;
};

const usePostData = <T>(endpoint: string): UsePostDataResponse<T> => {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<ErrorDetail[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const execute = async (payload: any) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await apiClient.post<T>(endpoint, payload);
      setData(response.data);
    } catch (error: any) {
      // Tjek om fejlformatet indeholder 'detail' og gem det
      const backendErrors = error.response?.data?.detail || [];
      if (Array.isArray(backendErrors)) {
        setError(backendErrors); // Sæt alle fejl
      } else {
        setError([{ type: "unknown_error", loc: [], msg: "An unexpected error occurred." }]);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return { data, error, isLoading, execute };
};

export default usePostData;
