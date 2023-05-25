import { User } from "types/models";

// const apiURL = import.meta.env.API_URL;
const apiURL = "http://localhost:5100";

const authFetch = (url: string, body: object): Promise<Response> => {
  return fetch(url, {
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
    const response = await authFetch(signInUrl, {
      user: {
        email: email,
        password: password,
      },
    });

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
    const response = await authFetch(signUpUrl, {
      user: {
        email: email,
        password: password,
      },
    });
    const data = await response.json();
    const user: User = data.user;
    return user;
  } catch (error) {
    console.error("Error registering.\n", error);
  }
};

export const signOut = async () => {
  const signOutUrl = `${apiURL}/users/sign_out`;
  const response = await fetch(signOutUrl, {
    method: "DELETE",
    credentials: "include",
  });
  return await response.json();
};
