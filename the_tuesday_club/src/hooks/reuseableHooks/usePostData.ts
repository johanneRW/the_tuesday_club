import { useState } from "react";
import apiClient from "../../services/api-client";

export type ErrorDetail = {
  type?: string;
  loc?: string[];
  msg: string | string[]; // Tillad både enkeltbesked og liste af beskeder
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
    setError(null); // Nulstil fejl før ny anmodning
    try {
      const response = await apiClient.post<T>(endpoint, payload);
      setData(response.data);
      return null; // Ingen fejl
    } catch (err: any) {
      console.error("usePostData error:", err.response?.data || err.message);

      const backendError = err.response?.data;

      if (backendError?.detail) {
        let formattedMsg;
        if (Array.isArray(backendError.detail)) {
          // Hvis `detail` er en liste af fejl (som i useSignup)
          formattedMsg = backendError.detail.map((detail: any) => detail.msg).flat();
        } else {
          // Hvis `detail` er en simpel streng
          formattedMsg = [backendError.detail];
        }

        const formattedError: ErrorDetail = {
          type: "backend_error",
          loc: ["body"], // Standard lokation
          msg: formattedMsg,
          ctx: {},
        };
        setError([formattedError]);
        return [formattedError];
      }

      // Standard fallback for andre fejl
      const fallbackError: ErrorDetail = {
        type: "unknown_error",
        loc: [],
        msg: ["An unexpected error occurred."],
        ctx: {},
      };
      setError([fallbackError]);
      return [fallbackError];
    } finally {
      setIsLoading(false);
    }
  };

  return { data, error, isLoading, execute };
};




export default usePostData;
