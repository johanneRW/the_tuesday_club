import { Input, Button, HStack } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { ChangeEvent, useState ,KeyboardEvent} from "react";

interface SearchInputProps {
  onSearch: (albumName: string) => void; // Callback for at sende søgeforespørgsel
}

const SearchInput = ({ onSearch }: SearchInputProps) => {
  const [value, setValue] = useState("");

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value); // Opdater inputfeltets værdi
  };

  const handleSearch = () => {
    onSearch(value.trim()); // Send forespørgsel med trimmed input
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSearch(); 
    }
  };

  return (
    <HStack>
      <Input
        placeholder="Search by album name..."
        value={value}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown} 
      />
      <Button onClick={handleSearch} aria-label="Search">
        <SearchIcon />
      </Button>
    </HStack>
  );
};

export default SearchInput;
