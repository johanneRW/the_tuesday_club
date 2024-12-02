import React from "react";
import { Box, Button, HStack, Link } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { useAuth } from "./AuthContext";
import LogoutButton from "./logoutButton";


const NavBar = () => {
  const { user } = useAuth();

  return (
    <Box as="nav"  p="4" display="flex" justifyContent="space-between" alignItems="center">
      <HStack spacing="4">
        {/* Fælles link for alle */}
        <Link as={RouterLink} to="/">
          Home
        </Link>

        {/* Link synligt for loggede brugere */}
        {user?.isAuthenticated && (
          <Link as={RouterLink} to="/cart">
            Cart
          </Link>
        )}

        {/* Link kun synligt for superuser */}
        {user?.isAuthenticated && user.isSuperuser && (
          <Link as={RouterLink} to="/admindashboard">
            Admin Dashboard
          </Link>
        )}
      </HStack>

      {/* Login/Signup eller Logout */}
      <HStack spacing="4">
        {user?.isAuthenticated ? (
          <LogoutButton />
        ) : (
          <>
            <Button as={RouterLink} to="/login" colorScheme="blue">
              Login
            </Button>
            <Button as={RouterLink} to="/signup" colorScheme="green">
              Sign Up
            </Button>
          </>
        )}
      </HStack>
    </Box>
  );
};

export default NavBar;
