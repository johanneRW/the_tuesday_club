import useData from "./reuseableHooks/useData";


export interface AlbumLabel {
  id: string;         
  name: string;       
}

const useAlbumLabels = () => {
  const { data, error, isLoading } = useData<{ label_name: string }>('/api/labels');

  const albumLabels = data.map((item) => ({
    id: item.label_name,    // Sæt id til og navn til at være det samme da det er en liste af unikke værdier
    name: item.label_name,  
  }));

  return { data: albumLabels, error, isLoading };
};

export default useAlbumLabels;
