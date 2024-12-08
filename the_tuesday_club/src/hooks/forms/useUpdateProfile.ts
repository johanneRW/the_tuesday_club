import usePatchData from "../reuseableHooks/usePatchData";


type UserProfileUpdatePayload = {
  user_data: {
    username: string;
    email: string;
    first_name: string;
    last_name: string;
  };
  address_data: {
    street: string;
    city: string;
    postal_code: number;
    country: string;
  };
};

const useUpdateProfile = () => {
  const { execute, isLoading, error, data } = usePatchData<UserProfileUpdatePayload>("/api/users/profile");

  const updateProfile = async (payload: UserProfileUpdatePayload) => {
    const errors = await execute(payload);
    return errors; // Returnér fejl, hvis der er nogen
  };

  return { updateProfile, isLoading, error, data };
};

export default useUpdateProfile;
