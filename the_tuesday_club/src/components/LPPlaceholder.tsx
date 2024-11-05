import { Box, Image } from "@chakra-ui/react";
import recordttc from "../assets/recordttc.webp";

const LPPlaceholder = () => {
  return (
    <Box
      width="200px"
      height="200px"
      bg="gray.300" 
      display="flex"
      alignItems="center"
      justifyContent="center"
      borderRadius="md" 
    >
         <Image src={recordttc}
          alt="Cover not found" 
          objectFit="contain" 
          width="100%" 
          
        />
    </Box>
  );
};

export default LPPlaceholder;
