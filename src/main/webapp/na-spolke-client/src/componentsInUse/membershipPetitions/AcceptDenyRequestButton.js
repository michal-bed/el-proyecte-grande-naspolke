import {useState} from "react";
import DeleteNotificationButton from "./DeleteNotificationButton";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

const AcceptDenyRequestButton = ({ message }) => {

    const axiosPrivate = useAxiosPrivate();
    const krsNumber = message.krsNumber;
    const emailSender = message.emailSender;
    const messageId = message.messageId;

    let [decision, setDecision] = useState("");
    let [messageText, setMessageText] = useState("");
    const [showAcceptButton, setShowAcceptButton] = useState(true);
    const [showDenyButton, setShowDenyButton] = useState(true);
    const [showDecisionInfo, setShowDecisionInfo] = useState(false);

    const accept = () => {
        setDecision(decision = "accept");
        if (message.membershipRequest === true) {
            setMessageText(messageText = "Twoja prośba o członkostwo została zaakceptowana.")
            sendRequestDecision();
        } else if (message.membershipInvitation === true) {
            setMessageText(messageText = "Użytkownik zaakceptował Twoje zaproszenie.")
            sendInvitationDecision();
        }
    }

    const deny = () => {
        setDecision(decision = "deny");
        if (message.membershipRequest === true) {
            setMessageText(messageText = "Twoja prośba o członkostwo została odrzucona.")
            sendRequestDecision();
        } else if (message.membershipInvitation === true) {
            setMessageText(messageText = "Użytkownik odrzucił Twoje zaproszenie.")
            sendInvitationDecision();
        }
    }

    const sendInvitationDecision = () => {
        const userData = {decision, krsNumber, emailSender, messageText, messageId};
        axiosPrivate.post(`/send-decision-about-invitation`, userData
        ).then(response => {
            if (response.status === 200) {
                setShowAcceptButton(false);
                setShowDenyButton(false);
                setShowDecisionInfo(true);
                return response.data;
            } else {
                throw new Error('Send request failed!');
            }
        }).catch((error) => console.log(error));
    }

    const sendRequestDecision = () => {
        const userData = {decision, krsNumber, emailSender, messageText, messageId};
        axiosPrivate.post(`/send-decision-about-membership`, userData
        ).then(response => {
            if (response.status === 200) {
                setShowAcceptButton(false);
                setShowDenyButton(false);
                setShowDecisionInfo(true);
                return response.data;
            } else {
                throw new Error('Send request failed!');
            }
        }).catch((error) => console.log(error));
    }

    return (
        <div className="decision-button">
            {showAcceptButton && <button className="btn btn-success" onClick={accept}>Zaakceptuj</button>}
            {showDenyButton && <button className="btn btn-danger" onClick={deny}>Odrzuć</button>}
            {showDecisionInfo && <DeleteNotificationButton messageId={messageId}/>}
        </div>
    )
}
export default AcceptDenyRequestButton
