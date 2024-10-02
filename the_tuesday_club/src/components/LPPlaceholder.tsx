import { Box } from "@chakra-ui/react";

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
      <Box fontSize="xl" color="gray.600">
        LP Placeholder
      </Box>
    </Box>
  );
};

export default LPPlaceholder;
