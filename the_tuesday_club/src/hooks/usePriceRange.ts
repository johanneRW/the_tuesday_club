import { useState, useEffect } from "react";
import apiClient from "../services/api-client";

export const usePriceRange = () => {
  const [minPrice, setMinPrice] = useState<number>(0); // Standard 0
  const [maxPrice, setMaxPrice] = useState<number>(1000); // Standard 1000
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setIsLoading(true);

    apiClient
      .get("/api/price-range")
      .then((response) => {
        setMinPrice(response.data.min_price ?? 0); // Fallback til 0
        setMaxPrice(response.data.max_price ?? 1000); // Fallback til 1000
      })
      .catch((err) => {
        setError(err.message);
        console.error("Error fetching price range:", err);
        setMinPrice(0);
        setMaxPrice(1000);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return { minPrice, maxPrice, isLoading, error };
};
