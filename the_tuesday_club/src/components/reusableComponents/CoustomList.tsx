import { useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  Heading,
  HStack,
  List,
  ListItem,
  Spinner,
  Text,
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

    onSelectItem(newSelectedItems); 
  };

  const handleReset = () => {
    onSelectItem([]); 
  };

  if (error) return <p>Error: {error}</p>;
  if (isLoading) return <Spinner />;

  return (
    <Box padding={4}>
      <Heading size="xs">{title}</Heading>
      <Box
        maxHeight={items.length > 15 ? "300px" : "none"}
        overflowY={items.length > 15 ? "auto" : "visible"}
        border={items.length > 15 ? "1px solid #ccc" : "none"}
        borderRadius="md"
        padding={items.length > 15 ? 2 : 0}
        css={{
          scrollbarWidth: "thin",
          scrollbarColor: "#ccc #f9f9f9",
        }}
      >
        <List>
          {(items.length > 15 ? items : displayedItems).map((item) => (
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
        </List>
      </Box>
      {/* Vis kun knappen "Show More" hvis der er flere end 5 og mindre end 15 elementer */}
      {items.length > 5 && items.length <= 15 && (
         <Button onClick={() => setIsExpanded(!isExpanded)} mt={2}>
         {isExpanded ? "Show less" : "Show more"}
       </Button>
      )}
      {/* Reset Text */}
      <Text
        onClick={handleReset}
        color="gray.500"
        cursor="pointer"
        mt={4}
        fontSize="sm"
        _hover={{ textDecoration: "underline" }}
      >
        Reset Filter
      </Text>
    </Box>
  );
};

export default CustomList;
