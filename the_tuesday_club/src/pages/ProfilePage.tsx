import { Box, Heading } from "@chakra-ui/react";

import { useAuth } from "../components/AuthContext";
import PileList from "../components/PileList";

const ProfilePage = () => {
  useAuth(); 

  return (
    <Box maxW="800px" mx="auto" mt="10">
      <Heading size="lg" mb="6" textAlign="center">
        Profile Page
      </Heading>
      <PileList></PileList>
    </Box>
  );
};

export default ProfilePage;
