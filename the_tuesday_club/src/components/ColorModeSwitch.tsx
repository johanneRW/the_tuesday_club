import { HStack, Switch, Text, useColorMode } from "@chakra-ui/react";
import { SunIcon, MoonIcon } from "@chakra-ui/icons";

const ColorModeSwitch = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  
  return (
    <HStack>
      {colorMode === "light" ? <SunIcon /> : <MoonIcon />}
      
      <Switch
        onChange={toggleColorMode}
        isChecked={colorMode === "dark"}
      />

    </HStack>
  );
};

export default ColorModeSwitch;
