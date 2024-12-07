import React from "react";
import { Box, Button, VStack, Text, Link, Heading } from "@chakra-ui/react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import useForm from "../hooks/useForm";
import UserForm from "../components/UserForm";
import AddressForm from "../components/AddressForm";
import useSubmitSignup from "../hooks/useSubmitSignup";
import useToastHandler from "../hooks/reuseableHooks/UseToastHandler";

const SignupPage = () => {
  const { values, errors, handleChange, validateForm } = useForm({
    username: "",
    email: "",
    firstName: "",
    lastName: "",
    password: "",
    street: "",
    city: "",
    postalCode: "",
    country: "Danmark",
  });

  const { signup, isLoading } = useSubmitSignup();
  const { showToast } = useToastHandler();
  const navigate = useNavigate();

  const handleSignup = async () => {
    if (!validateForm()) {
      showToast({
        title: "Validation Error",
        description: "Please fix the errors in the form.",
        status: "error",
        duration: 5000,
      });
      return;
    }

    const signupError = await signup({
      user_data: {
        username: values.username,
        email: values.email,
        first_name: values.firstName,
        last_name: values.lastName,
        password: values.password,
      },
      address_data: {
        street: values.street,
        city: values.city,
        postal_code: parseInt(values.postalCode, 10),
        country: values.country,
      },
    });

    if (signupError) {
      showToast({
        title: "Signup Failed",
        description: "Please try again later.",
        status: "error",
      });
      return;
    }

    showToast({
      title: "Signup Successful",
      description: "Your account has been created.",
      status: "success",
    });
    navigate("/login");
  };

  return (
    <Box maxW="400px" mx="auto" mt="10" p="6" border="1px solid #ddd" borderRadius="8px">
      <Heading size="lg" mb="4">Sign Up</Heading>
      <VStack spacing="6" align="stretch">
        <UserForm values={values} errors={errors} handleChange={handleChange} />
        <AddressForm values={values} errors={errors} handleChange={handleChange} />
        <Button colorScheme="blue" onClick={handleSignup} isLoading={isLoading}>
          Sign Up
        </Button>
        <Text textAlign="center">
          Already have an account?{" "}
          <Link as={RouterLink} to="/login" color="blue.500">Login</Link>
        </Text>
      </VStack>
    </Box>
  );
};

export default SignupPage;
