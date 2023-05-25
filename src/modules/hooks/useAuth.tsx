import { signIn, signUp, signOut } from "@api/auth";
import { useLocalStorage } from "@mantine/hooks";
import type { User } from "types/models";

export default function useAuth() {
  const [currentUser, setCurrentUser] = useLocalStorage<User | null>({
    key: "current_user",
    defaultValue: null,
  });

  const login = async (email: string, password: string) => {
    const user = await signIn(email, password);
    setCurrentUser(user || null);
    console.log("Logging in from Auth hook")
  };

  const logout = async () => {
    await signOut();
    setCurrentUser(null);
    console.log("Logging out from Auth hook")
  };

  const register = async (email: string, password: string) => {
    const user = await signUp(email, password);
    setCurrentUser(user || null);
    console.log("Signing up from Auth hook")
  };

  return { currentUser, login, logout, register };
}
