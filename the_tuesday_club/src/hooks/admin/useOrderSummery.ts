import useData from "../reuseableHooks/useData";
import React from "react";


export interface AlbumItem{
    album_name: string
    artist_name: string
    format: string
    album_units: string
    quantity: number
    price_per_item: number
    total_price: number}

export interface OrderSummary{
    user_id:string
    first_name: string
    last_name: string
    address: string
    total_quantity: number
    total_price: number
    items: AlbumItem[]}

const useOrderSummery = () => {
  // Brug useData til at hente data med credentials
  const { data, error, isLoading, refetch } = useData<OrderSummary>(
    "/api/admin/closed-pile-items-summary/",
    undefined, // Ingen dynamisk `requestConfig`
    [], // Ingen afhængigheder for at forhindre genkald
    { withCredentials: true },  // options
  );

  React.useEffect(() => {
    console.log("Data updated:", data); // Log data, når det opdateres
  }, [data]);

  return { data, error, isLoading, refetch };
};

export default useOrderSummery;
