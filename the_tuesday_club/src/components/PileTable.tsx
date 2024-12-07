import React from "react";
import { Spinner, Box, Text, TableContainer, Table, Thead, Tr, Th, Tbody, Td, Heading } from "@chakra-ui/react";
import usePileItems from "../hooks/usePileItems";


const PileItemsTable: React.FC = () => {
  const { data: pileItems, error, isLoading } = usePileItems();

  if (isLoading) {
    return (
      <Box textAlign="center" mt="6">
        <Spinner size="lg" />
        <Text mt="4">Loading pile items...</Text>
      </Box>
    );
  }

  if (error) {
    return (
      <Box textAlign="center" mt="6">
        <Text color="red.500">{error}</Text>
      </Box>
    );
  }

  if (pileItems.length === 0) {
    return (
      <Box textAlign="center" mt="6">
        <Text>No pile items found.</Text>
      </Box>
    );
  }

  const totalPrice = pileItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalAlbums = pileItems.reduce((sum, item) => sum + item.quantity, 0);
  const earliestItemDate = pileItems.reduce((earliest, item) => {
    const itemDate = new Date(item.added_to_pile);
    return itemDate < earliest ? itemDate : earliest;
  }, new Date());

 // Konverter datoer til tidsstempler for at udføre aritmetik
const daysSinceEarliest = Math.floor(
  (new Date().getTime() - earliestItemDate.getTime()) / (1000 * 60 * 60 * 24)
);

  return (
    <Box>
    <Heading size="md" mb="4">Pile</Heading>
      {/* Samlet Statistik */}
      <Box textAlign="center" mb="6">
        <Text>Total Price: {totalPrice.toFixed(2)} kr</Text>
        <Text>Albums:{totalAlbums}</Text>
        <Text>Pile has been open for: {daysSinceEarliest} days</Text>
      </Box>

      <TableContainer>
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
              <Td >{item.price}</Td>
              <Td>{item.quantity}</Td>
              <Td>{item.pile_status}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
    </Box>
  );
};

export default PileItemsTable;
