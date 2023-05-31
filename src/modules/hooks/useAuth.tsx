import { signIn, signUp, signOut } from "@api/auth";
import { useLocalStorage } from "@mantine/hooks";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { mutate } from "swr";
import type { User } from "types/models";

export interface AuthData {
  currentUser: User | undefined;
  login: (email: string, password: string) => Promise<User | undefined>;
  logout: () => Promise<void>;
  register: (email: string, password: string) => Promise<User | undefined>;
  clearCache: () => Promise<void>;
}

export default function useAuth(): AuthData {
  const navigate = useNavigate()
  const [user, setUser] = useState<User | undefined>(undefined)
  const [currentUser, setCurrentUser, removeValue] = useLocalStorage<
    User | undefined
  >({
    key: "currentUser",
    defaultValue: undefined,
  });

  useEffect(() => {
    setUser(currentUser)
  }, [currentUser])

  const login = async (
    email: string,
    password: string
  ): Promise<User | undefined> => {
    await clearCache();
    const user = await signIn(email, password);
    setCurrentUser(user);
    navigate("/projects")
    return user;
  };

  const logout = async (): Promise<void> => {
    await signOut();
    await clearCache();
    navigate("/welcome")
  };

  const register = async (
    email: string,
    password: string
  ): Promise<User | undefined> => {
    const user = await signUp(email, password);
    setCurrentUser(user);
    return user;
  };

  const clearCache = async (): Promise<void> => {
    removeValue();
    await mutate(() => true, undefined, { revalidate: false });
  };

  return { currentUser: user, login, logout, register, clearCache };
}
