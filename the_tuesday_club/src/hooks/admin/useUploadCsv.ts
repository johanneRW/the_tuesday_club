import { useState } from "react";
import apiClientWhitCredentials from "../../services/api/apiClientWhitCredentials";
import { formatErrorMessage } from "../../services/utils/formatErrorMessage";


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
      const response = await apiClientWhitCredentials.post<UploadResponse>("/api/imports/upload_csv", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

  
      return response.data;
    } catch (err: any) {
      const errorMessage = formatErrorMessage(err.response?.data?.error || "An error occurred.");
      setError(errorMessage);


      return null;
    } finally {
      setIsUploading(false);
    }
  };

  return { uploadCsv, isUploading, error };
};

export default useUploadCsv;
