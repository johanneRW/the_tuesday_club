import useSendData from "../reuseableHooks/useSendData";


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
  const { execute, isLoading, error, data } = useSendData<UserProfileUpdatePayload>("/api/users/profile", "PATCH");

  const updateProfile = async (payload: UserProfileUpdatePayload) => {
    const errors = await execute(payload);
    return errors; // Returnér fejl, hvis der er nogen
  };

  return { updateProfile, isLoading, error, data };
};

export default useUpdateProfile;
