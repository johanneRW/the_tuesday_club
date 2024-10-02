import { Box, HStack, Image} from "@chakra-ui/react";
import tirsdagsklubben from "../assets/tirsdagsklubben.jpeg";


const Banner =() => {return(
    
    <Box  width="100%"   display="flex" alignItems="center">
    
          <Image src={tirsdagsklubben}
          alt="Club name" 
          objectFit="contain" 
          width="100%" 
          
        />
  
    </Box>
  )};
    
   

export default Banner