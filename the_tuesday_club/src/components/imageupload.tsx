import React, { useState } from 'react';
import {
  Box,
  Button,
  Input,
  FormControl,
  FormLabel,
  Image,
  useToast,
  Spinner,
} from '@chakra-ui/react';
import apiClient from '../services/api-client';

const ImageUpload = () => {
  const [image, setImage] = useState<File | null>(null); // Tillader både File og null
  const [preview, setPreview] = useState(null); // Forhåndsvisning af billedet
  const [isLoading, setIsLoading] = useState(false); // Indikator for upload-status
  const toast = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files; // files er af typen FileList | null
    if (files && files[0]) {
      const file = files[0]; // Vi henter den første fil
      setImage(file);
    }
  };

  const handleUpload = async () => {
    if (!image) {
      toast({
        title: "No file selected",
        description: "Please select an image to upload.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    const formData = new FormData();
    formData.append('image', image); // Tilføj billedet til FormData

    setIsLoading(true);
    try {
      const response = await apiClient.post('/api/csv/upload_image', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      toast({
        title: "Upload successful",
        description: response.data.message || "Your image has been uploaded.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Upload failed",
        description: "Something went wrong.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box p={4} borderWidth={1} borderRadius="lg" maxW="md" mx="auto" mt={8}>
      <FormControl>
        <FormLabel htmlFor="file-upload">Upload Image</FormLabel>
        <Input
          id="file-upload"
          type="file"
          accept="image/*"
          onChange={handleFileChange}
        />
      </FormControl>

      {preview && (
        <Box mt={4} textAlign="center">
          <Image
            src={preview}
            alt="Preview"
            borderRadius="md"
            boxSize="200px"
            objectFit="cover"
            mx="auto"
          />
        </Box>
      )}

      <Button
        colorScheme="blue"
        mt={4}
        w="full"
        onClick={handleUpload}
        disabled={isLoading}
      >
        {isLoading ? <Spinner size="sm" /> : 'Upload'}
      </Button>
    </Box>
  );
};


export default ImageUpload;
