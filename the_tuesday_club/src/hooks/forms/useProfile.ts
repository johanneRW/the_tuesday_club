import useData from "../reuseableHooks/useData";

export interface UserProfile {
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  address: {
    street: string;
    city: string;
    postal_code: string;
    country: string;
  };
}

const useProfile = () => {
  const { data, error, isLoading, refetch } = useData<UserProfile>(
    "/api/users/profile",
    undefined, // Ingen dynamisk `requestConfig`
    [],
    { withCredentials: true, defaultToEmptyArray: false }
  );

  const profile = data[0] || null; // Brug første element som objekt

  return { profile, error, isLoading, refetch };
};

export default useProfile;
