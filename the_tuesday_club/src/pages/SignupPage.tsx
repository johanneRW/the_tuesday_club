import { useState } from "react";
import {
  Box,
  Button,
  VStack,
  Text,
  Link,
  Heading,
} from "@chakra-ui/react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import useSubmitSignup from "../hooks/useSubmitSignup";
import UserForm from "../components/UserForm";
import AddressForm from "../components/AddressForm";
import useToastHandler from "../hooks/reuseableHooks/UseToastHandler";
import { formatErrorMessage } from "../services/formatErrorMessage";


const SignupPage = () => {
  // Brugerdata
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");

  // Adressedata
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [country, setCountry] = useState("Danmark");

  // Fejltilstande
  const [postalCodeError, setPostalCodeError] = useState(false);

  const { signup, error, isLoading } = useSubmitSignup();
  const { showToast } = useToastHandler(); // Brug det nye toast handler
  const navigate = useNavigate();

  const handlePostalCodeChange = (value: string) => {
    if (/^\d{0,4}$/.test(value)) {
      setPostalCode(value);
      setPostalCodeError(value.length !== 4); // Fejl, hvis postnummeret ikke er præcis 4 cifre
    } else {
      setPostalCodeError(true);
    }
  };

  const handleSignup = async () => {
    if (!isFormValid()) {
      console.error("Validation failed.");
      return; // Stop, hvis formularen ikke er gyldig
    }

    const signupError = await signup({
      user_data: {
        username,
        password,
        email,
        first_name: firstName,
        last_name: lastName,
      },
      address_data: {
        street,
        city,
        postal_code: parseInt(postalCode, 10),
        country,
      },
    });

    if (signupError) {
      // Brug fejlformattering og toast handler
      const errorMessage = formatErrorMessage(signupError);
      showToast({
        title: "Signup failed.",
        description: errorMessage,
        status: "error",
        duration: 5000,
      });
      return;
    }

    // Succesbesked
    showToast({
      title: "Account created.",
      description: "You can now log in with your credentials.",
      status: "success",
      duration: 3000,
    });
    navigate("/login");
  };

  const isFormValid = () => {
    return (
      username &&
      email &&
      firstName &&
      lastName &&
      password &&
      street &&
      city &&
      postalCode.length === 4 &&
      country
    );
  };

  return (
    <Box
      maxW="400px"
      mx="auto"
      mt="10"
      p="6"
      border="1px solid #ddd"
      borderRadius="8px"
    >
      <Heading size="lg" mb="4">
        Sign Up
      </Heading>
      <VStack spacing="6" align="stretch">
        <UserForm
          username={username}
          setUsername={setUsername}
          email={email}
          setEmail={setEmail}
          firstName={firstName}
          setFirstName={setFirstName}
          lastName={lastName}
          setLastName={setLastName}
          password={password}
          setPassword={setPassword}
        />
        <AddressForm
          street={street}
          setStreet={setStreet}
          city={city}
          setCity={setCity}
          postalCode={postalCode}
          setPostalCode={handlePostalCodeChange}
          postalCodeError={postalCodeError}
          country={country}
          setCountry={setCountry}
        />
        <Button
          colorScheme="blue"
          onClick={handleSignup}
          isLoading={isLoading}
          isDisabled={!isFormValid()} // Deaktiver knappen, hvis formularen ikke er gyldig
        >
          Sign Up
        </Button>
        <Text textAlign="center">
          Already have an account?{" "}
          <Link as={RouterLink} to="/login" color="blue.500">
            Login
          </Link>
        </Text>
      </VStack>
    </Box>
  );
};

export default SignupPage;
