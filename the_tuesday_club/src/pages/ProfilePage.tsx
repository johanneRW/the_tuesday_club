import { Box, Grid, GridItem, Heading } from "@chakra-ui/react";
import { useAuth } from "../components/AuthContext";
import PileItemsTable from "../components/PileTable";


const ProfilePage = () => {
  useAuth();

  return (
    <Box maxW="800px" mx="auto" mt="10">
      {/* Overskrift */}
      <Heading size="lg" mb="6" textAlign="center">
        Profile Page
      </Heading>
      <Grid templateColumns="repeat(2, 1fr)" gap={6}>
        {/* Medlemsoplysninger */}
        <GridItem>
          <Box p="4" borderWidth="1px" borderRadius="lg" boxShadow="md">
            <Heading size="md" mb="4">Member Information</Heading>
           
          </Box>
        </GridItem>

        {/* PileList */}
        <GridItem>
          <Box p="4" borderWidth="1px" borderRadius="lg" boxShadow="md" textAlign="center">         
            <PileItemsTable/>
          </Box>
        </GridItem>
      </Grid>
    </Box>
  );
};

export default ProfilePage;
