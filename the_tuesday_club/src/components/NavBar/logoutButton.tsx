import { Button } from "@chakra-ui/react";
import { useAuth } from "../context/AuthContext";

const LogoutButton = () => {
  const { logout, isLogoutLoading } = useAuth();

  const handleLogout = async () => {
    await logout();
  };

  return (
    <Button onClick={handleLogout} isLoading={isLogoutLoading} colorScheme="red">
      Logout
    </Button>
  );
};

export default LogoutButton;
