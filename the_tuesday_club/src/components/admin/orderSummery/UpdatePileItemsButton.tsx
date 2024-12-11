/* import React from "react";
import { Button } from "@chakra-ui/react";

interface UpdateOrderSummariesProps {
  selectedItems: string[];
  onClick: () => void;
  isLoading: boolean;
}

const UpdateOrderSummariesButton: React.FC<UpdateOrderSummariesProps> = ({
  selectedItems,
  onClick,
  isLoading,
}) => {
  return (
    <Button
      colorScheme="blue"
      onClick={onClick}
      isLoading={isLoading}
      isDisabled={selectedItems.length === 0}
    >
      Update Status
    </Button>
  );
};

export default UpdateOrderSummariesButton; */