import { type AuthData } from "@hooks/useAuth";
import { createContext } from "react";

const UserContext = createContext<AuthData>({} as AuthData);
export default UserContext;
