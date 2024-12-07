import { useState, useEffect } from "react";
import axios from "axios";

const useProfile = () => {
  const [profile, setProfile] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      setIsLoading(true);
      setError("");
      try {
        const response = await axios.get("/api/profile/", { withCredentials: true });
        setProfile(response.data);
      } catch (err: any) {
        setError(err.message || "Failed to load profile.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, []);

  return { profile, isLoading, error };
};

export default useProfile;
