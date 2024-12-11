import React from "react";
import { Box, Heading, Text, VStack, Spinner, Alert, AlertIcon, Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import useProfile from "../../hooks/forms/useProfile";

const UserProfile: React.FC = () => {
  const { profile, isLoading, error } = useProfile();
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <Box textAlign="center" mt="10">
        <Spinner size="lg" />
        <Text mt="4">Loading profile...</Text>
      </Box>
    );
  }

  if (error || !profile){
    return (
      <Box textAlign="center" mt="10">
        <Text>No profile data found.</Text>
      </Box>
    );
  }

  return (
    <Box maxW="600px" mx="auto" mt="10" p="6" border="1px solid #ddd" borderRadius="8px">
      <Heading size="lg" mb="4">Profile</Heading>
      <VStack align="start" spacing="4" mb="4">
        <Text>
          <strong>Username:</strong> {profile.username}
        </Text>
        <Text>
          <strong>Email:</strong> {profile.email}
        </Text>
        <Text>
          <strong>First Name:</strong> {profile.first_name}
        </Text>
        <Text>
          <strong>Last Name:</strong> {profile.last_name}
        </Text>
        <Text>
          <strong>Street:</strong> {profile.address.street}
        </Text>
        <Text>
          <strong>City:</strong> {profile.address.city}
        </Text>
        <Text>
          <strong>Postal Code:</strong> {profile.address.postal_code}
        </Text>
        <Text>
          <strong>Country:</strong> {profile.address.country}
        </Text>
      </VStack>
      <Button colorScheme="blue" onClick={() => navigate("/edit-profile")}>
        Edit Profile
      </Button>
    </Box>
  );
};

export default UserProfile;
