import useData from "../reuseableHooks/useData";


export interface AlbumFormat {
  id: string;
  name: string;
}

const useAlbumFormats = () => {
  const { data, error, isLoading } = useData<{ format_name: string }>('/api/filters/formats');

  const albumFormats = data.map((item) => ({
    id: item.format_name,    // Sæt id og navn til at være det samme
    name: item.format_name,  
  }));

  return { data: albumFormats, error, isLoading };
};

export default useAlbumFormats;
