import  { useState } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Checkbox,
  Box,
  Spinner,
  Text,
} from "@chakra-ui/react";

interface GenericPileItemsTableProps<T> {
  useDataHook: () => { data: T[] | null; isLoading: boolean; error: string | null };
  onSelectionChange: (items: T[]) => void;
}

const GenericItemsTable = <T extends { 
  album_id: string; 
  label_name?: string; 
  identifier_type?: string; 
  identifier?: string; 
  total_quantity?: number; 
  artist_name?: string; 
  album_name?: string; 
  format_name?: string; 
}>({
  useDataHook,
  onSelectionChange,
}: GenericPileItemsTableProps<T>) => {
  const { data: pileItems, isLoading, error } = useDataHook();
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());

  const handleCheckboxChange = (album_id: string, checked: boolean) => {
    const updatedSelectedItems = new Set(selectedItems);
    if (checked) {
      updatedSelectedItems.add(album_id);
    } else {
      updatedSelectedItems.delete(album_id);
    }
    setSelectedItems(updatedSelectedItems);

    const selected = pileItems?.filter((item) => updatedSelectedItems.has(item.album_id));
    onSelectionChange(selected || []);
  };

  if (isLoading) {
    return (
      <Box textAlign="center" mt="10">
        <Spinner size="lg" />
        <Text>Loading items...</Text>
      </Box>
    );
  }

  if (error) {
    return (
      <Box textAlign="center" mt="10">
        <Text color="red.500">Error loading data</Text>
      </Box>
    );
  }

  if (!pileItems || pileItems.length === 0) {
    return (
      <Box textAlign="center" mt="10">
        <Text>No items found.</Text>
      </Box>
    );
  }

  return (
    <Box maxW="800px" mx="auto" mt="10" overflowX="auto">
      <Table variant="striped" size="sm" minWidth="700px">
        <Thead>
          <Tr>
            <Th>Select</Th>
            <Th>Label</Th>
            <Th>Identifier Type</Th>
            <Th>Identifier</Th>
            <Th>Quantity</Th>
            <Th>Artist</Th>
            <Th>Album</Th>
            <Th>Format</Th>
          </Tr>
        </Thead>
        <Tbody>
          {pileItems.map((item) => (
            <Tr key={item.album_id}>
              <Td>
                <Checkbox
                  isChecked={selectedItems.has(item.album_id)}
                  onChange={(e) => handleCheckboxChange(item.album_id, e.target.checked)}
                />
              </Td>
              <Td>{item.label_name}</Td>
              <Td>{item.identifier_type}</Td>
              <Td>{item.identifier}</Td>
              <Td>{item.total_quantity}</Td>
              <Td>{item.artist_name}</Td>
              <Td>{item.album_name}</Td>
              <Td>{item.format_name}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default GenericItemsTable;
