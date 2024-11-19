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
  useDataHook: () => { data: T[]; error: string; isLoading: boolean };
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
  const [isExpanded, setIsExpanded] = useState(false);
  const { data: items, error, isLoading } = useDataHook();

  // Viser kun de første 5 elementer, medmindre isExpanded er true
  const displayedItems = isExpanded ? items : items.slice(0, 5);

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
      <List>
        {displayedItems.map((item) => (
          <ListItem key={item.id} paddingY="5px">
            <HStack>
              {/* Afkrydsningsboks for hvert element */}
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
        {/* Vis kun knappen "Show More" hvis der er flere end 5 elementer */}
        {items.length > 5 && (
          <Button onClick={() => setIsExpanded(!isExpanded)} mt={2}>
            {isExpanded ? "Show less" : "Show more"}
          </Button>
        )}
      </List>
    </Box>
  );
};

export default CustomList;
