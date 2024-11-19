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

const useAlbums = (lpQuery: LpQuery) => {
  const { data: albums, totalPages, currentPage, error, isLoading } = useData<Album>(
    "/api/albums",
    {
      params: {
        album_units: (lpQuery.albumUnits || []).map((unit) => unit.id),
        format_name: (lpQuery.albumFormats || []).map((format) => format.id),
        label_name: (lpQuery.albumLabels || []).map((label) => label.id),
        artist_name: (lpQuery.albumArtists || []).map((artist) => artist.id),
        min_price: lpQuery.priceRange ? lpQuery.priceRange[0] : undefined,
        max_price: lpQuery.priceRange ? lpQuery.priceRange[1] : undefined,
      },
    },
    [lpQuery]
  );

  return { albums, totalPages, currentPage, error, isLoading };
};

export default useAlbums;
