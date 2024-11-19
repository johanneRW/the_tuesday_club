import { useState, useEffect } from "react";
import apiClient from "../services/api-client"; // Brug apiClient i stedet for axios

export const usePriceRange = () => {
  const [minPrice, setMinPrice] = useState<number>(0); // Standardværdi 0
  const [maxPrice, setMaxPrice] = useState<number>(1000); // Standardværdi 1000
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setIsLoading(true);

    apiClient
      .get("/api/price-range")
      .then((response) => {
        console.log("Price range response:", response.data); // Debug: Udskriv responsen for at sikre data er som forventet
        setMinPrice(response.data.min_price ?? 0); 
        setMaxPrice(response.data.max_price ?? 1000); 
      })
      .catch((err) => {
        setError(err.message);
        console.error("Error fetching price range:", err); // Debug: Udskriv fejl
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return { minPrice, maxPrice, isLoading, error };
};
