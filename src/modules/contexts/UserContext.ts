import { type AuthData } from "@hooks/useAuth";
import { createContext } from "react";

const emptyUserContext: AuthData = {
  currentUser: undefined,
  login: async () => undefined,
  logout: async () => undefined,
  register: async () => undefined,
  clearCache: async () => undefined,
};

const UserContext = createContext<AuthData>(emptyUserContext);
export default UserContext;
