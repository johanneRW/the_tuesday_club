import { Box, Button, VStack } from "@chakra-ui/react";
import { useCart } from "./CartContext";

const Cart = () => {
  const { cart, removeFromCart, clearCart } = useCart();

  return (
    <Box border="1px solid #ccc" borderRadius="8px" p="4" maxW="300px">
      <h2>Shopping Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
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
              <span>{item.album_name}</span>
              <Button
                size="sm"
                onClick={() => removeFromCart(item.album_id)} // Sørg for at denne håndtering er korrekt
              >
                Remove
              </Button>
            </Box>
          ))}
        </VStack>
      )}
      {cart.length > 0 && (
        <Button mt="4" colorScheme="red" onClick={clearCart}>
          Clear Cart
        </Button>
      )}
    </Box>
  );
};

export default Cart;
