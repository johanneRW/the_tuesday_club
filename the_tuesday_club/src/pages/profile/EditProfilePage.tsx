import React, { useRef } from "react";
import { Box, Heading, Grid, GridItem, Text } from "@chakra-ui/react";
import { useAuth } from "../../components/context/AuthContext";
import PileTable from "../../components/pile/PileTable";
import UserProfile from "../../components/profile/userProfile";
import EditProfile from "../../components/profile/EditUserProfile";
import EditUserProfile from "../../components/profile/EditUserProfile";


const EditProfilePage: React.FC = () => {
  const { user } = useAuth();

  // Brug useRef til at holde en reference til refetch-funktionen
  

  return (
    <Box maxW="800px" mx="auto" mt="10">
     <EditUserProfile/>
    </Box>
  );
};

export default EditProfilePage;
