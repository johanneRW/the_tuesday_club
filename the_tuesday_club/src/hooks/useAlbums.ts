import { useState, useEffect } from 'react';
import apiClient from '../services/api-client';

export interface Album {
  album_id: string;
  album_name: string;
  artist_name: string;
  units: number;
  format: string;
  label_name: string;
  album_price: number; 
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

        const transformedData = response.data.map(album => ({
          ...album,
          album_price: parseFloat(album.album_price as unknown as string)  // Konverterer pris til number
        }));

        setData(transformedData);
      })
      .catch((error) => setError(error.message))
      .finally(() => setIsLoading(false));
  }, []);

  return { data, error, isLoading };
};

export default useAlbums;
