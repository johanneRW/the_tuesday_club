import { useState } from "react";
import {
  Box,
  Checkbox,
  Heading,
  HStack,
  List,
  ListItem,
  Spinner,
  Button,
} from "@chakra-ui/react";

interface CustomListProps<T> {
  title: string;
  useDataHook: () => { data: T[]; error: string | null; isLoading: boolean };
  selectedItems?: T[];
  onSelectItem: (items: T[]) => void;
}

const CustomList = <
  T extends { id: number | string; name: string }
>({
  title,
  useDataHook,
  selectedItems = [],
  onSelectItem,
}: CustomListProps<T>) => {
  const { data: items, error, isLoading } = useDataHook();

  const handleSelectItem = (item: T) => {
    const isAlreadySelected = selectedItems.some(
      (selectedItem) => selectedItem.id === item.id
    );
    let newSelectedItems;

    if (isAlreadySelected) {
      newSelectedItems = selectedItems.filter(
        (selectedItem) => selectedItem.id !== item.id
      );
    } else {
      newSelectedItems = [...selectedItems, item];
    }

    onSelectItem(newSelectedItems); // Opdaterer listen af valgte elementer
  };

  if (error) return <p>Error: {error}</p>;
  if (isLoading) return <Spinner />;

  return (
    <Box padding={4}>
      <Heading size="xs">{title}</Heading>
      {/* Tilføj scrollbar-containeren */}
      <Box
        maxHeight="250px" // Begræns højden på boksen
        overflowY={items.length > 15 ? "auto" : "visible"} // Scrollbar kun hvis > 15 elementer
        border={items.length > 15 ? "1px solid #e2e8f0" : "none"} // Tilføj evt. kant for at fremhæve
        borderRadius="md"
        padding="2"
      >
        <List>
          {items.map((item) => (
            <ListItem key={item.id} paddingY="5px">
              <HStack>
                <Checkbox
                  isChecked={selectedItems.some(
                    (selectedItem) => selectedItem.id === item.id
                  )}
                  onChange={() => handleSelectItem(item)}
                >
                  {item.name}
                </Checkbox>
              </HStack>
            </ListItem>
          ))}
        </List>
      </Box>
    </Box>
  );
};

export default CustomList;
