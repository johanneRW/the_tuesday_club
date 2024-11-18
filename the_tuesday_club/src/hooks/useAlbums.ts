import { LpQuery } from "../App";
import useData from "./useData";

export interface Album {
  album_id: string;
  album_name: string;
  artist_name: string;
  album_units: number;
  format_name: string;
  label_name: string;
  album_price: number; 
}

const useAlbums = (lpQuery: LpQuery) =>
  useData<Album>(
    "/api/albums",
    {
      params: {
        album_units: (lpQuery.albumUnits || []).map((unit) => unit.id),   // Sendes som array direkte
       
      },
    },
    [lpQuery]  // Tilføj `lpQuery` som afhængighed, så data opdateres, når den ændres
  );

export default useAlbums;
