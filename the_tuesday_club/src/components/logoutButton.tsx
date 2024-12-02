import React from "react";
import { Button, useToast } from "@chakra-ui/react";
import useLogout from "../hooks/useSubmitLogout";


const LogoutButton = () => {
  const { logout, isLoading, error, message } = useLogout();
  const toast = useToast();

  const handleLogout = async () => {
    const success = await logout();

    if (success) {
      toast({
        title: "Logged out successfully.",
        description: message,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      // Eventuel yderligere logik som at rydde lokal tilstand
    } else {
      toast({
        title: "Logout failed.",
        description: error?.map((e) => (Array.isArray(e.msg) ? e.msg.join(" | ") : e.msg)).join(" | "),
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Button onClick={handleLogout} isLoading={isLoading} colorScheme="red">
      Logout
    </Button>
  );
};

export default LogoutButton;
