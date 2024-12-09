import usePostData, { ErrorDetail } from "../reuseableHooks/usePostData";
import useSendData from "../reuseableHooks/useSendData";



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
    console.log("useSignup received error:", signupError); // Log fejl
    return signupError; // Returnér fejl til handleSignup
  };

  return { signup, error, isLoading, data };
};

export default useSignup;

