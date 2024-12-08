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
        title: "Pile Closed",
        description: "All items in your pile have been closed.",
        status: "success",
      });
    } else {
      // Hvis der er fejl
      showToast({
        title: "Error",
        description: "Failed to close pile items.",
        status: "error",
      });
    }
  };

  return { closePile, isLoading, error };
};

export default useClosePile;
