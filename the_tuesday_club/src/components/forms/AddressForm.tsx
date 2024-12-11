import { FC } from "react";
import { FormControl, FormLabel, Input, VStack, FormErrorMessage } from "@chakra-ui/react";

interface AddressFormProps {
  values: { [key: string]: string };
  errors: { [key: string]: string };
  handleChange: (field: string, value: string) => void;
}

const AddressForm: FC<AddressFormProps> = ({ values, errors, handleChange }) => (
  <VStack spacing="4" align="stretch">
    <FormControl>
      <FormLabel>Street</FormLabel>
      <Input
        value={values.street}
        onChange={(e) => handleChange("street", e.target.value)}
      />
    </FormControl>
    <FormControl>
      <FormLabel>City</FormLabel>
      <Input
        value={values.city}
        onChange={(e) => handleChange("city", e.target.value)}
      />
    </FormControl>
    <FormControl isInvalid={!!errors.postalCode}>
      <FormLabel>Postal Code</FormLabel>
      <Input
        value={values.postalCode}
        onChange={(e) => handleChange("postalCode", e.target.value)}
      />
      <FormErrorMessage>{errors.postalCode}</FormErrorMessage>
    </FormControl>
    <FormControl>
      <FormLabel>Country</FormLabel>
      <Input
        value={values.country}
        onChange={(e) => handleChange("country", e.target.value)}
      />
    </FormControl>
  </VStack>
);

export default AddressForm;
