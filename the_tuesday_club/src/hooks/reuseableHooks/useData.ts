import { useState, useEffect, useCallback } from "react";
import { AxiosRequestConfig } from "axios";
import apiClient from "../../services/api-client";
import apiClientWithCredentials from "../../services/api-client-whit-credentials";

type ListResponse<T> = T[];

interface UseDataOptions {
  withCredentials?: boolean; // Angiver hvilken klient der skal bruges
  defaultToEmptyArray?: boolean; // Konverter null til tomt array
}

const useData = <T>(
  endpoint: string,
  requestConfig?: AxiosRequestConfig,
  dependencies: any[] = [],
  options: UseDataOptions = { withCredentials: false, defaultToEmptyArray: false }
) => {
  const [data, setData] = useState<T[]>([]); // Altid en liste for kompatibilitet
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const client = options.withCredentials ? apiClientWithCredentials : apiClient;

  const fetchData = useCallback(() => {
    setIsLoading(true);
    setError(null);

    client
      .get<ListResponse<T> | T | null>(endpoint, { ...requestConfig })
      .then((response) => {
        const responseData = response.data;

        // Håndter null eller enkeltobjekter
        if (responseData === null && options.defaultToEmptyArray) {
          setData([]); // Konverter null til tom liste
        } else if (Array.isArray(responseData)) {
          setData(responseData); // Brug lister direkte
        } else if (responseData && typeof responseData === "object") {
          setData([responseData]); // Konverter enkeltobjekt til liste
        } else {
          throw new Error("Unexpected response format.");
        }
      })
      .catch((error) => {
        setError(error.message || "An error occurred.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [endpoint, requestConfig, ...dependencies, client]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, error, isLoading, refetch: fetchData };
};

export default useData;
