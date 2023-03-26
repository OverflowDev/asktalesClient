import { createContext, useEffect, useState } from "react";
import jwtDecode from "jwt-decode";

const AuthContext = createContext()


export const AuthProvider = ({children}) => {

  const [user, setUser] = useState(null);

  const login = (token) => {
    const decodedToken = jwtDecode(token);
    setUser(decodedToken);
    localStorage.setItem("jwtToken", token);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("jwtToken")
  };

  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    if (token) {
      const decodedToken = jwtDecode(token);
      if (decodedToken.exp * 1000 < Date.now()) {
        localStorage.removeItem("jwtToken");
      } else {
        setUser(decodedToken);
      }
    }
  }, []);


return (
    <AuthContext.Provider value={{ 
        user,
        login,
        logout
    }}>
        {children}
    </AuthContext.Provider>
    )

}

export default AuthContext