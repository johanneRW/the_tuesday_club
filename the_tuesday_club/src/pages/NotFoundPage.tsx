import { Box, Heading, Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <Box textAlign="center" mt="10">
      <Heading size="lg" mb="6">
        404 - Page Not Found
      </Heading>
      <Button colorScheme="teal" onClick={() => navigate("/")}>
        Go to Homepage
      </Button>
    </Box>
  );
};

export default NotFoundPage;
