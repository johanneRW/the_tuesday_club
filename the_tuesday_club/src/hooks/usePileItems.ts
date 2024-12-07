import { useMemo } from "react";
import useData from "./reuseableHooks/useData";

export interface PileItem {
  unique_key: string;
  album_name: string;
  artist_name:string
  quantity: number;
  pile_status: string;
  price: number;
  added_to_pile: string;
}

const usePileItems = () => {
  // Sørg for, at `useData` ikke genkører unødvendigt
  const { data, error, isLoading } = useData<PileItem>(
    "/api/piles/pile-items",
    undefined, // Ingen dynamisk `requestConfig`
    [], // Ingen afhængigheder for at forhindre genkald
    { withCredentials: true },  // options
  );

  // Memoiserede pileItems, så de ikke ændrer sig mellem renders
  const pileItems = useMemo(() => {
    // Fallback til tom liste, hvis data er `null` eller `undefined`
    return Array.isArray(data) ? data : [];
  }, [data]); // `pileItems` opdateres kun, hvis `data` ændrer sig

  return { data: pileItems, error, isLoading };
};

export default usePileItems;
  