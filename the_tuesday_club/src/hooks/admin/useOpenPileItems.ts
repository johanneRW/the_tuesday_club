import { useMemo } from "react";
import useData from "../reuseableHooks/useData";


export interface OpenPileItem {
  album_id: string;
  label_name: string;
  album_name: string;
  artist_name: string;
  identifier: string;
  identifier_type: string;
  format_name: string;
  total_quantity: number;
}

const useOpenPileItems = () => {
  // Brug useData til at hente data med credentials
  const { data, error, isLoading, refetch } = useData<OpenPileItem>(
    "/api/admin/open-pile-items",
    undefined, // Ingen dynamisk `requestConfig`
    [], // Ingen afhængigheder for at forhindre genkald
    { withCredentials: true },  // options
  );

  // Memoiserede pileItems, så de ikke ændrer sig mellem renders
  const openPileItems= useMemo(() => {
    // Fallback til tom liste, hvis data er `null` eller `undefined`
    return Array.isArray(data) ? data : [];
  }, [data]); // `pileItems` opdateres kun, hvis `data` ændrer sig

  return { data: openPileItems, error, isLoading , refetch };
};

export default useOpenPileItems;
