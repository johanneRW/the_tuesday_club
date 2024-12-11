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
        <Heading size="md" mb="4" >
        Upload new file
      </Heading>
          <Box p="6" border="1px solid #ddd" borderRadius="8px">
            
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
        <Heading size="md" mb="4" >
        Handle Orders
      </Heading>
          <Box p="6" border="1px solid #ddd" borderRadius="8px">
          <Box
            p="4"
            textAlign="center"
          >
            <Button
              colorScheme="teal"
              onClick={() => navigate("/manage-open-pile-items")}
            >
              Manage New Orders
            </Button>
          </Box>

          <Box
            p="4"
            textAlign="center"
          >
            <Button
              colorScheme="teal"
              onClick={() => navigate("/manage-orderd-pile-items")}
            >
              Manage Recived Orders
            </Button>
          </Box>

          <Box
            p="4"
            textAlign="center"
          >
            <Button
              colorScheme="teal"
              onClick={() => navigate("/manage-order-sending")}
            >
              Send Stacks
            </Button>
          </Box>
          </Box>
        </GridItem>
      </Grid>
    </Box>
  );
};

export default AdminDashboard;
