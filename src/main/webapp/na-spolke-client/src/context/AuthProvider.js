import { createContext, useState } from "react";
import AESDecrypt from "../util/AESDecrypt";
import useRefreshToken from "../hooks/useRefreshToken";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({});

    const [persist, setPersist] = useState(localStorage.getItem("persist") === "undefined" || localStorage.getItem("persist") == null
                                            ? false
                                            : JSON.parse(localStorage.getItem("persist")));
    const [user, setUser] = useState(
        (localStorage.getItem("user") === "undefined"
            || localStorage.getItem("user") === ""
            || localStorage.getItem("user") == null)
            ? "nie wybrano"
            : (
                auth.accessToken != null
                && auth.accessToken !== "undefined"
                && auth.accessToken !== ""
                ? AESDecrypt(localStorage.getItem("user"))
                : "nie wybrano")
    );
    const [currentCompany, setCurrentCompany] = useState(
        (sessionStorage.getItem("currentCompany") === "undefined" ||
        sessionStorage.getItem("currentCompany") == null)
        ? "nie wybrano"
        : AESDecrypt(sessionStorage.getItem("currentCompany"))
    );


    return (
        <AuthContext.Provider value={{ auth, setAuth, persist, setPersist,
            user, setUser, currentCompany, setCurrentCompany }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;