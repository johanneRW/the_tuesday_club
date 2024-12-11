import { FC } from "react";
import useOrderdPileItems, { PileItem } from "../../../hooks/admin/useOrderdPileItems";
import GenericItemsTable from "../../reusableComponents/GenericItemsTable ";

const OrderdPileItemsTable: FC<{ onSelectionChange: (items: PileItem[]) => void }> = ({
  onSelectionChange,
}) => {
  return (
    <GenericItemsTable
      useDataHook={useOrderdPileItems}
      onSelectionChange={onSelectionChange}
    />
  );
};

export default OrderdPileItemsTable;
