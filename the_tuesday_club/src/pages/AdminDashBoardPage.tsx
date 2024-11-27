import React, { useState } from "react";
import {
  Box,
  Button,
  Input,
  VStack,
  Text,
  Heading,
  Select,
  useToast,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import useAllLabels from "../hooks/useAllLabels";
import useUploadCsv from "../hooks/useUploadCsv";


const AdminDashboard = () => {
  const [file, setFile] = useState<File | null>(null);
  const [selectedLabel, setSelectedLabel] = useState<string>("");
  const [newLabel, setNewLabel] = useState<string>("");
  const toast = useToast();

  // Hent labels med useAllLabels
  const { data: labels, error: fetchError, isLoading } = useAllLabels();

  // Håndter upload med useUploadCsv
  const { uploadCsv, isUploading, error: uploadError } = useUploadCsv();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const uploadedFile = event.target.files[0];
      setFile(uploadedFile);
      toast({
        title: "File selected",
        description: `${uploadedFile.name} is ready for upload`,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleUpload = async () => {
    if (!file) {
      toast({
        title: "No file selected",
        description: "Please select a file before uploading.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    if (!selectedLabel && !newLabel) {
      toast({
        title: "No label selected",
        description: "Please select or create a label.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    const labelToUse = newLabel || selectedLabel;

    const result = await uploadCsv(file, labelToUse);

    if (result) {
      toast({
        title: "Upload Successful",
        description: result.message,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      setFile(null);
      setSelectedLabel("");
      setNewLabel("");
    } else {
      toast({
        title: "Upload Failed",
        description: uploadError,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box maxW="800px" mx="auto" mt="10">
      <Heading size="lg" mb="6" textAlign="center">
        Admin Dashboard
      </Heading>

      <Box p="6" border="1px solid #ddd" borderRadius="8px">
        <Heading size="md" mb="4">
          Upload new file
        </Heading>
        <VStack spacing="4" align="stretch">
          <FormControl>
            <FormLabel>Select Label</FormLabel>
            {isLoading ? (
              <Text>Loading labels...</Text>
            ) : fetchError ? (
              <Text color="red.500">{fetchError}</Text>
            ) : (
              <Select
                placeholder="Select an existing label"
                value={selectedLabel}
                onChange={(e) => {
                  setSelectedLabel(e.target.value);
                  setNewLabel("");
                }}
              >
                {labels?.map((label) => (
                  <option key={label.label_name} value={label.label_name}>
                    {label.label_name}
                  </option>
                ))}
              </Select>
            )}
          </FormControl>
          <FormControl>
            <FormLabel>Create New Label</FormLabel>
            <Input
              placeholder="Enter new label"
              value={newLabel}
              onChange={(e) => {
                setNewLabel(e.target.value);
                setSelectedLabel("");
              }}
            />
          </FormControl>

          <Input type="file" accept=".csv" onChange={handleFileChange} />
          <Button
            colorScheme="blue"
            onClick={handleUpload}
            isLoading={isUploading}
            isDisabled={isUploading}
          >
            Upload CSV
          </Button>
          {file && (
            <Text fontSize="sm" color="gray.500">
              Selected file: {file.name}
            </Text>
          )}
        </VStack>
      </Box>
    </Box>
  );
};

export default AdminDashboard;
