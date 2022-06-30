import { createContext, useState } from "react";
import AESDecrypt from "../util/AESDecrypt";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({});
    // console.log("authPersist", localStorage.getItem("persist"));
    const [persist, setPersist] = useState(localStorage.getItem("persist") === "undefined" || localStorage.getItem("persist") == null
                                            ? false
                                            : JSON.parse(localStorage.getItem("persist")));
    const [user, setUser] = useState(
        (localStorage.getItem("user") === "undefined" ||
            localStorage.getItem("user") == null)
            ? "nie wybrano"
            : AESDecrypt(localStorage.getItem("user"))
    );
    const [currentCompany, setCurrentCompany] = useState(
        (localStorage.getItem("currentCompany") === "undefined" ||
        localStorage.getItem("currentCompany") == null)
        ? "nie wybrano"
        : AESDecrypt(localStorage.getItem("currentCompany"))
    );

    return (
        <AuthContext.Provider value={{ auth, setAuth, persist, setPersist,
            user, setUser, currentCompany, setCurrentCompany }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;