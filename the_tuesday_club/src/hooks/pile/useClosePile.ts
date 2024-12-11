import usePutData from "../reuseableHooks/usePutData";
import useSendData from "../reuseableHooks/useSendData";
import useToastHandler from "../reuseableHooks/UseToastHandler";


const useClosePile = () => {
  const { showToast } = useToastHandler();
  const { execute, isLoading, error } = useSendData("/api/piles/close-pile/", "PATCH");

  const closePile = async () => {
    const result = await execute({});
    if (result === null) {
      // Hvis der ikke er fejl
      showToast({
        title: "Request of Delivery",
        description: "Your Request has been Received.",
        status: "success",
      });
    } else {
      // Hvis der er fejl
      showToast({
        title: "Error",
        description: "Failed to send Request.",
        status: "error",
      });
    }
  };

  return { closePile, isLoading, error };
};

export default useClosePile;
