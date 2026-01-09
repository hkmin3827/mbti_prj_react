import { useState, useEffect, useCallback } from "react";
import type { ReactNode } from "react";
import { getMeApi } from "../../api/auth.api";
import type { User } from "../../types/user";
import { UserContext } from "../../context/UserContext";
import { useAuthStore } from "../../store/authStore";
import profileDefaultImage from "../../assets/images/profileDefaultImage.png";

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchMe = useCallback(async (): Promise<User> => {
    setLoading(true);
    try {
      const me = await getMeApi();
      const profileImage =
        me.profileImage && me.profileImage.trim() !== ""
          ? me.profileImage
          : profileDefaultImage;

      const normalizedUser: User = {
        ...me,
        profileImage,
      };
      setUser(normalizedUser);

      localStorage.setItem("profileImage", profileImage);

      return normalizedUser;
    } finally {
      setLoading(false);
    }
  }, []);

  const accessToken = useAuthStore((s) => s.accessToken);

  useEffect(() => {
    if (!accessToken) {
      setUser(null);
      setLoading(false);
      return;
    }

    fetchMe();
  }, [accessToken, fetchMe]);

  return (
    <UserContext.Provider value={{ user, loading, fetchMe }}>
      {children}
    </UserContext.Provider>
  );
};
