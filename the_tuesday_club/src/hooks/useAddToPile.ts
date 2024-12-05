import usePostData from "./reuseableHooks/usePostData";


export type AddToPilePayload = {
  album_ids: string[]; // Liste af album-ID'er
};

export type AddToPileResponse = {
  pile_id: string;
  added: string[];
};

const useAddToPile = () => {
  const { execute, isLoading, error, data } = usePostData<AddToPileResponse>("/api/piles/add-to-pile/");


  const addToPile = async (albumIds: string[]): Promise<boolean> => {
    const payload: AddToPilePayload = { album_ids: albumIds };

    const errors = await execute(payload);

   
    return !errors;
  };

  return {
    addToPile,
    isLoading,
    error,
    data,
  };
};

export default useAddToPile;
