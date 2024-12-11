/* import React, { useState } from "react";
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

export default ManageOpenPileItems; */


// import React, { useState } from "react";
// import { Button } from "@chakra-ui/react";
// import OpenPileItemsTable from "./OpenPileItemsTable";
// import { PileItem } from "../../../hooks/admin/useOpenPileItems";
// import useUpdatePileItemsStatusOrderd from "../../../hooks/admin/useUpdatePileItemsStatus";

// const ManageOpenPileItems: React.FC = () => {
//   const [selectedItems, setSelectedItems] = useState<PileItem[]>([]);
//   const [tableKey, setTableKey] = useState(0); // Key til at force re-render
//   const { updateStatus, isLoading } = useUpdatePileItemsStatusOrderd();

//   const handleSelectionChange = (items: PileItem[]) => {
//     setSelectedItems(items);
//   };

//   const handleUpdateStatus = async () => {
//     try {
//       // Opdater status for valgte items
//       await updateStatus(selectedItems.map((item) => ({ album_id: item.album_id })));
//       console.log("Status updated successfully.");
//       setTableKey((prevKey) => prevKey + 1); // Force re-render af tabellen
//     } catch (error) {
//       console.error("Failed to update status:", error);
//     }
//   };

//   return (
//     <div>
//       {/* Flyt UpdatePileItemsButton-koden her */}
//       <Button
//         colorScheme="blue"
//         onClick={handleUpdateStatus}
//         isLoading={isLoading}
//         isDisabled={selectedItems.length === 0}
//       >
//         Update Status
//       </Button>

//       <OpenPileItemsTable
//         key={tableKey} // Brug key til at tvinge re-render
//         onSelectionChange={handleSelectionChange}
//       />
//     </div>
//   );
// };

// export default ManageOpenPileItems;

import React from "react";
import OpenPileItemsTable from "./OpenPileItemsTable";
import useUpdatePileItemsStatusOrderd from "../../../hooks/admin/useUpdatePileItemsStatus";

import { PileItem } from "../../../hooks/admin/useOpenPileItems";
import GenericManageItems from "../../reusableComponents/PileItemsManeger";

const ManageOpenPileItems: React.FC = () => {
  return (
    <GenericManageItems<PileItem>
      TableComponent={OpenPileItemsTable}
      useUpdateHook={useUpdatePileItemsStatusOrderd}
      buttonText="Change Status to Ordered" 
    />
  );
};

export default ManageOpenPileItems;
