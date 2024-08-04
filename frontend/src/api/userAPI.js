const BASE_URL = "http://localhost:4000/users";

export const signin = async () => {};

export const signup = async () => {};

export const getUserById = async (idUser) => {
  const user = await fetch(`${BASE_URL}/getUserById/${idUser}`);
  if (!user.ok) {
    throw new Error("error", user.error);
  }
  return await user.json();
};
