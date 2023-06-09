import type { User } from "types/models";
import { apiURL } from "./api";

const authFetch = async (url: string, body: object): Promise<Response> => {
  return await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(body),
  });
};

export const signIn = async (
  email: string,
  password: string
): Promise<User | undefined> => {
  const signInUrl = `${apiURL}/users/sign_in`;
  try {
    const response = await authFetch(signInUrl, { user: { email, password } });
    const data = await response.json();
    const user: User = data.user;
    return user;
  } catch (error) {
    console.error("Error signing in.\n", error);
  }
};

export const signUp = async (
  email: string,
  password: string
): Promise<User | undefined> => {
  const signUpUrl = `${apiURL}/users/`;
  try {
    const response = await authFetch(signUpUrl, { user: { email, password } });
    const data = await response.json();
    const user: User = data.user;
    return user;
  } catch (error) {
    console.error("Error registering.\n", error);
  }
};

export const signOut = async (): Promise<void> => {
  const signOutUrl = `${apiURL}/users/sign_out`;
  try {
    const response = await fetch(signOutUrl, {
      method: "DELETE",
      credentials: "include",
    });
    return await response.json();
  } catch (error) {
    console.error("Error signing out.\n", error);
  }
};
