import axios from "../api/axios";
import useAuth from "./useAuth";
import {useNavigate} from "react-router-dom";

const useLogout = () => {
    const { setAuth } = useAuth();
    const navigate = useNavigate();

    const logout = async () => {
        setAuth({});
        try {
            const response = await axios('/logout', {
                withCredentials: true,
                headers: { "Access-Control-Allow-Origin": //http://localhost:3000,
                            "http://localhost:3000"},
            });
            await navigate("/", { replace: true })
            // console.log("RESPONSE + " + response)
            return response;
        } catch (err) {
            console.error(err);
        }
    }

    return logout;
}

export default useLogout