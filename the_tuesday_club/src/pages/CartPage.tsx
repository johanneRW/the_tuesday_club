import {
  Box,
  Button,
  VStack,
  HStack,
  Text,
  Divider,
  Heading,
} from "@chakra-ui/react";
import { useCart } from "../components/CartContext";

const CartPage = () => {
  const { cart, removeFromCart, clearCart } = useCart();

  // Beregn totalpris
  const totalPrice = cart.reduce(
    (sum, { item, count }) => sum + item.album_price * count,
    0
  );

  return (
    <Box maxW="800px" mx="auto" p="4">
      <Heading mb="4">Your Shopping Cart</Heading>
      {cart.length === 0 ? (
        <Text>Your cart is empty.</Text>
      ) : (
        <VStack spacing="4" align="stretch">
          {cart.map(({ item, count }) => (
            <Box
              key={item.album_id}
              border="1px solid #ddd"
              borderRadius="8px"
              p="4"
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Box>
                <Text fontWeight="bold">{item.album_name}</Text>
                <Text >{item.artist_name}</Text>
                <Text fontSize="sm" color="gray.500">
                  {count} × {item.album_price.toLocaleString("da-DK")} kr
                </Text>
                <Text fontSize="sm" color="blue.500">
                  Total: {(item.album_price * count).toLocaleString("da-DK")} kr
                </Text>
              </Box>
              <Button
                size="sm"
                colorScheme="red"
                onClick={() => removeFromCart(item.album_id)}
              >
                Remove
              </Button>
            </Box>
          ))}

          <Divider />

          {/* Totalpris */}
          <HStack justifyContent="space-between">
            <Text fontWeight="bold" fontSize="lg">
              Total Price:
            </Text>
            <Text fontWeight="bold" fontSize="lg" color="blue.500">
              {totalPrice.toLocaleString("da-DK")} kr
            </Text>
          </HStack>

          {/* Handling Buttons */}
          <HStack spacing="4" justifyContent="flex-end">
            <Button variant="outline" colorScheme="red" onClick={clearCart}>
              Clear Cart
            </Button>
            <Button variant="solid" colorScheme="blue">
              Proceed to Checkout
            </Button>
          </HStack>
        </VStack>
      )}
    </Box>
  );
};

export default CartPage;
