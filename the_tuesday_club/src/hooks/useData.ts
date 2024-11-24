import { useState, useEffect } from "react";
import apiClient from "../services/api-client";
import { AxiosRequestConfig } from "axios";

type PaginatedResponse<T> = {
  total_pages: number;
  current_page: number;
  albums: T[];
};

type ListResponse<T> = T[];

const useData = <T>(
  endpoint: string,
  requestConfig?: AxiosRequestConfig,
  dependencies: any[] = [],
  isPaginated: boolean = false // Tilføj en flag for at angive, om data er pagineret
) => {
  const [data, setData] = useState<T[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    apiClient
      .get<PaginatedResponse<T> | ListResponse<T>>(endpoint, { ...requestConfig })
      .then((response) => {
        if (isPaginated && "albums" in response.data) {
          const paginatedResponse = response.data as PaginatedResponse<T>;
          setData(paginatedResponse.albums);
          setTotalPages(paginatedResponse.total_pages);
          setCurrentPage(paginatedResponse.current_page);
        } else {
          setData(response.data as T[]);
        }
      })
      .catch((error) => setError(error.message))
      .finally(() => setIsLoading(false));
  }, dependencies);

  return { data, totalPages, currentPage, error, isLoading };
};

export default useData;
