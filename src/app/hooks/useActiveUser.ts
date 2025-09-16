import api from "../lib/axios";

const useActiveUser = async () => {
  const users = await api.get("/user/active");

  return { users };
};

export default useActiveUser;
