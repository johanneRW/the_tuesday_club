import React from "react";
import { Box, Heading, Grid, GridItem, Text } from "@chakra-ui/react";
import { useAuth } from "../../components/context/AuthContext";
import UserProfile from "../../components/profile/userProfile";
import PileTable from "../../components/pile/PileTable";



const ProfilePage: React.FC = () => {
  const { user } = useAuth();

  return (
    <Box maxW="1200px" mx="auto" mt="10">
      <Heading size="lg" mb="6" textAlign="center">
        Profile Page
      </Heading>
      <Grid templateColumns="repeat(2, 1fr)" gap={6}>
        <GridItem>
        <Heading size="md" mb="4">Your Information</Heading>
          <Box p="4" borderWidth="1px" borderRadius="lg" boxShadow="md">
            
            <UserProfile/>
          </Box>
        </GridItem>
        <GridItem>
        <Heading size="md" mb="4">Your Stack</Heading>
          <Box p="4" borderWidth="1px" borderRadius="lg" boxShadow="md">
            
            <PileTable/>
          </Box>
        </GridItem>
      </Grid>
    </Box>
  );
};

export default ProfilePage;
