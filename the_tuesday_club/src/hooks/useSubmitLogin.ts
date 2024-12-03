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

  const login = async (payload: LoginPayload): Promise<ErrorDetail[] | null> => {
    const loginError = await execute(payload, { withCredentials: true }); // Sørger for at sende cookies
    console.log("useLogin received error:", loginError); // Log fejl for debugging
    return loginError;
  };

  return { login, error, isLoading, data };
};

export default useLogin;
