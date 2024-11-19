import { useState } from 'react';
import { Grid, GridItem } from '@chakra-ui/react';
import NavBar from './components/NavBar';
import Banner from './components/Banner';
import LPCard from './components/LPCard';
import SearchBar from './components/searchBar';
import useAlbums from './hooks/useAlbums';
import useAlbumUnits, {AlbumUnit} from './hooks/useAlbumUnits';
import CustomList from './components/reusableComponents/CoustomList';
import LPGrid from './components/LPGrid';
import useAlbumFormats, { AlbumFormat } from './hooks/useFormats';

export interface LpQuery {
  albumUnits: AlbumUnit [];
  albumFormats: AlbumFormat [];
  
}


function App() {
  // Hent albumdata ved at bruge useAlbums-hooket
  const [lpQuery, setLpQuery] = useState<LpQuery>({} as LpQuery);


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

      <LPGrid lpQuery={lpQuery}/>

      </GridItem>

      <GridItem area={"aside"}>
     
        
        <CustomList
          title="Album Units"
          useDataHook={useAlbumUnits}
          selectedItems={lpQuery.albumUnits} 
          onSelectItem={(selectedAlbumUnits) =>
            setLpQuery({ ...lpQuery, albumUnits: selectedAlbumUnits }) 
          }
        />

<CustomList
          title="Album Formats"
          useDataHook={useAlbumFormats}
          selectedItems={lpQuery.albumFormats} 
          onSelectItem={(selectedAlbumFormats) =>
            setLpQuery({ ...lpQuery, albumFormats: selectedAlbumFormats }) 
          }
        />

      </GridItem>

      
      


      <GridItem area={'footer'}>{/* Eventuelt indhold i footer */}</GridItem>
    </Grid>
  );
}

export default App;
