export default function Home() {
  fetch(`${import.meta.env.VITE_BACKEND_URL}/user`, {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then(async (res) => {
      console.log("fetched users successfully", await res.json());
    })
    .catch((err) => {
      console.error("failed to fetch users", JSON.stringify(err));
    });
  return <div>Home</div>;
}
