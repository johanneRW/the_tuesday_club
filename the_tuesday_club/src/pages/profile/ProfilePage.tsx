import React, { useRef } from "react";
import { Box, Heading, Grid, GridItem, Text } from "@chakra-ui/react";
import { useAuth } from "../../components/context/AuthContext";
import UserProfile from "../../components/profile/userProfile";
import PileTable from "../../components/pile/PileTable";



const ProfilePage: React.FC = () => {
  const { user } = useAuth();

  // Brug useRef til at holde en reference til refetch-funktionen
  

  return (
    <Box maxW="800px" mx="auto" mt="10">
      <Heading size="lg" mb="6" textAlign="center">
        Profile Page
      </Heading>
      <Grid templateColumns="repeat(2, 1fr)" gap={6}>
        <GridItem>
          <Box p="4" borderWidth="1px" borderRadius="lg" boxShadow="md">
            <Heading size="md" mb="4">Member Information</Heading>
            <UserProfile/>
          </Box>
        </GridItem>
        <GridItem>
          <Box p="4" borderWidth="1px" borderRadius="lg" boxShadow="md">
            <Heading size="md" mb="4">Pile List</Heading>
            <PileTable/>
          </Box>
        </GridItem>
      </Grid>
    </Box>
  );
};

export default ProfilePage;
