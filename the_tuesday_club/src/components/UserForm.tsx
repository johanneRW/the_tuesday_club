import { FC } from "react";
import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
} from "@chakra-ui/react";

interface UserFormProps {
  values: { [key: string]: string };
  errors: { [key: string]: string };
  handleChange: (field: string, value: string) => void;
}

const UserForm: FC<UserFormProps> = ({ values, errors, handleChange }) => (
  <div>
    <FormControl id="username" mb="4" isRequired>
      <FormLabel>Username</FormLabel>
      <Input
        value={values.username}
        onChange={(e) => handleChange("username", e.target.value)}
      />
    </FormControl>
    <FormControl id="email" mb="4" isRequired>
      <FormLabel>Email</FormLabel>
      <Input
        type="email"
        value={values.email}
        onChange={(e) => handleChange("email", e.target.value)}
      />
    </FormControl>
    <FormControl id="password" mb="4" isRequired isInvalid={!!errors.password}>
      <FormLabel>Password</FormLabel>
      <Input
        type="password"
        value={values.password}
        onChange={(e) => handleChange("password", e.target.value)}
      />
      <FormErrorMessage>{errors.password}</FormErrorMessage>
    </FormControl>
  </div>
);

export default UserForm;
