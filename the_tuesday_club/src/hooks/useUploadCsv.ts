import { useState } from "react";
import privatApiClient from "../services/private-api-client";
import { formatErrorMessage } from "../services/formatErrorMessage";
import useToastHandler from "./reuseableHooks/UseToastHandler";


interface UploadResponse {
  message: string;
}

const useUploadCsv = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { showToast } = useToastHandler(); // Hent showToast fra toast hook

  const uploadCsv = async (file: File, label: string): Promise<UploadResponse | null> => {
    setIsUploading(true);
    setError(null);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("label_name", label);

    try {
      const response = await privatApiClient.post<UploadResponse>("/api/csv/upload_csv", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      showToast({
        title: "Upload Successful",
        description: response.data.message,
        status: "success",
        duration: 3000,
      });

      return response.data;
    } catch (err: any) {
      const errorMessage = formatErrorMessage(err.response?.data?.error || "An error occurred.");
      setError(errorMessage);

      showToast({
        title: "Upload Failed",
        description: errorMessage,
        status: "error",
        duration: 5000,
      });

      return null;
    } finally {
      setIsUploading(false);
    }
  };

  return { uploadCsv, isUploading, error };
};

export default useUploadCsv;
