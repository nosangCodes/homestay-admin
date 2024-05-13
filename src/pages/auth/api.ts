import { loginSchemaType } from "./schemas";

export const login = async (data: loginSchemaType) => {
  try {
    const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/user/login`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (res.ok) {
      return await res.json();
    } else {
      throw Error("Failed to log in");
    }
  } catch (error) {
    console.error("[ERROR LOGGING IN]", error);
    throw error;
  }
};
