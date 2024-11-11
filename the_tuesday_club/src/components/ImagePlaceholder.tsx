// LPPlaceholder.tsx
import { Box, Image } from "@chakra-ui/react";
import recordttc from "../assets/recordttc.webp";
import seveninch from "../assets/seveninch.webp";
import twelveinch from "../assets/twelveinch.webp";
import twelveinchcd from "../assets/twelveinchcd.webp";
import MC from "../assets/MC.webp";

interface LPPlaceholderProps {
  format: string; 
}

const LPPlaceholder = ({ format }: LPPlaceholderProps) => {
  
  const placeholderImages: { [key: string]: string } = {
    "lp": twelveinch,
    "LP": twelveinch,
    "12\"": twelveinch,
    "12in": twelveinch,
    "vinyl with cd": twelveinchcd,
    "7\"": seveninch,
    "7in": seveninch,
    "v7": seveninch,
    "mc": MC,
  };

  const selectedImage = placeholderImages[format] || recordttc;

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
      <Image
        src={selectedImage} // Dynamisk valgt billede baseret på format
        alt="Cover not found"
        objectFit="contain"
        width="100%"
      />
    </Box>
  );
};

export default LPPlaceholder;
