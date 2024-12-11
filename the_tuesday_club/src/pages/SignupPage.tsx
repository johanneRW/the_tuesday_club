import { useEffect, useState } from "react";
import { Box, Button, VStack, Text, Link, Heading } from "@chakra-ui/react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import useForm from "../hooks/forms/useForm";
import UserForm from "../components/forms/UserForm";
import AddressForm from "../components/forms/AddressForm";
import PasswordInput from "../components/forms/PasswordInput";
import useSubmitSignup from "../hooks/forms/useSubmitSignup";
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
  const [isFormReady, setIsFormReady] = useState(false);

  // Debugging og opdatering af knaptilstand
  useEffect(() => {
    const allFieldsFilled = Object.values(values).every((value) => value.trim() !== "");
    const noErrors = Object.values(errors).every((error) => !error);

    setIsFormReady(allFieldsFilled && noErrors);
  }, [values, errors]);

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
        {/* User Details */}
        <UserForm values={values} errors={errors} handleChange={handleChange} />

        {/* Password Field */}
        <PasswordInput
          value={values.password}
          error={errors.password}
          handleChange={(value) => handleChange("password", value)}
        />

        {/* Address Details */}
        <AddressForm values={values} errors={errors} handleChange={handleChange} />

        {/* Submit Button */}
        <Button
          colorScheme="blue"
          onClick={handleSignup}
          isLoading={isLoading}
          isDisabled={!isFormReady}
        >
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
