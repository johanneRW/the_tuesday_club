import { useState, useRef, ChangeEvent, FC } from "react";
import {
  Box,
  VStack,
  FormControl,
  FormLabel,
  Input,
  Select,
  Button,
  Text,
} from "@chakra-ui/react";
import useUploadCsv from "../../hooks/admin/useUploadCsv";
import useToastHandler from "../../hooks/reuseableHooks/UseToastHandler";


type FileUploadProps = {
  labels: Array<{ label_name: string }>;
  isLoading: boolean;
  fetchError: string | null;
  onRefresh: () => void;
};

const FileUploadComponent: FC<FileUploadProps> = ({
  labels,
  isLoading,
  fetchError,
  onRefresh,
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [selectedLabel, setSelectedLabel] = useState<string>("");
  const [newLabel, setNewLabel] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null); // Ref til filinput

  const { uploadCsv, isUploading, error: uploadError } = useUploadCsv();
  const { showToast } = useToastHandler();

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const uploadedFile = event.target.files[0];
      setFile(uploadedFile);
      showToast({
        title: "File selected",
        description: `${uploadedFile.name} is ready for upload`,
        status: "success",
      });
    }
  };

  const handleUpload = async () => {
    if (!file) {
      showToast({
        title: "No file selected",
        description: "Please select a file before uploading.",
        status: "error",
      });
      return;
    }

    if (!selectedLabel && !newLabel) {
      showToast({
        title: "No label selected",
        description: "Please select or create a label.",
        status: "error",
      });
      return;
    }

    const labelToUse = newLabel || selectedLabel;

    const result = await uploadCsv(file, labelToUse);

    if (result) {
      showToast({
        title: "Upload Successful",
        description: result.message,
        status: "success",
      });

      // Tøm felter og nulstil filinput
      setFile(null);
      setSelectedLabel("");
      setNewLabel("");
      if (fileInputRef.current) {
        fileInputRef.current.value = ""; // Nulstil inputfeltets værdi
      }

      onRefresh(); // Genindlæs labels
    } else {
      showToast({
        title: "Upload Failed",
        description: uploadError || "An error occurred during upload.",
        status: "error",
      });
    }
  };

  return (
    <Box p="4">
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
              {labels.map((label) => (
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
        <Input
          ref={fileInputRef}
          type="file"
          accept=".csv"
          onChange={handleFileChange}
        />
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
  );
};

export default FileUploadComponent;
