import { HStack } from "@chakra-ui/react";
import CartIcon from "./CartIcon";

const NavBar = () => {
  return (
    <HStack justifyContent="flex-end" padding="4">
      <CartIcon />
    </HStack>
  );
};

export default NavBar;

