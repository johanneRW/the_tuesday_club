import { useState, useEffect } from "react";
import apiClient from "../../services/api/apiClient";
import { AxiosRequestConfig } from "axios";

type PaginatedResponse<T> = {
  total_pages: number;
  current_page: number;
  items: T[]; 
};

const usePaginatedData = <T>(
  endpoint: string,
  dataKey: string,
  requestConfig?: AxiosRequestConfig,
  dependencies: any[] = []
) => {
  const [data, setData] = useState<T[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    apiClient
      .get<PaginatedResponse<T>>(endpoint, { ...requestConfig })
      .then((response) => {
        const paginatedResponse = response.data as any;
        setData(paginatedResponse[dataKey] || []); 
        setTotalPages(paginatedResponse.total_pages || 0);
        setCurrentPage(paginatedResponse.current_page || 1);
      })
      .catch((error) => setError(error.message))
      .finally(() => setIsLoading(false));
  }, dependencies);

  return { data, totalPages, currentPage, error, isLoading };
};

export default usePaginatedData;
