import { useState } from "react";
import {
  IconButton,
  Box,
  Badge,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  VStack,
  Text,
} from "@chakra-ui/react";
import { HiSquare3Stack3D } from "react-icons/hi2";
import { useCart } from "./CartContext";


const CartIcon = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { cart, removeFromCart } = useCart(); // Tilføj removeFromCart fra CartContext

  // Åben og luk dialog
  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);

  return (
    <Box position="relative">
      {/* bunke-ikon */}
      <IconButton
        icon={<HiSquare3Stack3D/>}
        aria-label="View cart"
        onClick={openCart}
      />
      {/* Badge til tæller */}
      {cart.length > 0 && (
        <Badge
          position="absolute"
          top="-1"
          right="-1"
          colorScheme="red"
          borderRadius="full"
          px="2"
        >
          {cart.length}
        </Badge>
      )}

      {/* Dialogboks */}
      <Modal isOpen={isOpen} onClose={closeCart} size="md">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Your Cart</ModalHeader>
          <ModalBody>
            {cart.length === 0 ? (
              <Text>Your cart is empty.</Text>
            ) : (
              <VStack spacing="4" align="stretch">
                {cart.map((item) => (
                  <Box
                    key={item.album_id}
                    p="2"
                    border="1px solid #ddd"
                    borderRadius="8px"
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Box>
                      <Text fontWeight="bold">{item.album_name}</Text>
                      <Text color="gray.500" fontSize="sm">
                        {item.album_price} kr
                      </Text>
                    </Box>
                    <Button
                      size="sm"
                      colorScheme="red"
                      onClick={() => removeFromCart(item.album_id)} // Fjern varen fra kurven
                    >
                      Remove
                    </Button>
                  </Box>
                ))}
              </VStack>
            )}
          </ModalBody>
          <ModalFooter>
            <Button variant="solid" colorScheme="blue" onClick={closeCart}>
              Close
            </Button>
            <Button
              variant="outline"
              colorScheme="green"
              ml="3"
              onClick={() => {
                console.log("Navigate to detailed cart view");
              }}
            >
              To cart
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default CartIcon;
