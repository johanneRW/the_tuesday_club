import { HStack} from "@chakra-ui/react";
import SearchBar from "./searchBar";



const NavBar =() => {return(
    <HStack justifyContent={"space-between"}> 
       <SearchBar />
    </HStack>
)};

export default NavBar