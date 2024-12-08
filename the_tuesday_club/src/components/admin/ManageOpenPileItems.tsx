import React, { useState } from "react";
import { OpenPileItem } from "../../hooks/admin/useOpenPileItems";
import OpenPileItemsTable from "./OpenPileItemsTable";


const ManageOpenPileItems = () => {
  const [selectedItems, setSelectedItems] = useState<OpenPileItem[]>([]);

  const handleSelectionChange = (items: OpenPileItem[]) => {
    setSelectedItems(items);
  };

  return (
    <div>
      <OpenPileItemsTable onSelectionChange={handleSelectionChange} />
      <div>
        <h2>Selected Items:</h2>
        <pre>{JSON.stringify(selectedItems, null, 2)}</pre>
      </div>
    </div>
  );
};

export default ManageOpenPileItems;
