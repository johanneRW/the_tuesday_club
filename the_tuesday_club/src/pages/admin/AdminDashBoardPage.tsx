import { Box, Heading, Grid, GridItem, Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import useAllLabels from "../../hooks/admin/useAllLabels";
import FileUploadComponent from "../../components/admin/FileUpload";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { data: labels, error: fetchError, isLoading, refetch } = useAllLabels();

  return (
    <Box maxW="1200px" mx="auto" mt="10">
      <Heading size="lg" mb="6" textAlign="center">
        Admin Dashboard
      </Heading>
      <Grid templateColumns="repeat(2, 1fr)" gap={6}>
        {/* File Upload Box */}
        <GridItem>
          <Box p="4" borderWidth="1px" borderRadius="lg" boxShadow="md">
            <FileUploadComponent
              labels={labels || []}
              isLoading={isLoading}
              fetchError={fetchError || null}
              onRefresh={refetch} // Brug refetch til at genindlæse labels
            />
          </Box>
        </GridItem>

        {/* Manage Open Pile Items Button */}
        <GridItem>
          <Box
            p="4"
            borderWidth="1px"
            borderRadius="lg"
            boxShadow="md"
            textAlign="center"
          >
            <Button
              colorScheme="teal"
              onClick={() => navigate("/manage-open-pile-items")}
            >
              Manage Open Pile Items
            </Button>
          </Box>
        </GridItem>
      </Grid>
    </Box>
  );
};

export default AdminDashboard;
