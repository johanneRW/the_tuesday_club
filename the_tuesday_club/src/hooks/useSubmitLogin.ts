import usePostData, { ErrorDetail } from "./reuseableHooks/usePostData";


type LoginPayload = {
  username: string;
  password: string;
};

type LoginResponse = {
    message: string;
    
  };

const useLogin = () => {
  const { execute, isLoading, error, data } = usePostData<LoginResponse>("/api/users/login");
  const login= async (payload: LoginPayload): Promise<ErrorDetail[] | null> => {
    const loginError = await execute(payload);
    console.log("uselogin received error:", loginError); // Log fejl
    return loginError; // Returnér fejl til handleSignup
  };

  return { login, error, isLoading, data };
  };




export default useLogin;
