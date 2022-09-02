import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import useRefreshToken from '../../hooks/useRefreshToken';
import useAuth from '../../hooks/useAuth';
import AESDecrypt from "../../util/AESDecrypt";

const PersistLogin = () => {
    const [isLoading, setIsLoading] = useState(true);
    const refresh = useRefreshToken();
    const { auth, persist, setUser } = useAuth();

    useEffect(() => {
        let isMounted = true;

        const verifyRefreshToken = async () => {
            try {
                await refresh();
                setUser(
                    (localStorage.getItem("user") === "undefined"
                        || localStorage.getItem("user") === ""
                        || localStorage.getItem("user") == null)
                        ? "nie wybrano"
                        : (auth.accessToken !== "undefined"
                            && auth.accessToken !== ""
                                ? AESDecrypt(localStorage.getItem("user"))
                                : "nie wybrano")
                );
            }
            catch (err) {
                console.error(err);
            }
            finally {
                isMounted && setIsLoading(false);
            }
        }

        // Avoids unwanted call to verifyRefreshToken
        !auth?.accessToken && persist ? verifyRefreshToken() : setIsLoading(false);

        return () => isMounted = false;
    }, [])

    useEffect(() => {
        // console.log(`isLoading: ${isLoading}`)
        // console.log(`persist: ${persist}`)
        // console.log(`aT: ${JSON.stringify(auth?.accessToken)}`)
    }, [isLoading])

    return (
        <>
            {!persist
                ? <Outlet />
                : isLoading
                    ? <p>Ładowanie...</p>
                    : <Outlet />
            }
        </>
    )
}

export default PersistLogin