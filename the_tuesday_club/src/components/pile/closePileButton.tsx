// import React from "react";
// import { Button } from "@chakra-ui/react";
// import useClosePile from "../../hooks/pile/useClosePile";

// interface ClosePileButtonProps {
//   onSuccess: () => void;
// }

// const ClosePileButton: React.FC<ClosePileButtonProps> = ({ onSuccess }) => {
//   const { closePile, isLoading } = useClosePile();

//   const handleClick = async () => {
//     await closePile();
//     onSuccess(); // Udløs refetch efter en vellykket handling
//   };

//   return (
//     <Button
//       colorScheme="blue"
//       mt="4"
//       onClick={handleClick}
//       isDisabled={isLoading}
//     >
//       {isLoading ? "Closing..." : "Close All Pile Items"}
//     </Button>
//   );
// };

// export default ClosePileButton;
