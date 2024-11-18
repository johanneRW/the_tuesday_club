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
  selectedItems: T[]; // Opdateret til en liste af valgte elementer
  onSelectItem: (items: T[]) => void; // Returnerer hele listen af valgte elementer
}

const CustomList = <
  T extends { id: number | string; name: string }
>({
  title,
  useDataHook,
  selectedItems,
  onSelectItem,
}: CustomListProps<T>) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { data: items, error, isLoading } = useDataHook();

  // Filtrering af viste elementer baseret på `isExpanded`
  const displayedItems = isExpanded ? items : items.slice(0, 5);

  // Funktion til at håndtere valg af et element
  const handleSelectItem = (item: T) => {
    const isAlreadySelected = selectedItems.some(
      (selectedItem) => selectedItem.id === item.id
    );
    let newSelectedItems;

    if (isAlreadySelected) {
      // Fjern elementet, hvis det allerede er valgt
      newSelectedItems = selectedItems.filter(
        (selectedItem) => selectedItem.id !== item.id
      );
    } else {
      // Tilføj elementet, hvis det ikke er valgt
      newSelectedItems = [...selectedItems, item];
    }

    onSelectItem(newSelectedItems); // Opdaterer listen af valgte elementer
  };

  if (error) return <p>Error: {error}</p>;
  if (isLoading) return <Spinner />;

  return (
    <Box padding={4}>
      {/* Tilføj `size="sm"` for en mindre overskrift */}
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
        <Button onClick={() => setIsExpanded(!isExpanded)}>
          {isExpanded ? "Show less" : "Show more"}
        </Button>
      </List>
    </Box>
  );
};

export default CustomList;
