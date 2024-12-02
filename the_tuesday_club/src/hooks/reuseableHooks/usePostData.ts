import { useState } from "react";
import apiClient from "../../services/api-client";

export type ErrorDetail = {
  type: string;
  loc: string[];
  msg: string;
  ctx?: Record<string, any>;
};

export type UsePostDataResponse<T> = {
  data: T | null;
  error: ErrorDetail[] | null;
  isLoading: boolean;
  execute: (payload: any) => Promise<ErrorDetail[] | null>; // Opdateret
};

const usePostData = <T>(endpoint: string): UsePostDataResponse<T> => {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<ErrorDetail[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const execute = async (payload: any): Promise<ErrorDetail[] | null> => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await apiClient.post<T>(endpoint, payload);
      setData(response.data);
      return null; // Ingen fejl
    } catch (err: any) {
      console.error("usePostData error:", err.response?.data || err.message);
      const backendErrors = err.response?.data?.detail || [];
      const formattedErrors = Array.isArray(backendErrors)
        ? backendErrors
        : [{ msg: "An unexpected error occurred." }];
      setError(formattedErrors);
      return formattedErrors; // Returnér fejl
    } finally {
      setIsLoading(false);
    }
  };

  return { data, error, isLoading, execute };
};

export default usePostData;
