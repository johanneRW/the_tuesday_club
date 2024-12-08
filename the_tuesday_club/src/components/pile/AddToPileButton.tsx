import { FC } from "react";
import useAddToPile, { AlbumQuantity } from "../../hooks/pile/useAddToPile";
import { useCart } from "../context/CartContext";
import { Button } from "@chakra-ui/react";
import useToastHandler from "../../hooks/reuseableHooks/UseToastHandler";

const AddToPileButton: FC = () => {
  const { cart, clearCart } = useCart(); // Få adgang til cart og clearCart fra konteksten
  const { addToPile, isLoading } = useAddToPile(); 
  const { showToast } = useToastHandler(); 

  const handleAddToPile = async () => {
    if (cart.length === 0) {
      showToast({
        title: "Cart is empty",
        description: "Please add items to your cart before adding to a pile.",
        status: "warning",
      });
      return;
    }

    // Konverter cart til AlbumQuantity format
    const albums: AlbumQuantity[] = cart.map((cartItem) => ({
      album_id: cartItem.item.album_id,
      quantity: cartItem.count,
    }));

    // Beregn det samlede antal albummer
    const totalQuantity = cart.reduce((sum, cartItem) => sum + cartItem.count, 0);

    const success = await addToPile(albums); 

    if (success) {
      showToast({
        title: "Success",
        description: `Successfully added ${totalQuantity} items to your pile!`, 
        status: "success",
      });
      clearCart(); // Tøm kurven efter succes
    } else {
      showToast({
        title: "Error",
        description: "Failed to add items to pile. Please try again.",
        status: "error",
      });
    }
  };

  return (
    <Button
      variant="solid"
      colorScheme="blue"
      onClick={handleAddToPile}
      isLoading={isLoading}
    >
      {isLoading ? "Adding to Pile..." : "Add to Pile"}
    </Button>
  );
};

export default AddToPileButton;
