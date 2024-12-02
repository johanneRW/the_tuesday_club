import usePostData from "./reuseableHooks/usePostData";


type LogoutResponse = {
  message?: string;
  error?: string;
};

const useLogout = () => {
  const { execute, isLoading, error, data } = usePostData<LogoutResponse>("/api/users/logout");

  const logout = async (): Promise<boolean> => {
    await execute(null); // ingen payload i logout

    if (error) {
      console.error("Logout error:", error);
      return false;
    }

    return true;
  };

  return { logout, isLoading, error, message: data?.message };
};

export default useLogout;
