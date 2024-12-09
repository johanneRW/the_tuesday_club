import { useState } from "react";
import apiClientWithCredentials from "../../services/api/apiClientWhitCredentials";

export type ErrorDetail = { field: string; message: string };

const useSendData = <T>(
  url: string,
  defaultMethod: "POST" | "PUT" | "PATCH" = "POST" // Standard til POST
) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<ErrorDetail[] | null>(null);
  const [data, setData] = useState<T | null>(null);

  const execute = async (payload: any, method: "PUT" | "PATCH" | "POST" = defaultMethod) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await apiClientWithCredentials.request<T>({
        url,
        method,
        data: payload, 
      });
      setData(response.data);
      return null;
    } catch (err: any) {
      if (err.response?.data) {
        setError(
          err.response.data.errors || [
            { field: "general", message: "Something went wrong" },
          ]
        );
      }
      return err.response?.data.errors || [
        { field: "general", message: "Something went wrong" },
      ];
    } finally {
      setIsLoading(false);
    }
  };

  return { execute, isLoading, error, data };
};

export default useSendData;
