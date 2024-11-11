import { Grid, GridItem } from '@chakra-ui/react';
import NavBar from './components/NavBar';
import Banner from './components/Banner';
import LPCard from './components/LPCard';
import SearchBar from './components/searchBar';
import useAlbums from './hooks/useAlbums';


function App() {
  // Hent albumdata ved at bruge useAlbums-hooket
  const { data: albums, error, isLoading } = useAlbums();

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

      <GridItem area={'aside'}>
        <SearchBar />
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

      <GridItem area={'footer'}>{/* Eventuelt indhold i footer */}</GridItem>
    </Grid>
  );
}

export default App;
