import useData from "./useData";

// Interface til album_units data
export interface AlbumFormat {
  id: string;         // id er det samme som album_units
  name: string;       // name er det samme som album_units
}

const useAlbumFormats = () => {
  const { data, error, isLoading } = useData<{ format_name: string }>('/api/formats');

  const albumFormats = data.map((item) => ({
    id: item.format_name,    // Sæt id og navn til at være det samme
    name: item.format_name,  
  }));

  return { data: albumFormats, error, isLoading };
};

export default useAlbumFormats;
