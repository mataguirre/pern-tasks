import { createContext, useContext, useState } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if(!context) {
        throw new Error("useAuth must be within an AuthProvider");
    }
    return context;
}

export function AuthProvider({children}) {
    const [user, setUser] = useState(null);
    const [isAuth, setIsAuth] = useState(false);
    const [errors, setErrors] = useState(null);

    const signup = async (data) => {
        const response = await axios.post("http://localhost:3000/api/register", data, {
            withCredentials: true
          });
        console.log(response.data);
        setUser(response.data);
    }

    const signin = async (data) => {
        const response = await axios.post("http://localhost:3000/api/login", data, {
            withCredentials: true
          });
        console.log(response.data);
        setUser(response.data);
    }

    return(
        <AuthContext.Provider value={{
            user,
            isAuth,
            errors,
            signup,
            signin
        }}>
            {children}
        </AuthContext.Provider>
    )
}