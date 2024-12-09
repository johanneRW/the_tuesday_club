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
  HStack,
} from "@chakra-ui/react";
import { HiSquare3Stack3D } from "react-icons/hi2";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { capitalizeWords } from "../../services/utils/capitalizeWords";

const CartIcon = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { cart, removeFromCart } = useCart();

  const navigate = useNavigate(); 

  // Beregn totalpris
  const totalPrice = cart.reduce(
    (sum, { item, count }) => sum + item.album_price * count,
    0
  );

  // Åben og luk dialog
  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);

  return (
    <Box position="relative">
      {/* Kurv-ikon */}
      <IconButton
        icon={<HiSquare3Stack3D />}
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
          {cart.reduce((sum, { count }) => sum + count, 0)} {/* Total antal */}
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
                {cart.map(({ item, count }) => (
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
                      <Text fontWeight="bold">{capitalizeWords(item.album_name)}</Text>
                      <Text >{capitalizeWords(item.artist_name)}</Text>
                      <Text fontSize="sm" color="gray.500">
                        {count} × {item.album_price.toLocaleString("da-DK")} kr
                      </Text>
                    </Box>
                    <Button
                      size="sm"
                      colorScheme="red"
                      onClick={() => removeFromCart(item.album_id)}
                    >
                      {count > 1 ? "Remove 1" : "Remove"}
                    </Button>
                  </Box>
                ))}
              </VStack>
            )}
          </ModalBody>
          <ModalFooter>
            {/* Totalpris */}
            {cart.length > 0 && (
              <HStack justifyContent="space-between" w="100%" p="2">
                <Text fontWeight="bold">Total Price:</Text>
                <Text fontWeight="bold" color="blue.500">
                  {totalPrice.toLocaleString("da-DK")} kr
                </Text>
              </HStack>
            )}
            <Button variant="solid" colorScheme="blue" onClick={closeCart}>
              Close
            </Button>
            <Button
              variant="outline"
              colorScheme="green"
              ml="3"
              onClick={() => {
                closeCart();
                navigate("/cart"); // Naviger til cart-siden
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
