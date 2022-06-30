import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import {useState} from "react";
import Notification from "./Notification";
import "./MembershipPetitions.module.css";

const NewUserPetition = () => {
    //TODO: get User Id from session
    const [loggedUserId, setLoggedUserId] = useState("f5ee767b-720f-4b26-b5ff-cfa0ebd5bed0")
    //TODO
    const [showNotification, setNotification] = useState(false);
    const [messages, setMessages] = useState([]);

    let notificationClassCheck = showNotification ? "active" : "";

    const showRequests = (e) => {
        e.preventDefault();
        const userData = {loggedUserId};
        fetch(`http://localhost:8080/get-request-notification`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(userData)
        }).then(response => {
                if (response.status === 200) {
                    response.json()
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
            {showNotification && <Notification messages={messages} loggedUserId={loggedUserId}/>}
        </div>
    )
}

export default NewUserPetition