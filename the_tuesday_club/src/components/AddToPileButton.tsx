import React from "react";
import useAddToPile from "../hooks/useAddToPile";
import { useCart } from "./CartContext";
import { Button } from "@chakra-ui/react";
import useToastHandler from "../hooks/reuseableHooks/UseToastHandler";

const AddToPileButton: React.FC = () => {
  const { cart, clearCart } = useCart(); // Få adgang til cart og clearCart fra konteksten
  const { addToPile, isLoading } = useAddToPile(); // Hook til at kalde API'et
  const { showToast } = useToastHandler(); // Toast handler

  const handleAddToPile = async () => {
    if (cart.length === 0) {
      showToast({
        title: "Cart is empty",
        description: "Please add items to your cart before adding to a pile.",
        status: "warning",
      });
      return;
    }

    // Ekstraher album_ids fra cart
    const albumIds = cart.map((cartItem) => cartItem.item.album_id);

    const success = await addToPile(albumIds); // Send API-kald med album_ids

    if (success) {
      showToast({
        title: "Success",
        description: `Successfully added ${cart.length} items to a new pile!`,
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
