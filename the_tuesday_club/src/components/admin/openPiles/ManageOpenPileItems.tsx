import { FC } from "react";
import OpenPileItemsTable from "./OpenPileItemsTable";
import useUpdatePileItemsStatusOrderd from "../../../hooks/admin/useUpdatePileItemsStatus";
import { PileItem } from "../../../hooks/admin/useOpenPileItems";
import GenericManageItems from "../../reusableComponents/GenericManageItems";

const ManageOpenPileItems: FC = () => {
  return (
    <GenericManageItems<PileItem>
      TableComponent={OpenPileItemsTable}
      useUpdateHook={useUpdatePileItemsStatusOrderd}
      buttonText="Change Status to Ordered" 
    />
  );
};

export default ManageOpenPileItems;
