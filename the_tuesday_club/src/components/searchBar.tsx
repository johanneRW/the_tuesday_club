import { InputGroup, Input, InputRightElement, IconButton } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";

function SearchBar() {
  return (
    <InputGroup width="300px" >
     
      <Input 
        placeholder="Search..." 
        variant="outline"
        size="md"
      />
      
     
      <InputRightElement>
        <IconButton
          aria-label="Search database"
          icon={<SearchIcon />}
          size="md"
        />
      </InputRightElement>
    </InputGroup>
  );
}

export default SearchBar;