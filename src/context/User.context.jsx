import { createContext, useEffect, useState } from "react";

export const userContext = createContext(null);

export default function UserProvider({ children }) {
  const [token, setToken] = useState(() => sessionStorage.getItem("Token"));
  const [role, setRole] = useState(() => sessionStorage.getItem("Role"));  

  useEffect(() => {
    const onStorageChange = () => {
      const storedToken = sessionStorage.getItem("Token");
      const storedRole = sessionStorage.getItem("Role");
      if (storedToken !== token) {
        setToken(storedToken);
      }
      if (storedRole !== role) {
        setRole(storedRole);
      }
    };

    window.addEventListener("storage", onStorageChange);

    return () => window.removeEventListener("storage", onStorageChange);
  }, [token, role]);

  return (
    <userContext.Provider value={{ token, setToken, role, setRole }}>
      {children}
    </userContext.Provider>
  );
}
