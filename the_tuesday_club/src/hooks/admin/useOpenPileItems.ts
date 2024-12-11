import useData from "../reuseableHooks/useData";
import React from "react";


export interface PileItem {
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
  const { data, error, isLoading, refetch } = useData<PileItem>(
    "/api/admin/open-pile-items",
    undefined, // Ingen dynamisk `requestConfig`
    [], // Ingen afhængigheder for at forhindre genkald
    { withCredentials: true },  // options
  );

  React.useEffect(() => {
    console.log("Data updated:", data); // Log data, når det opdateres
  }, [data]);

  return { data, error, isLoading, refetch };
};

export default useOpenPileItems;
