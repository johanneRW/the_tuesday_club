import { useState } from "react";
import apiClientWhitCredentials from "../../services/api-client-whit-credentials";


export type ErrorDetail = { field: string; message: string };

const usePostData = <T>(url: string) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<ErrorDetail[] | null>(null);
  const [data, setData] = useState<T | null>(null);

  const execute = async (payload: any, config = {}) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await apiClientWhitCredentials.post<T>(url, payload, {
        ...config, // Tillad yderligere konfiguration
      });
      setData(response.data);
      return null; // Ingen fejl
    } catch (err: any) {
      if (err.response?.data) {
        setError(err.response.data.errors || [{ field: "general", message: "Something went wrong" }]);
      }
      return err.response?.data.errors || [{ field: "general", message: "Something went wrong" }];
    } finally {
      setIsLoading(false);
    }
  };

  return { execute, isLoading, error, data };
};

export default usePostData;
