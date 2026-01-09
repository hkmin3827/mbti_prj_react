import { createContext } from "react";
import type { User } from "../types/user";

interface UserContextValue {
  user: User | null;
  loading: boolean;
  fetchMe: () => Promise<User>;
}

export const UserContext = createContext<UserContextValue>({
  user: null,
  loading: true,
  fetchMe: async () => {
    throw new Error("fetchMe not implemented");
  },
});
