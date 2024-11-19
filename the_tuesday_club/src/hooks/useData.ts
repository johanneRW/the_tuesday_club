import { useState, useEffect } from "react";
import apiClient from "../services/api-client";
import { AxiosRequestConfig } from "axios";

type PaginatedResponse<T> = {
  total_pages: number;
  current_page: number;
  albums: T[];
};

type ListResponse<T> = T[];  // Ikke-pagineret svar

const useData = <T>(
  endpoint: string,
  requestConfig?: AxiosRequestConfig,
  dependencies: any[] = []
) => {
  const [data, setData] = useState<T[]>([]);  // Gemmer altid data som en liste af T
  const [totalPages, setTotalPages] = useState(0);  // Bruges kun, hvis der er pagination
  const [currentPage, setCurrentPage] = useState(1);  // Bruges kun, hvis der er pagination
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    apiClient
      .get<PaginatedResponse<T> | ListResponse<T>>(endpoint, { ...requestConfig })
      .then((response) => {
        // Tjek om vi har et pagineret svar eller en liste
        if ("albums" in response.data) {
          // Hvis `albums` eksisterer, antag at det er et pagineret svar
          setData(response.data.albums);
          setTotalPages(response.data.total_pages);
          setCurrentPage(response.data.current_page);
        } else {
          // Hvis ikke, antag at `response.data` er en simpel liste
          setData(response.data as T[]);
        }
      })
      .catch((error) => setError(error.message))
      .finally(() => setIsLoading(false));
  }, dependencies);

  return { data, totalPages, currentPage, error, isLoading };
};

export default useData;
