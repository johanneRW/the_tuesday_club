import { useState, useEffect, useCallback } from "react";
import { AxiosRequestConfig } from "axios";
import apiClient from "../../services/api-client";
import apiClientWithCredentials from "../../services/api-client-whit-credentials";

type ListResponse<T> = T[];

interface UseDataOptions {
  withCredentials?: boolean; // Angiver hvilken klient der skal bruges
}

const useData = <T>(
  endpoint: string,
  requestConfig?: AxiosRequestConfig,
  dependencies: any[] = [],
  options: UseDataOptions = { withCredentials: false } // Default-værdi for withCredentials
) => {
  const [data, setData] = useState<T[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Vælg klient baseret på `withCredentials`
  const client = options.withCredentials ? apiClientWithCredentials : apiClient;

  const fetchData = useCallback(() => {
    setIsLoading(true);
    setError("");

    client
      .get<ListResponse<T>>(endpoint, { ...requestConfig })
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => setError(error.message))
      .finally(() => setIsLoading(false));
  }, [endpoint, requestConfig, ...dependencies, client]);

  useEffect(() => {
    fetchData(); // Hent data ved komponent mount eller ved ændring af dependencies
  }, [fetchData]);

  return { data, error, isLoading, refetch: fetchData }; // Tilføj refetch
};

export default useData;
