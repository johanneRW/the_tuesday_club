import { HStack, Spacer, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import CartIcon from "./CartIcon"; // Cart-ikon med badge

const NavBar = () => {
  return (
    <HStack padding="4">
      {/* skal muligvis hedde noget andet? */}
      <Button variant="ghost" as={Link} to="/">
        Home
      </Button>
       
      <Button variant="ghost" as={Link} to="/login">
        Login
      </Button>
      <Button variant="ghost" as={Link} to="/signup">
        Signup
      </Button>
      <Button variant="ghost" as={Link} to="/admindashboard">
        Admin Dashboard
      </Button>

      <Spacer />
      {/* skal muligvis ikke vises i navbaren da man kan tilgå den via carticon */}
      <Button variant="ghost" as={Link} to="/cart">
        Cart
      </Button>
      {/* Cart-ikon med visning af antal i kurven/bunken */}
      <CartIcon />
    </HStack>
  );
};

export default NavBar;
