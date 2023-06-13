import { signIn, signUp, signOut, type AuthError } from "@api/auth";
import { useLocalStorage } from "@mantine/hooks";
import { mutate } from "swr";
import type { User } from "types/models";

export interface AuthData {
  user: User | undefined;
  login: (email: string, password: string) => Promise<User | AuthError>;
  register: (email: string, password: string) => Promise<User | AuthError>;
  logout: () => Promise<string | AuthError>;
  clearCache: () => Promise<void>;
}

// Sends requests to API for authorization and stores User data in client.
export default function useAuth(): AuthData {
  const [user, setUser, removeValue] = useLocalStorage<User | undefined>({
    key: "current-user",
    defaultValue: undefined,
  });

  const login = async (
    email: string,
    password: string
  ): Promise<User | AuthError> => {
    await clearCache();
    const loginResponse = await signIn(email, password);
    if ("id" in loginResponse) {
      setUser(loginResponse);
      return loginResponse;
    } else return loginResponse;
  };

  const register = async (
    email: string,
    password: string
  ): Promise<User | AuthError> => {
    await clearCache();
    const registerResponse = await signUp(email, password);
    if ("id" in registerResponse) {
      setUser(registerResponse);
      return registerResponse;
    } else return registerResponse;
  };

  const logout = async (): Promise<string | AuthError> => {
    const logoutResponse = await signOut();
    if (!logoutResponse) {
      await clearCache();
      return 'success';
    } else return logoutResponse;
  };

  const clearCache = async (): Promise<void> => {
    removeValue();
    await mutate(() => true, undefined, { revalidate: false });
  };

  return { user, login, logout, register, clearCache };
}
