import { Box, Button, HStack, Link } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import LogoutButton from "./logoutButton";
import CartIcon from "../cart/CartIconModal";


const NavBar = () => {
  const { user } = useAuth();

  return (
    <Box as="nav" p="4" display="flex" justifyContent="space-between" alignItems="center">
      <HStack spacing="10">
      <Link as={RouterLink} to="/aboutus">
          About Us
        </Link>
        <Link as={RouterLink} to="/">
          Albums
        </Link>
       
        
         {user?.isAuthenticated && (
          <Link as={RouterLink} to="/profile">
            Your Profile
          </Link>
        )}
        {user?.isAuthenticated && user.isSuperuser && (
          <Link as={RouterLink} to="/admin-dashboard">
            Admin Dashboard
          </Link>
        )}
      </HStack>
      <HStack spacing="4">   
          {user?.isAuthenticated && (
        <CartIcon/>)}
          {user?.isAuthenticated && (
          <Link as={RouterLink} to="/cart">
            Stack
          </Link>
        )}
       
     
      
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
