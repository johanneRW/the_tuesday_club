import { FC } from "react";
import { FormControl, FormLabel, Input, FormErrorMessage } from "@chakra-ui/react";

interface UserFormProps {
  values: { [key: string]: string };
  errors: { [key: string]: string };
  handleChange: (field: string, value: string) => void;
}

const UserForm: FC<UserFormProps> = ({ values, errors, handleChange }) => (
  <div>
    {/* Username Field */}
    <FormControl id="username" mb="4" isRequired isInvalid={!!errors.username}>
      <FormLabel>Username</FormLabel>
      <Input
        value={values.username}
        onChange={(e) => handleChange("username", e.target.value)}
        placeholder="Enter your username"
      />
      <FormErrorMessage>{errors.username}</FormErrorMessage>
    </FormControl>

    {/* Email Field */}
    <FormControl id="email" mb="4" isRequired isInvalid={!!errors.email}>
      <FormLabel>Email</FormLabel>
      <Input
        type="email"
        value={values.email}
        onChange={(e) => handleChange("email", e.target.value)}
        placeholder="Enter your email"
      />
      <FormErrorMessage>{errors.email}</FormErrorMessage>
    </FormControl>

    {/* First Name Field */}
    <FormControl id="first_name" mb="4" isRequired isInvalid={!!errors.firstName}>
      <FormLabel>First Name</FormLabel>
      <Input
        value={values.firstName}
        onChange={(e) => handleChange("firstName", e.target.value)}
        placeholder="Enter your first name"
      />
      <FormErrorMessage>{errors.firstName}</FormErrorMessage>
    </FormControl>

    {/* Last Name Field */}
    <FormControl id="last_name" mb="4" isRequired isInvalid={!!errors.lastName}>
      <FormLabel>Last Name</FormLabel>
      <Input
        value={values.lastName}
        onChange={(e) => handleChange("lastName", e.target.value)}
        placeholder="Enter your last name"
      />
      <FormErrorMessage>{errors.lastName}</FormErrorMessage>
    </FormControl>
  </div>
);

export default UserForm;
