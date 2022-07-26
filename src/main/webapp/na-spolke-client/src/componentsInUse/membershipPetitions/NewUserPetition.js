import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import {useState} from "react";
import Notification from "./Notification";
import "./MembershipPetitions.module.css";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

const NewUserPetition = () => {

    const axiosPrivate = useAxiosPrivate();

    const [showNotification, setNotification] = useState(false);
    const [messages, setMessages] = useState([]);

    let notificationClassCheck = showNotification ? "active" : "";

    const showRequests = (e) => {
        e.preventDefault();
        axiosPrivate.get(`/get-request-notification`
        ).then(response => {
                setMessages(response.data);
                setNotification(showNotification => !showNotification);
        }).catch((error) => console.log(error));
    }

    return (
        <div>
            <NotificationsActiveIcon onClick={showRequests} className={`NotificationsActiveIcon ${notificationClassCheck}`}/>
            {showNotification && <Notification messages={messages}/>}
        </div>
    )
}
export default NewUserPetition
