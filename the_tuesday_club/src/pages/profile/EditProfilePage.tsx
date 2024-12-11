import React from "react";
import { Box} from "@chakra-ui/react";
import { useAuth } from "../../components/context/AuthContext";
import EditUserProfile from "../../components/profile/EditUserProfile";


const EditProfilePage: React.FC = () => {
  const { user } = useAuth();

  return (
    <Box maxW="800px" mx="auto" mt="10">
     <EditUserProfile/>
    </Box>
  );
};

export default EditProfilePage;
