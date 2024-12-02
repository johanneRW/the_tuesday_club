import React from "react";
import {
  FormControl,
  FormLabel,
  Input,
  VStack,
  FormErrorMessage,
} from "@chakra-ui/react";

type AddressFormProps = {
  street: string;
  setStreet: (value: string) => void;
  city: string;
  setCity: (value: string) => void;
  postalCode: string;
  setPostalCode: (value: string) => void;
  postalCodeError: boolean;
  country: string;
  setCountry: (value: string) => void;
};

const AddressForm = ({
  street,
  setStreet,
  city,
  setCity,
  postalCode,
  setPostalCode,
  postalCodeError,
  country,
  setCountry,
}: AddressFormProps) => (
  <VStack spacing="4" align="stretch">
    <FormControl>
      <FormLabel>Street</FormLabel>
      <Input
        type="text"
        value={street}
        onChange={(e) => setStreet(e.target.value)}
        placeholder="Enter your street address"
      />
    </FormControl>
    <FormControl>
      <FormLabel>City</FormLabel>
      <Input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter your city"
      />
    </FormControl>
    <FormControl isInvalid={postalCodeError}>
      <FormLabel>Postal Code</FormLabel>
      <Input
        type="text"
        value={postalCode}
        onChange={(e) => setPostalCode(e.target.value)}
        placeholder="Enter your postal code"
      />
      {postalCodeError && (
        <FormErrorMessage>Postal code must be exactly 4 digits.</FormErrorMessage>
      )}
    </FormControl>
    <FormControl>
      <FormLabel>Country</FormLabel>
      <Input
        type="text"
        value={country}
        onChange={(e) => setCountry(e.target.value)}
        placeholder="Enter your country"
      />
    </FormControl>
  </VStack>
);

export default AddressForm;
