import { FC } from "react";
import { FormControl, FormLabel, Input, FormErrorMessage } from "@chakra-ui/react";

interface PasswordInputProps {
  value: string;
  error: string;
  handleChange: (value: string) => void;
}

const PasswordInput: FC<PasswordInputProps> = ({ value, error, handleChange }) => {
  return (
    <FormControl id="password" mb="4" isRequired isInvalid={!!error}>
      <FormLabel>Password</FormLabel>
      <Input
        type="password"
        value={value}
        onChange={(e) => handleChange(e.target.value)}
        placeholder="Enter your password"
      />
      <FormErrorMessage>
        {error || "Password must be at least 8 characters long."}
      </FormErrorMessage>
    </FormControl>
  );
};

export default PasswordInput;
