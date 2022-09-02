import {useEffect, useState} from "react";
import useLogout from "../hooks/useLogout";
import {Outlet, useNavigate} from "react-router-dom";

let count = 0
const Logout = () => {
    const [executed, setExecuted] = useState(false)
    const logout = useLogout();
    useEffect(() => {
        const signOut = async () => {
            if (executed === false) {
                const response = await logout();
                // console.log("RES DATA + " + response.data)
                // console.log("RES STAT + " + response.status)
                setExecuted(true)
            }
        };
        signOut();
    }, [])

    return (<Outlet />);
}

export default Logout;

