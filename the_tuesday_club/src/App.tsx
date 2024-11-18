import { useState } from 'react';
import { Grid, GridItem } from '@chakra-ui/react';
import NavBar from './components/NavBar';
import Banner from './components/Banner';
import LPCard from './components/LPCard';
import SearchBar from './components/searchBar';
import useAlbums from './hooks/useAlbums';
import useAlbumUnits, {AlbumUnit} from './hooks/useAlbumUnits';
import CustomList from './components/reusableComponents/CoustomList';

export interface LpQuery {
  albumUnits: AlbumUnit | null;
  
}

function App() {
  // Hent albumdata ved at bruge useAlbums-hooket
  const { data: albums, error, isLoading } = useAlbums();

  // State til det valgte album unit
  const [LpQuery, setLpQuery] = useState({
    albumUnits: [] as AlbumUnit[], // Start som en tom liste af AlbumUnit
    // andre properties
  });
  

  return (
    <Grid
      templateAreas={`
          "banner banner"
          "nav nav"
          "aside main"
          "footer footer"`}
      gridTemplateColumns={'150px 1fr'}
      h="200px"
      gap="1"
      fontWeight="bold"
    >
      <GridItem area={'banner'}>
        <Banner />
      </GridItem>

      <GridItem area={'nav'}>
        <NavBar />
      </GridItem>

      
      <GridItem area={'main'}>
        {/* Indlæsningsindikator og fejlmeddelelse */}
        {isLoading && <p>Loading...</p>}
        {error && <p>Error: {error}</p>}

        {/* Mapper over albums og rendere et LPCard for hvert album */}
        {!isLoading && albums.length > 0 && (
          <Grid templateColumns="repeat(auto-fill, minmax(200px, 1fr))" gap={6}>
            {albums.map((album) => (
              <LPCard key={album.album_id} album={album} />
            ))}
          </Grid>
        )}
      </GridItem>

      <GridItem area={"aside"}>
     
        {/* CustomList for Album Units */}
        <CustomList
          title="Album Units"
          useDataHook={useAlbumUnits}
          selectedItems={LpQuery.albumUnits} // Opdateret til `selectedItems`
          onSelectItem={(selectedAlbumUnits) =>
            setLpQuery({ ...LpQuery, albumUnits: selectedAlbumUnits }) // Opdateret til at tage en liste
          }
        />

      </GridItem>

      <GridItem area={'footer'}>{/* Eventuelt indhold i footer */}</GridItem>
    </Grid>
  );
}

export default App;
