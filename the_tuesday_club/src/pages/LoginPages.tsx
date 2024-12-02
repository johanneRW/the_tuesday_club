import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Text,
  Heading,
  useToast,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import useLogin from "../hooks/useSubmitLogin";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login, error, isLoading, data } = useLogin();
  const toast = useToast();
  const navigate = useNavigate();

  const handleLogin = async () => {
    const loginError = await login({ username, password });

    if (loginError) {
      toast({
        title: "login failed.",
        description: loginError.map((e) => e.msg).join(" | "),
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return; // Stop her, hvis der er fejl
    }
  
    toast({
      title: "Login successful!",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
    navigate("/");
  };

  return (
    <Box maxW="400px" mx="auto" mt="10" p="6" border="1px solid #ddd" borderRadius="8px">
      <Heading size="lg" mb="6">
        Login
      </Heading>
      <VStack spacing="4" align="stretch">
        <FormControl>
          <FormLabel>Username</FormLabel>
          <Input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your username"
          />
        </FormControl>
        <FormControl>
          <FormLabel>Password</FormLabel>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
          />
        </FormControl>
        <Button
          colorScheme="blue"
          onClick={handleLogin}
          isLoading={isLoading}
          isDisabled={!username || !password}
        >
          Login
        </Button>
        
      </VStack>
    </Box>
  );
};

export default LoginPage;
