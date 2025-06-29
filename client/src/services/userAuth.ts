import { useEffect, useState } from "react";
import axios from "./axios";

export function useAuth() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios.get("/auth/me")
      .then((res) => setUser(res.data))
      .catch(() => setUser(null));
  }, []);

  return user;
}
