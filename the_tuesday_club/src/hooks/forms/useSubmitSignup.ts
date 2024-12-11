import useSendData, { ErrorDetail } from "../reuseableHooks/useSendData";



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

const useSignup = () => {
  const { execute, error, isLoading, data } = useSendData<SignupResponse>("/api/users/sign_up");

  const signup = async (payload: SignupPayload): Promise<ErrorDetail[] | null> => {
    const signupError = await execute(payload);
    return signupError; 
  };

  return { signup, error, isLoading, data };
};

export default useSignup;

