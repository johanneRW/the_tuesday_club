import useData from "./useData";


export interface AlbumArtist {
  id: string;        
  name: string;       
}

const useAlbumArtists = () => {
  const { data, error, isLoading } = useData<{ artist_name: string }>('/api/artists');

  const albumArtists = data.map((item) => ({
    id: item.artist_name,
    name: item.artist_name,  
  }));

  return { data: albumArtists, error, isLoading };
};

export default useAlbumArtists;
