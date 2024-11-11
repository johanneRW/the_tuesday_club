import { useState, useEffect } from 'react';
import apiClient from '../services/api-client';
import { AxiosRequestConfig } from 'axios';

export interface Album {
  album_id: string;
  album_name: string;
  artist_name: string;
  units: number;
  format: string;
  label_name: string;
}

const useAlbums = () => {
  const [data, setData] = useState<Album[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    apiClient
      .get<Album[]>('/api/albums') 
      .then((response) => {
        console.log("Fetched albums:", response.data); 
        setData(response.data);
      })
      .catch((error) => setError(error.message))
      .finally(() => setIsLoading(false));
  }, []);

  return { data, error, isLoading };
};

export default useAlbums;
