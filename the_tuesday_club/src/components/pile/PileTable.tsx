import React, { useEffect } from "react";
import { Table, Tbody, Tr, Td, Thead, Th, Spinner, Box, Text, Button } from "@chakra-ui/react";
import usePileItems from "../../hooks/pile/usePileItems";
import useClosePile from "../../hooks/pile/useClosePile";


const PileTable: React.FC = () => {
  const { data: pileItems, isLoading, error, refetch } = usePileItems();
  const { closePile, isLoading: isClosing } = useClosePile();

  const handleClosePile = async () => {
    await closePile();
    refetch(); // Genindlæs tabellen
  };

  if (isLoading) {
    return <Spinner size="lg" />;
  }

  if (error) {
    return <Text color="red.500">Failed to load pile items: {error}</Text>;
  }

  if (!pileItems.length) {
    return <Text textAlign="center">No items found in the pile.</Text>;
  }

  const earliestItemDate = pileItems.reduce((earliest, item) => {
    const itemDate = new Date(item.added_to_pile);
    return itemDate < earliest ? itemDate : earliest;
  }, new Date());

 // Konverter datoer til tidsstempler for at udføre udregninger
const daysSinceEarliest = Math.floor(
  (new Date().getTime() - earliestItemDate.getTime()) / (1000 * 60 * 60 * 24)
);


  return (
    <Box>
      {/* Samlet Statistik */}
      <Box textAlign="center" mb="4">
        <Text fontSize="lg" fontWeight="bold">
          Total Price: {pileItems.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2)} kr
        </Text>
        <Text>Total Albums: {pileItems.reduce((sum, item) => sum + item.quantity, 0)}</Text>
        <Text>Pile has been open for: {daysSinceEarliest} days</Text>
      </Box>

      {/* Data Tablen */}
      <Table variant="simple" size="md">
        <Thead>
          <Tr>
            <Th>Artist Name</Th>
            <Th>Album Name</Th>
            <Th>Price</Th>
            <Th>Quantity</Th>
            <Th>Status</Th>
          </Tr>
        </Thead>
        <Tbody>
          {pileItems.map((item) => (
            <Tr key={item.unique_key}>
              <Td>{item.artist_name}</Td>
              <Td>{item.album_name}</Td>
              <Td>{item.price}</Td>
              <Td>{item.quantity}</Td>
              <Td>{item.pile_status}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>

      {/* Close Button */}
      <Box textAlign="center" mt="4">
        <Button
          colorScheme="blue"
          onClick={handleClosePile}
          isLoading={isClosing}
          isDisabled={isClosing}
        >
          request pile closing
        </Button>
      </Box>
    </Box>
  );
};

export default PileTable;
