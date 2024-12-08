import { Box, Heading, Grid, GridItem } from "@chakra-ui/react";
import useAllLabels from "../hooks/admin/useAllLabels";
import FileUploadComponent from "../components/admin/FileUpload";
import ManageOpenPileItems from "../components/admin/ManageOpenPileItems";

const AdminDashboard = () => {
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

        {/* Manage Open Pile Items Box */}
        <GridItem>
          <Box
            p="4"
            borderWidth="1px"
            borderRadius="lg"
            boxShadow="md"
            maxH="500px" // Maksimal højde for boksen
            overflowY="auto" // Aktiver rullefunktion for overskydende indhold
          >
            <ManageOpenPileItems />
          </Box>
        </GridItem>
      </Grid>
    </Box>
  );
};

export default AdminDashboard;
