import { Box, Heading, Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import ManageOpenPileItems from "../../components/admin/openPiles/ManageOpenPileItems";
import ManageOrderdPileItems from "../../components/admin/OrderdPiles/ManageOrderdPileItems";

const ManageOrderdPileItemsPage = () => {
  const navigate = useNavigate();

  return (
    <Box maxW="800px" mx="auto" mt="10" p="4">
      <Heading size="lg" mb="6" textAlign="center">
      Manage Recived Orders
      </Heading>
      <Box mb="4" textAlign="center">
        <Button colorScheme="teal" onClick={() => navigate("/admin-dashboard")}>
          Back to Admin Dashboard
        </Button>
      </Box>
      <ManageOrderdPileItems />
    </Box>
  );
};

export default ManageOrderdPileItemsPage;