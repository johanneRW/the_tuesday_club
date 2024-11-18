import { Box, HStack, Image} from "@chakra-ui/react";
import tirsdagsklubben from "../assets/tirsdagsklubben.jpeg";
import ColorModeSwitch from "./ColorModeSwitch";


const Banner = () => {
  return (
    <Box width="100%" position="relative" display="flex" alignItems="center">
      {/* Baggrundsbillede */}
      <Image
        src={tirsdagsklubben}
        alt="Club name"
        objectFit="contain"
        width="100%"
      />
      
      {/* ColorModeSwitch ikon øverst til højre */}
      <Box position="absolute" top="10px" right="10px">
        <ColorModeSwitch />
      </Box>
    </Box>
  );
};

export default Banner;
