import { useState } from "react";
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
  Link,
} from "@chakra-ui/react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useAuth } from "../components/context/AuthContext";
import { formatErrorMessage } from "../services/utils/formatErrorMessage";
import useToastHandler from "../hooks/reuseableHooks/UseToastHandler";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login, isLoginLoading, loginError } = useAuth(); // Hent login-funktion fra AuthContext
  const toast = useToast();
  const navigate = useNavigate();
  const { showToast } = useToastHandler(); 

  const handleLogin = async () => {
    const error = await login({ username, password }); // Brug login fra AuthContext
  
    if (error) {
      const errorMessage = formatErrorMessage(error); // Brug helper til at formatere fejl
      showToast({
        title: "Login failed.",
        description: errorMessage,
        status: "error",
        duration: 5000,
      });
      return;
    }

    showToast({
      title: "Login successful",
      description: "Welcome!",
      status: "success",
      duration: 3000,
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
          isLoading={isLoginLoading}
          isDisabled={!username || !password}
        >
          Login
        </Button>
        {loginError && (
          <Text color="red.500" textAlign="center">
            {loginError[0]?.message}
          </Text>
        )}
        <Text textAlign="center">
          Don't have an account yet?{" "}
          <Link as={RouterLink} to="/signup" color="blue.500">
            Signup
          </Link>
        </Text>
      </VStack>
    </Box>
  );
};

export default LoginPage;
