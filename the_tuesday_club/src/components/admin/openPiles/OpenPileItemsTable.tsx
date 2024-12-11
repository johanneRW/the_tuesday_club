import { FC } from "react";
import useOpenPileItems, { PileItem } from "../../../hooks/admin/useOpenPileItems";
import GenericItemsTable from "../../reusableComponents/GenericItemsTable ";

const OrderdPileItemsTable: FC<{ onSelectionChange: (items: PileItem[]) => void }> = ({
  onSelectionChange,
}) => {
  return (
    <GenericItemsTable
      useDataHook={useOpenPileItems}
      onSelectionChange={onSelectionChange}
    />
  );
};

export default OrderdPileItemsTable;

