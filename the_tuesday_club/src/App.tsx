import { useState } from 'react'
import { Grid, GridItem } from '@chakra-ui/react';
import NavBar from './components/NavBar';
import Banner from './components/Banner';


function App() {
  return(
    <Grid
  templateAreas={`
          "banner banner"
          "nav nav"
          "aside main"
          "footer footer"`}
  
  gridTemplateColumns={'150px 1fr'}
  h='200px'
  gap='1'
 
  fontWeight='bold'
>
  <GridItem area={'banner'}>
<Banner/>
  </GridItem>
  
  <GridItem  area={'nav'}>
    <NavBar/>
  </GridItem>
  <GridItem  area={'aside'}>
   
  </GridItem>
  <GridItem  area={'main'}>
   
  </GridItem>
  <GridItem  area={'footer'}>
   
  </GridItem>
</Grid>
  )
}
 


export default App;
