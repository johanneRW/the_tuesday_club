import { useState } from 'react'
import { Grid, GridItem } from '@chakra-ui/react';


function App() {
  return(
    <Grid
  templateAreas={`"header header"
                  "nav main"
                  "nav footer"`}
  gridTemplateRows={'50px 1fr 30px'}
  gridTemplateColumns={'150px 1fr'}
  h='200px'
  gap='1'
  color='blackAlpha.700'
  fontWeight='bold'
>
  <GridItem area={'header'}>
  
  </GridItem>
  <GridItem  area={'nav'}>
   
  </GridItem>
  <GridItem  area={'main'}>
   
  </GridItem>
  <GridItem  area={'footer'}>
   
  </GridItem>
</Grid>
  )
}
 


export default App;
