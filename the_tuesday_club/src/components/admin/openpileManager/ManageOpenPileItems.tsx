import React, { useState } from "react";
import OpenPileItemsTable from "./OpenPileItemsTable";
import UpdatePileItemsButton from "./UpdatePileItemsButton";
import { OpenPileItem } from "../../../hooks/admin/useOpenPileItems";
import useUpdatePileItemsStatusOrderd from "../../../hooks/admin/useUpdatePileItemsStatus";

const ManageOpenPileItems: React.FC = () => {
  const [selectedItems, setSelectedItems] = useState<OpenPileItem[]>([]);
  const [tableKey, setTableKey] = useState(0); // Key til at force re-render
  const { updateStatus, isLoading } = useUpdatePileItemsStatusOrderd();

  const handleSelectionChange = (items: OpenPileItem[]) => {
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
      <UpdatePileItemsButton
        selectedItems={selectedItems}
        onClick={handleUpdateStatus}
        isLoading={isLoading}
      />
      <OpenPileItemsTable
        key={tableKey} // Brug key til at tvinge re-render
        onSelectionChange={handleSelectionChange}
      />
    </div>
  );
};

export default ManageOpenPileItems;