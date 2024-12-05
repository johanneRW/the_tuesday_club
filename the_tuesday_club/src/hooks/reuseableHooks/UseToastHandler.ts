import { useToast } from "@chakra-ui/react";

type ToastOptions = {
  title: string;
  description?: string;
  status: "info" | "warning" | "success" | "error";
  duration?: number;
  isClosable?: boolean;
};

const useToastHandler = () => {
    const toast = useToast();
  
    const showToast = ({
      title,
      description,
      status,
      duration = 3000,
      isClosable = true,
    }: ToastOptions) => {
      toast({
        title,
        description,
        status,
        duration,
        isClosable,
      });
    };
  
    return { showToast };
  };
  
export default useToastHandler;
