import {
    Box,
    Button,
    VStack,
    HStack,
    Text,
    Divider,
    Heading,
    Alert,
    AlertIcon,
  } from "@chakra-ui/react";
  import { useCart } from "../components/CartContext";
import { capitalizeWords } from "../services/capitalizeWords";
import AddToPileButton from "../components/AddToPileButton";
  
  const CartPage = () => {
    const { cart, removeFromCart, clearCart, increaseCount, decreaseCount } = useCart();
  
    // Beregn totalpris
    const totalPrice = cart.reduce(
      (sum, { item, count }) => sum + item.album_price * count,
      0
    );
  
    return (
      <Box maxW="800px" mx="auto" p="4">
        <Heading mb="4">Your Shopping Cart</Heading>
  
        {/* Betinget besked */}
        {cart.length > 0 && (
          <Alert status="info" mb="4">
            <AlertIcon />
            Please note: An order will not be placed until you have checked out.
          </Alert>
        )}
  
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
                  <Text fontWeight="bold">{capitalizeWords(item.album_name)}</Text>
                  <Text>{capitalizeWords(item.artist_name)}</Text>
                  <Text fontSize="sm" color="gray.500">
                    {count} × {item.album_price.toLocaleString("da-DK")} kr
                  </Text>
                  <Text fontSize="sm" color="blue.500">
                    Total: {(item.album_price * count).toLocaleString("da-DK")} kr
                  </Text>
                </Box>
                <HStack>
                  <Button
                    size="sm"
                    colorScheme="blue"
                    onClick={() => increaseCount(item.album_id)}
                  >
                    +
                  </Button>
                  <Button
                    size="sm"
                    colorScheme="red"
                    onClick={() => decreaseCount(item.album_id)}
                  >
                    -
                  </Button>
                </HStack>
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
              <AddToPileButton/>
            </HStack>
          </VStack>
        )}
      </Box>
    );
  };
  
  export default CartPage;
  