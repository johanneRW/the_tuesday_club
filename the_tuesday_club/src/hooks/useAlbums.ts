import { LpQuery } from "../App";
import usePaginatedData from "./reuseableHooks/usePaginatedData";

export interface Album {
  album_id: string;
  album_name: string;
  artist_name: string;
  album_units: number;
  format_name: string;
  label_name: string;
  album_price: number;
}

export interface AlbumsResponse {
  albums: Album[];
  current_page: number;
  total_pages: number;
}

const useAlbums = (lpQuery: LpQuery, page: number) => {
  const { data, totalPages, currentPage, error, isLoading } = usePaginatedData<Album>(
    "/api/albums",
    "albums", // Specificerer dataKey
    {
      params: {
        page,
        album_units: (lpQuery.albumUnits || []).map((unit) => unit.id),
        format_name: (lpQuery.albumFormats || []).map((format) => format.id),
        label_name: (lpQuery.albumLabels || []).map((label) => label.id),
        artist_name: (lpQuery.albumArtists || []).map((artist) => artist.id),
        min_price: lpQuery.priceRange ? lpQuery.priceRange[0] : undefined,
        max_price: lpQuery.priceRange ? lpQuery.priceRange[1] : undefined,
      },
    },
    [lpQuery, page], // Dependencies
  );

  return {
    albums: data,
    currentPage,
    totalPages,
    error,
    isLoading,
  };
};

export default useAlbums;
