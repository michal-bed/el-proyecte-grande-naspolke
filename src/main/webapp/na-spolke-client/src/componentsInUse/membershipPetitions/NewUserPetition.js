import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import {useState} from "react";
import Notification from "./Notification";
import "./MembershipPetitions.module.css";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import {Popover, Typography} from "@mui/material";

const NewUserPetition = () => {

    const axiosPrivate = useAxiosPrivate();

    const [anchorEl, setAnchorEl] = useState(null);
    const [showNotification, setNotification] = useState(false);
    const [messages, setMessages] = useState([]);
    const [isRotate, setIsRotate] = useState(false);
    const [isOpacity, setIsOpacity] = useState(false);

    let notificationClassCheck = showNotification ? "active" : "";

    const redBackgroundColor = () => {
        setIsRotate(true);
        setIsOpacity(true);
    }

    const blueBackgroundColor = () => {
        setIsRotate(false);
        setIsOpacity(false);
    }

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    const showRequests = (e) => {
        e.preventDefault();
        setAnchorEl(e.currentTarget);
        axiosPrivate.get(`/get-request-notification`
        ).then(response => {
                setMessages(response.data);
                setNotification(showNotification => !showNotification);
        }).catch((error) => console.log(error));
    }

    return (
        <div>
            <NotificationsActiveIcon className={`NotificationsActiveIcon ${notificationClassCheck}`} onClick={showRequests}
            style={{width: '30px', height: '30px', opacity: isOpacity ? 1 : 0.7, transform: isRotate ? 'rotate(30deg)' : '',
                transition: 'transform 150ms ease'}} onMouseEnter={redBackgroundColor} onMouseLeave={blueBackgroundColor}/>
            <Popover id={id} open={open} anchorEl={anchorEl} onClose={handleClose} anchorOrigin={{vertical: 'bottom', horizontal: 'left',}}>
                <Typography sx={{p: 2}}><Notification messages={messages}/></Typography>
            </Popover>
        </div>
    )
}

export default NewUserPetition
