// UserForm.tsx
import React from "react";
import { FormControl, FormLabel, Input, VStack } from "@chakra-ui/react";

type UserFormProps = {
  username: string;
  setUsername: (value: string) => void;
  email: string;
  setEmail: (value: string) => void;
  firstName: string;
  setFirstName: (value: string) => void;
  lastName: string;
  setLastName: (value: string) => void;
  password: string;
  setPassword: (value: string) => void;
};

const UserForm = ({
  username,
  setUsername,
  email,
  setEmail,
  firstName,
  setFirstName,
  lastName,
  setLastName,
  password,
  setPassword,
}: UserFormProps) => (
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
      <FormLabel>Email</FormLabel>
      <Input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
      />
    </FormControl>
    <FormControl>
      <FormLabel>First Name</FormLabel>
      <Input
        type="text"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        placeholder="Enter your first name"
      />
    </FormControl>
    <FormControl>
      <FormLabel>Last Name</FormLabel>
      <Input
        type="text"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        placeholder="Enter your last name"
      />
    </FormControl>
    <FormControl>
      <FormLabel>Password</FormLabel>
      <Input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Create a password"
      />
    </FormControl>
  </VStack>
);

export default UserForm;
