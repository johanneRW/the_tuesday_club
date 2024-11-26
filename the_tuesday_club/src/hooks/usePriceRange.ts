import { useState, useEffect } from "react";
import apiClient from "../services/api-client"; 

export const usePriceRange = () => {
  const [minPrice, setMinPrice] = useState<number>(0); 
  const [maxPrice, setMaxPrice] = useState<number>(1000); 
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setIsLoading(true);

    apiClient
      .get("/api/price-range")
      .then((response) => {
        console.log("Price range response:", response.data); 
        setMinPrice(response.data.min_price ?? 0); 
        setMaxPrice(response.data.max_price ?? 1000); 
      })
      .catch((err) => {
        setError(err.message);
        console.error("Error fetching price range:", err); // Debug
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return { minPrice, maxPrice, isLoading, error };
};
