import {
  Box,
  Heading,
} from "@chakra-ui/react";
import useAllLabels from "../hooks/useAllLabels";
import FileUploadComponent from "../components/FileUpload";
import ImageUpload from "../components/imageupload";


const AdminDashboard = () => {
const { data: labels, error: fetchError, isLoading, refetch } = useAllLabels();

  return (
    <Box maxW="800px" mx="auto" mt="10">
      <Heading size="lg" mb="6" textAlign="center">
        Admin Dashboard
      </Heading>
      <FileUploadComponent
        labels={labels || []}
        isLoading={isLoading}
        fetchError={fetchError || null}
        onRefresh={refetch} // Brug refetch til at genindlæse labels
      />
       <ImageUpload></ImageUpload>
    </Box>
   
  );
};
 
export default AdminDashboard;
