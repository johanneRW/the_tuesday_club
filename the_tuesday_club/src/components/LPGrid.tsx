import { SimpleGrid } from "@chakra-ui/react";
import LPCardContainer from "./LPCardContainer";
import LPCardSkeleton from "./LPCardSkeleton";




interface Props {
   
  }
  
  const LPGrid = () => {

 
   
  const skeletons = [...Array(20).keys()];
  return (
    <SimpleGrid
      columns={{ sm: 1, md: 2, lg: 3, xl: 4 }}
      spacing={3}
      padding={10}
    >
      
        
          <LPCardContainer >
            <LPCardSkeleton />
          </LPCardContainer>
     

     
    </SimpleGrid>
  );
};

export default LPGrid;