import React from "react";
import { Spinner, Box, Text, UnorderedList, ListItem } from "@chakra-ui/react";
import usePileItems from "../hooks/usePileItems";

const PileItemsList: React.FC = () => {
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

  // Beregn samlet pris, antal albums og seneste item
  const totalPrice = pileItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalAlbums = pileItems.reduce((sum, item) => sum + item.quantity, 0);
  const latestItemDate = pileItems.reduce((latest, item) => {
    const itemDate = new Date(item.added_to_pile);
    return itemDate > latest ? itemDate : latest;
  }, new Date(0)); // Start med en meget gammel dato

  return (
    <Box>
      <Text fontSize="xl" mb="4" textAlign="center">
        Your Pile Items
      </Text>

      {/* Samlet Statistik */}
      <Box textAlign="center" mb="6">
        <Text><strong>Total Price:</strong> ${totalPrice.toFixed(2)}</Text>
        <Text><strong>Total Albums:</strong> {totalAlbums}</Text>
        <Text><strong>Latest Item Added:</strong> {latestItemDate.toLocaleString()}</Text>
      </Box>

      {/* Liste af Items */}
      <UnorderedList>
        {pileItems.map((item) => (
          <ListItem key={item.unique_key}>
            <strong>{item.album_name}</strong> - Quantity: {item.quantity} - Status: {item.pile_status}
          </ListItem>
        ))}
      </UnorderedList>
    </Box>
  );
};

export default PileItemsList;
