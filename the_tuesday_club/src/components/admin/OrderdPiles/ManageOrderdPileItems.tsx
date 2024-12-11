import React from "react";
import OrderdPileItemsTable from "./OrderdPileItemsTable";
import useUpdatePileItemsStatusRecived from "../../../hooks/admin/useUpdatePileItemsStatusRecived";

import { PileItem } from "../../../hooks/admin/useOrderdPileItems";
import GenericManageItems from "../../reusableComponents/GenericManageItems";

const ManageOrderdPileItems: React.FC = () => {
  return (
    <GenericManageItems<PileItem>
      TableComponent={OrderdPileItemsTable}
      useUpdateHook={useUpdatePileItemsStatusRecived}
      buttonText="Change Status to Recived"
    />
  );
};

export default ManageOrderdPileItems;
