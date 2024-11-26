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
       {/* skal muligvis ikke vises i navbaren da man kan tilgå den via carticon */}
      <Button variant="ghost" as={Link} to="/cart">
        Cart
      </Button>

      <Spacer />

      {/* Cart-ikon med visning af antal i kurven/bunken */}
      <CartIcon />
    </HStack>
  );
};

export default NavBar;
