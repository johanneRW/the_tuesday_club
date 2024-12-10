import { Box, Heading, Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import ManageOpenPileItems from "../../components/admin/openpileManager/ManageOpenPileItems";
import ManageOrderSummaries from "../../components/admin/orderSummery/ManageOrderSummery";

const ManageOrderSendingPage = () => {
  const navigate = useNavigate();

  return (
    <Box maxW="95%" mx="auto" mt="10" p="4">
      <Heading size="lg" mb="6" textAlign="center">
        Manage Open Pile Items
      </Heading>
      <Box mb="4" textAlign="center">
        <Button colorScheme="teal" onClick={() => navigate("/admin-dashboard")}>
          Back to Admin Dashboard
        </Button>
      </Box>
      <ManageOrderSummaries />
    </Box>
  );
};

export default ManageOrderSendingPage;