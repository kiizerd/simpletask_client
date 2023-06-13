import { type AuthData } from "@hooks/useAuth";
import { createContext } from "react";

const emptyUserContext: AuthData = {
  user: undefined,
  login: async () => ({ id: 0, email: "" }),
  register: async () => ({ id: 0, email: "" }),
  logout: async () => "",
  clearCache: async () => undefined,
};

const UserContext = createContext<AuthData>(emptyUserContext);
export default UserContext;
