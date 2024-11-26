import React from "react";
import { HStack, Spacer, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import CartIcon from "./CartIcon"; // Cart-ikon med badge

const NavBar = () => {
  return (
    <HStack padding="4">
      {/* Links til forskellige sider */}
      <Button variant="ghost" as={Link} to="/">
        Home
      </Button>
      <Button variant="ghost" as={Link} to="/cart">
        Cart Page
      </Button>

      <Spacer />

      {/* Cart-ikon til visning af antal */}
      <CartIcon />
    </HStack>
  );
};

export default NavBar;
