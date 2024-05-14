export const me = async () => {
  const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/user/me`, {
    credentials: "include",
  });
  if (!response.ok) {
    throw Error("something went wrong");
  }
  return await response.json();
};
