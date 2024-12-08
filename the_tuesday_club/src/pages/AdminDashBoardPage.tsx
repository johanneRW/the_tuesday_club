import {
  Box,
  Heading,
} from "@chakra-ui/react";
import useAllLabels from "../hooks/admin/useAllLabels";
import FileUploadComponent from "../components/admin/FileUpload";


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
    </Box>
   
  );
};
 
export default AdminDashboard;
