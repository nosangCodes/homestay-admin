const fetchRooms = async (page = 1, pageSize = 10) => {
  const response = await fetch(
    `${
      import.meta.env.VITE_BACKEND_URL
    }/room?page=${page}&pageSize=${pageSize}`,
    {
      credentials: "include",
    }
  );
  return await response.json();
};

const fetchRoomById = async (id: string) => {
  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/room/${id}`,
    {
      credentials: "include",
    }
  );
  return await response.json();
};

const fetchFacilities = async () => {
  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/room/get-all-facilities`,
    {
      credentials: "include",
    }
  );
  return await response.json();
};

export { fetchRooms, fetchRoomById, fetchFacilities };
