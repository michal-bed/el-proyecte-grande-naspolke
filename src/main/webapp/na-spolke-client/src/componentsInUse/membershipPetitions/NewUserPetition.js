import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import {useState} from "react";
import Notification from "./Notification";
import "./MembershipPetitions.module.css";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

const NewUserPetition = () => {

    const axiosPrivate = useAxiosPrivate();
    // axiosPrivate.get("/refresh", {headers: {},}).then(r =>)

    //  //TODO: get User Id from session
    // const [loggedUserId, setLoggedUserId] = useState("5bd0f8e1-adf1-4c4d-ac6f-119ece595f3d")
    // //TODO
    const [showNotification, setNotification] = useState(false);
    const [messages, setMessages] = useState([]);

    let notificationClassCheck = showNotification ? "active" : "";

    // const showRequests = (e) => {
    //     e.preventDefault();
    //     const userData = {loggedUserId};
    //     fetch(`http://localhost:8080/get-request-notification`, {
    //         method: "POST",
    //         headers: {"Content-Type": "application/json"},
    //         body: JSON.stringify(userData)
    //     }).then(response => {
    //             if (response.status === 200) {
    //                 response.json()
    //                     .then(data => {setMessages(data);
    //                         console.log(data)})
    //                 setNotification(showNotification => !showNotification);
    //             } else {
    //                 throw new Error("Can't find company");
    //             }
    //         }).catch(() => console.log("Error!"));
    // }

    const showRequests = (e) => {
        e.preventDefault();
        // const userData = {loggedUserId};
        axiosPrivate.post(`/get-request-notification`, {
            headers: {"Content-Type": "application/json"}
            // body: JSON.stringify(userData)
        }).then(response => {
            if (response.status === 200) {
                response.data
                    .then(data => {setMessages(data);
                        console.log(data)})
                setNotification(showNotification => !showNotification);
            } else {
                throw new Error("Can't find company");
            }
        }).catch(() => console.log("Error!"));
    }

    return (
        <div>
            <NotificationsActiveIcon onClick={showRequests} className={`NotificationsActiveIcon ${notificationClassCheck}`}/>

            {showNotification && <Notification messages={messages}/>}
        </div>
    )
}
// {showNotification && <Notification messages={messages} loggedUserId={loggedUserId}/>}
export default NewUserPetition
