import { Box } from "@chakra-ui/react";
import { ReactNode } from "react";
import { useAuth } from "./AuthContext";


interface Props {
    children: ReactNode;
  }
  
  const LPCardContainer = ({ children }: Props) => {
    const { user} = useAuth();
    return (
      <Box overflow="hidden" borderRadius={10}>
        {children}
      </Box>
    );
  };
  
  export default LPCardContainer;