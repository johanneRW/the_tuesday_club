import usePatchData from "../reuseableHooks/usePatchData";
import useSendData from "../reuseableHooks/useSendData";

interface PileItemUpdate {
  album_id: string;
}

interface UpdateStatusResponse {
  updated_count: number;
}

const useUpdatePileItemsStatusOrderd = () => {
  const { execute, isLoading, error, data } = useSendData<UpdateStatusResponse>(
    "/api/admin/update-pile-items-status-received","PATCH"
  );

  const updateStatus = async (items: PileItemUpdate[]) => {
    if (!items || items.length === 0) {
      throw new Error("The items list is empty.");
    }

    const errors = await execute(items);

    if (errors) {
      console.error("Failed to update item statuses:", errors);
    }

    return errors;
  };

  return {
    updateStatus,
    isLoading,
    error,
    data,
  };
};

export default useUpdatePileItemsStatusOrderd;
