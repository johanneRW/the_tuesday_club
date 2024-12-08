import React, { useEffect } from "react";
import { Box, Heading, Button, VStack, useToast, HStack } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import useForm from "../../hooks/forms/useForm";
import useProfile from "../../hooks/forms/useProfile";
import useUpdateProfile from "../../hooks/forms/useUpdateProfile";
import UserForm from "../forms/UserForm";
import AddressForm from "../forms/AddressForm";

const EditProfile: React.FC = () => {
  const { profile, refetch } = useProfile();
  const { updateProfile, isLoading } = useUpdateProfile();
  const { values, errors, handleChange, validateForm, setValues, resetForm } = useForm({
    username: "",
    email: "",
    firstName: "",
    lastName: "",
    street: "",
    city: "",
    postalCode: "",
    country: "",
  });

  const toast = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    if (profile) {
      setValues({
        username: profile.username,
        email: profile.email,
        firstName: profile.first_name,
        lastName: profile.last_name,
        street: profile.address.street,
        city: profile.address.city,
        postalCode: profile.address.postal_code.toString(),
        country: profile.address.country,
      });
    }
  }, [profile, setValues]);

  const handleSave = async () => {
    if (!validateForm()) {
      toast({
        title: "Validation Error",
        description: "Please fix the errors in the form.",
        status: "error",
        duration: 5000,
      });
      return;
    }

    const payload = {
      user_data: {
        username: values.username,
        email: values.email,
        first_name: values.firstName,
        last_name: values.lastName,
      },
      address_data: {
        street: values.street,
        city: values.city,
        postal_code: parseInt(values.postalCode, 10),
        country: values.country,
      },
    };

    const error = await updateProfile(payload);

    if (error) {
      toast({
        title: "Update Failed",
        description: "Unable to update profile.",
        status: "error",
      });
      return;
    }

    toast({
      title: "Profile Updated",
      description: "Your profile has been successfully updated.",
      status: "success",
    });

    refetch(); // Genindlæs profildata
    navigate("/profile"); // Naviger tilbage til profilvisningen
  };

  const handleReset = () => {
    if (profile) {
      resetForm({
        username: profile.username,
        email: profile.email,
        firstName: profile.first_name,
        lastName: profile.last_name,
        street: profile.address.street,
        city: profile.address.city,
        postalCode: profile.address.postal_code.toString(),
        country: profile.address.country,
      });
    }
  };

  const handleBack = () => {
    navigate("/profile"); // Naviger tilbage til profilvisningen
  };

  return (
    <Box maxW="600px" mx="auto" mt="10" p="6" border="1px solid #ddd" borderRadius="8px">
      <Heading size="lg" mb="4">Edit Profile</Heading>
      <VStack spacing="6" align="stretch">
        <UserForm values={values} errors={errors} handleChange={handleChange} />
        <AddressForm values={values} errors={errors} handleChange={handleChange} />
        <HStack spacing="4">
          <Button
            colorScheme="blue"
            onClick={handleSave}
            isLoading={isLoading}
          >
            Save Changes
          </Button>
          <Button
            colorScheme="gray"
            onClick={handleReset}
          >
            Cancel Changes
          </Button>
          <Button
            colorScheme="red"
            onClick={handleBack}
          >
            Back
          </Button>
        </HStack>
      </VStack>
    </Box>
  );
};

export default EditProfile;
