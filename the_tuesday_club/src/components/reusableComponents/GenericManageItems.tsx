import React, { useState } from "react";
import { Button } from "@chakra-ui/react";

interface GenericManageItemsProps<T> {
    TableComponent: React.FC<{ key: number; onSelectionChange: (items: T[]) => void }>;
    useUpdateHook: () => { updateStatus: (items: any[]) => Promise<void>; isLoading: boolean };
    buttonText: string; 
  }
  

const GenericManageItems = <T extends { album_id: string }>({
  TableComponent,
  useUpdateHook,
  buttonText,
}: GenericManageItemsProps<T>) => {
  const [selectedItems, setSelectedItems] = useState<T[]>([]);
  const [tableKey, setTableKey] = useState(0); // Key til at force re-render
  const { updateStatus, isLoading } = useUpdateHook();

  const handleSelectionChange = (items: T[]) => {
    setSelectedItems(items);
  };

  const handleUpdateStatus = async () => {
    try {
      // Opdater status for valgte items
      await updateStatus(selectedItems.map((item) => ({ album_id: item.album_id })));
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
        isDisabled={selectedItems.length === 0}
      >
        {buttonText}
      </Button>

      <TableComponent key={tableKey} onSelectionChange={handleSelectionChange} />
    </div>
  );
};

export default GenericManageItems;
