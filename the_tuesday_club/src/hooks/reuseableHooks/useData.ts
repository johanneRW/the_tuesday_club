import { useState, useEffect } from "react";
import { AxiosRequestConfig } from "axios";
import apiClient from "../../services/api-client";


type ListResponse<T> = T[];

const useData = <T>(
  endpoint: string,
  requestConfig?: AxiosRequestConfig,
  dependencies: any[] = [],
  
) => {
  const [data, setData] = useState<T[]>([]);
 
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    apiClient
      .get< ListResponse<T>>(endpoint, { ...requestConfig })
      .then((response) => {
          setData(response.data as T[]);
      })
      .catch((error) => setError(error.message))
      .finally(() => setIsLoading(false));
  }, dependencies);

  return { data, error, isLoading };
};

export default useData;
