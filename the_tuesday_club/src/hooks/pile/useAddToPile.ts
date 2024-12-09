import usePostData from "../reuseableHooks/usePostData";
import useSendData from "../reuseableHooks/useSendData";


export type AlbumQuantity = {
  album_id: string; // Album ID
  quantity: number; // Mængde af albummer
};


export type AddToPilePayload = {
  albums: AlbumQuantity[]; 
};

// Responsen fra API'et
export type AddToPileResponse = {
  pile_id: string; 
  added: AlbumQuantity[]; 
};

const useAddToPile = () => {
  const { execute, isLoading, error, data } = useSendData<AddToPileResponse>("/api/piles/add-to-pile/");

  const addToPile = async (albums: AlbumQuantity[]): Promise<boolean> => {
    const payload: AddToPilePayload = { albums }; 

    const errors = await execute(payload);

    return !errors; // Returnér true, hvis der ikke er fejl
  };

  return {
    addToPile,
    isLoading,
    error,
    data,
  };
};

export default useAddToPile;
