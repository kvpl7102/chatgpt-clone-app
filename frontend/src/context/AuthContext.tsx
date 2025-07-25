import { createContext, useContext, useEffect, useState, type ReactNode, useMemo } from "react";
import { checkAuthStatus, loginUser, logoutUser, signupUser } from "../helpers/api-communicator";
import { azAZ } from "@mui/material/locale";

type User = {
    name: string;
    email: string;
}

type UserAuth = {
    isLoggedIn: boolean;
    user: User | null;
    login: (email: string, password: string) => Promise<void>
    signup: (name: string, email: string, password: string) => Promise<void>
    logout: () => Promise<void>;

}

const AuthContext = createContext<UserAuth|null>(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({children} : {children: ReactNode}) => {
    const [user, setUser] = useState<User|null>(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        // Fetch if user's cookies are valid, then skip login
        async function checkStatus () {
            const data = await checkAuthStatus();
            if (data) {
                setUser({ name: data.name, email: data.email  });
                setIsLoggedIn(true);
            }
        }
        checkStatus();
    }, []);
    const login = async(email: string, password: string) => {
        const data = await loginUser(email, password);
        if (data) {
            setUser({ name: data.name, email: data.email  });
            setIsLoggedIn(true);
        }
    };
    const signup = async(name: string, email: string, password: string) => {
        const data = await signupUser(name, email, password);
        if (data) {
            setUser({name: data.name, email: data.email});
            setIsLoggedIn(true);
        }
    };
    const logout = async() => {
        await logoutUser();
        setIsLoggedIn(false);
        setUser(null);
        window.location.reload();
    };

    const value = useMemo(
        () => ({
          user,
          isLoggedIn,
          login,
          signup,
          logout,
        }),
        [user, isLoggedIn]
      );

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
};

