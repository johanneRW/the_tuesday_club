import usePostData from "./reuseableHooks/userPostData";


type SignupPayload = {
  user_data: {
    username: string;
    password: string;
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

type SignupResponse = {
  message: string;
};

const useSubmitSignup = () => {
  const { execute, error, isLoading, data } = usePostData<SignupResponse>("/api/users/sign_up");

  // Log fejl for at bekræfte deres format
  if (error) {
    console.error("Signup error:", error);
  }

  const signup = async (payload: SignupPayload) => {
    await execute(payload);
  };

  return { signup, error, isLoading, data };
};


export default useSubmitSignup;
