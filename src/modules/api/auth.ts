import type { User } from "types/models";
import { apiURL } from "./api";

export interface AuthError {
  code: string;
  messages?: { email?: string[]; password?: string[] };
  details?: { email?: string[]; password?: string[] };
  status?: number;
  error?: Error;
}

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
): Promise<User | AuthError> => {
  const signInUrl = `${apiURL}/users/sign_in`;
  const response = await authFetch(signInUrl, { user: { email, password } });
  if (response.ok) {
    const { user } = await response.json();
    return user;
  } else {
    const errorMsg = "API sign-in authorization failed.";
    const error = await handleAuthError(response, errorMsg);
    return error;
  }
};

export const signUp = async (
  email: string,
  password: string
): Promise<User | AuthError> => {
  const signUpUrl = `${apiURL}/users/`;
  const response = await authFetch(signUpUrl, { user: { email, password } });
  if (response.ok) {
    const { user } = await response.json();
    return user;
  } else {
    const errorMsg = "API registration failed.";
    const error = await handleAuthError(response, errorMsg);
    return error;
  }
};

export const signOut = async (): Promise<undefined | AuthError> => {
  const signOutUrl = `${apiURL}/users/sign_out`;
  const response = await fetch(signOutUrl, {
    method: "DELETE",
    credentials: "include",
  });
  if (!response.ok) {
    const errorMsg = "API sign-out deauthorization failed.";
    const error = await handleAuthError(response, errorMsg);
    return error;
  }
};

const responseStatus = (response: Response): string =>
  `Status: ${response.status} ${response.statusText}`;

const handleAuthError = async (
  response: Response,
  customMsg?: string
): Promise<AuthError> => {
  const data = await response.json();
  const message = customMsg ?? "API authorization failed.";
  const error = new Error(`${message}\n\t${responseStatus(response)}`);
  console.error(error);
  const authError: AuthError = { code: "" };
  Object.assign(authError, { ...data, error, status: response.status });
  return authError;
};
