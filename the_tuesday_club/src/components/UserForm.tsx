import { FC } from "react";
import {
  FormControl,
  FormLabel,
  Input,
  FormHelperText,
  FormErrorMessage,
} from "@chakra-ui/react";

interface UserFormProps {
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
}

const UserForm: FC<UserFormProps> = ({
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
}) => {
  const isPasswordValid = password.length >= 8; // Validér password

  return (
    <div>
      <FormControl id="username" mb="4" isRequired>
        <FormLabel>Username</FormLabel>
        <Input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </FormControl>
      <FormControl id="email" mb="4" isRequired>
        <FormLabel>Email</FormLabel>
        <Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormControl>
      <FormControl id="first-name" mb="4" isRequired>
        <FormLabel>First Name</FormLabel>
        <Input
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
      </FormControl>
      <FormControl id="last-name" mb="4" isRequired>
        <FormLabel>Last Name</FormLabel>
        <Input
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
      </FormControl>
      <FormControl id="password" mb="4" isRequired isInvalid={!isPasswordValid}>
        <FormLabel>Password</FormLabel>
        <Input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {!isPasswordValid ? (
          <FormErrorMessage>Password must be at least 8 characters long.</FormErrorMessage>
        ) : (
          <FormHelperText>Your password looks good!</FormHelperText>
        )}
      </FormControl>
    </div>
  );
};

export default UserForm;
