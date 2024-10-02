import { HStack, Switch, Text, useColorMode } from "@chakra-ui/react";
import React from "react";

const ColorModeSwitch =() => {
    const { colorMode, toggleColorMode } = useColorMode();
    return (
      <HStack>
        <Switch onChange={toggleColorMode} isChecked={colorMode==="dark" }/>
        <Text>Dark mode </Text>
      </HStack>
    )
  }
  export default ColorModeSwitch