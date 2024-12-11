import React, { useState } from "react";
import { Button } from "@chakra-ui/react";
import OrderSummeryTable from "./OrderSummeryTable";
import userUpdateOrderSummery from "../../../hooks/admin/userUpdateOrderSummery";

const ManageOrderSummaries: React.FC = () => {
  const [selectedUserIds, setSelectedUserIds] = useState<string[]>([]);
  const [tableKey, setTableKey] = useState(0); // Key til at force re-render
  const { updateStatus, isLoading } = userUpdateOrderSummery();

  const handleSelectionChange = (userIds: string[]) => {
    setSelectedUserIds(userIds);
  };

  const handleUpdateStatus = async () => {
    try {
      // Konverter til en liste, hvis selectedUserIds er en string
      const userIds = Array.isArray(selectedUserIds) ? selectedUserIds : [selectedUserIds];
  
      // Opdater status for de valgte user_ids
      await updateStatus(userIds.map((user_ids) => ({ user_ids })));
  
      console.log("Status updated successfully.");
      setTableKey((prevKey) => prevKey + 1); // Force re-render af tabellen
    } catch (error) {
      console.error("Failed to update status:", error);
    }
  };

  return (
    <div>
      <Button
        colorScheme="blue"
        onClick={handleUpdateStatus}
        isLoading={isLoading}
        isDisabled={selectedUserIds.length === 0}
      >
        Change Status to Sendt
      </Button>

      <OrderSummeryTable 
        key={tableKey} // Brug key til at tvinge re-render
        onSelectionChange={handleSelectionChange}
      />
    </div>
  );
};

export default ManageOrderSummaries;
