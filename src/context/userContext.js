import axios from "axios";
import { createContext, useContext, useState,useEffect } from 'react';


export const UserContext = createContext([]);

export function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    console.log("Effect is running");
    if (!user) {
      console.log("Fetching dashboard data");
      axios
        .get("/dashboard")
        .then(({ data }) => {
          console.log("Data received:", data);
          setUser(data);
        })
        .catch((error) => {
          console.error("Error fetching dashboard data:", error);
        });
    }
  }, [user]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUserContext() {
  return useContext(UserContext);
}
