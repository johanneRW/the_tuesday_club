import { useState } from "react";
import privatApiClient from "../services/private-api-client";



interface UploadResponse {
  message: string;
}

const useUploadCsv = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
      return response.data;
    } catch (err: any) {
      setError(err.response?.data?.error || "An error occurred while uploading the file.");
      return null;
    } finally {
      setIsUploading(false);
    }
  };

  return { uploadCsv, isUploading, error };
};

export default useUploadCsv;
