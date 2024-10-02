import { HStack} from "@chakra-ui/react";
import ColorModeSwitch from "./ColorModeSwitch";
import SearchBar from "./searchBar";



const NavBar =() => {return(
    <HStack justifyContent={"space-between"}> 
       <ColorModeSwitch />
       <SearchBar/>
    </HStack>
)};

export default NavBar