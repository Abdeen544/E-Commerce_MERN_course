import { FC, PropsWithChildren, useState } from "react";
import { AuthContext } from "./AuthContext";

const USER_NAME_KEY = 'username';
const TOKEN_KEY = 'token'

const AuthProvider: FC<PropsWithChildren> = ({children}) => {
    const [username, setUserName] = useState<string | null>(localStorage.getItem(USER_NAME_KEY));
    const [token, setToken] = useState<string | null>(localStorage.getItem(TOKEN_KEY));

    const login = (username: string, token: string) => {
        setUserName(username),
        setToken(token),
        localStorage.setItem(USER_NAME_KEY, username),
        localStorage.setItem(TOKEN_KEY, token)
    }

    const isAuthenticated = !!token;

    const logout = () => {
        localStorage.removeItem(USER_NAME_KEY);
        localStorage.removeItem(TOKEN_KEY);
        setUserName(null);
        setToken(null);
    }

    return (
        <AuthContext.Provider value={{username, token, isAuthenticated, login, logout}}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;