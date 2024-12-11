
import useSendData from "../reuseableHooks/useSendData";

interface OrderSendtUpdate {
  user_ids: string;
}

interface UpdateStatusResponse {
  updated_count: number;
}

const useUpdatePileItemsStatusOrderd = () => {
  const { execute, isLoading, error, data } = useSendData<UpdateStatusResponse>(
    "/api/admin/update-pile-items-to-sent/","PATCH"
  );

  const updateStatus = async (summary: OrderSendtUpdate[]) => {
    if (!summary || summary.length === 0) {
      throw new Error("The items list is empty.");
    }

    const errors = await execute(summary);

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
