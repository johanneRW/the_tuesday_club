import { useState, useEffect, useCallback } from "react";
import { AxiosRequestConfig } from "axios";
import apiClient from "../../services/api-client";

type ListResponse<T> = T[];

const useData = <T>(
  endpoint: string,
  requestConfig?: AxiosRequestConfig,
  dependencies: any[] = []
) => {
  const [data, setData] = useState<T[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = useCallback(() => {
    setIsLoading(true);
    setError("");

    apiClient
      .get<ListResponse<T>>(endpoint, { ...requestConfig })
      .then((response) => {
        setData(response.data as T[]);
      })
      .catch((error) => setError(error.message))
      .finally(() => setIsLoading(false));
  }, [endpoint, requestConfig, ...dependencies]);

  useEffect(() => {
    fetchData(); // Hent data ved komponent mount eller ved ændring af dependencies
  }, [fetchData]);

  return { data, error, isLoading, refetch: fetchData }; // Tilføj refetch
};

export default useData;
  