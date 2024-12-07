import usePutData from "./reuseableHooks/usePutData";
import useToastHandler from "./reuseableHooks/UseToastHandler";


const useClosePile = () => {
  const { showToast } = useToastHandler();
  const { execute, isLoading, error } = usePutData("/api/piles/close-pile/");

  const closePile = async () => {
    const result = await execute({}, { withCredentials: true });
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
