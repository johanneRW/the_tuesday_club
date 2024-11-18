import useData from "./useData";

// Interface til album_units data
export interface AlbumUnit {
  id: string;         // id er det samme som album_units
  name: string;       // name er det samme som album_units
}

const useAlbumUnits = () => {
  // Brug `useData` til at hente en liste af `{ album_units: string }` objekter
  const { data, error, isLoading } = useData<{ album_units: string }>('/api/units');

  // Transformér data til en liste af AlbumUnit-objekter med `id` og `name` felter
  const albumUnits = data.map((item) => ({
    id: item.album_units,    // Sæt id til at være det samme som album_units
    name: item.album_units,  // Sæt name til at være det samme som album_units
  }));

  return { data: albumUnits, error, isLoading };
};

export default useAlbumUnits;
