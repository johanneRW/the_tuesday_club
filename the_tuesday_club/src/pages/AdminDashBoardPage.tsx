import React, { useState, useEffect } from "react";
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

const AdminDashboard = () => {
  const [file, setFile] = useState<File | null>(null);
  const [labels, setLabels] = useState<string[]>([]);
  const [selectedLabel, setSelectedLabel] = useState<string>("");
  const [newLabel, setNewLabel] = useState<string>("");
  const toast = useToast();

  // Hent eksisterende labels fra en API eller mock-data
  useEffect(() => {
    // Mock-fetch for labels
    setLabels(["Label1", "Label2", "Label3"]);
  }, []);

  // Håndter filvalg
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

  // Håndter upload
  const handleUpload = () => {
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

    // Simuler upload til backend
    console.log("Uploading file:", file.name);
    console.log("Using label:", labelToUse);

    toast({
      title: "Upload Successful",
      description: `File uploaded with label: ${labelToUse}`,
      status: "success",
      duration: 3000,
      isClosable: true,
    });

    // Ryd felter efter upload
    setFile(null);
    setSelectedLabel("");
    setNewLabel("");
  };

  return (
    <Box maxW="800px" mx="auto" mt="10">
      {/* Overskrift uden for boksen */}
      <Heading size="lg" mb="6" textAlign="center">
        Admin Dashboard
      </Heading>

      {/* Indlæsningsboks */}
      <Box p="6" border="1px solid #ddd" borderRadius="8px">
        <Heading size="md" mb="4">
          Upload new file
        </Heading>
        <VStack spacing="4" align="stretch">
          {/* Vælg eller opret label */}
          <FormControl>
            <FormLabel>Select Label</FormLabel>
            <Select
              placeholder="Select an existing label"
              value={selectedLabel}
              onChange={(e) => {
                setSelectedLabel(e.target.value);
                setNewLabel(""); // Ryd ny label, hvis en eksisterende vælges
              }}
            >
              {labels.map((label) => (
                <option key={label} value={label}>
                  {label}
                </option>
              ))}
            </Select>
          </FormControl>
          <FormControl>
            <FormLabel>Create New Label</FormLabel>
            <Input
              placeholder="Enter new label"
              value={newLabel}
              onChange={(e) => {
                setNewLabel(e.target.value);
                setSelectedLabel(""); // Ryd valgt label, hvis en ny indtastes
              }}
            />
          </FormControl>

          {/* Upload CSV */}
          <Input type="file" accept=".csv" onChange={handleFileChange} />
          <Button colorScheme="blue" onClick={handleUpload}>
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
