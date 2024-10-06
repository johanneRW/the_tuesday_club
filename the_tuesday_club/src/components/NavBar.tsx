import { HStack} from "@chakra-ui/react";
import ColorModeSwitch from "./ColorModeSwitch";
import SearchBar from "./searchBar";



const NavBar =() => {return(
    <HStack justifyContent={"space-between"}> 
       <ColorModeSwitch />
    </HStack>
)};

export default NavBar