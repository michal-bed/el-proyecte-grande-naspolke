import {useState} from "react";
import DeleteNotificationButton from "./DeleteNotificationButton";

const AcceptDenyRequestButton = ({ emailSender, krsNumber, messageId, loggedUserId }) => {
    let [decision, setDecision] = useState("");
    let [messageText, setMessageText] = useState("");
    const [showAcceptButton, setShowAcceptButton] = useState(true);
    const [showDenyButton, setShowDenyButton] = useState(true);
    const [showDecisionInfo, setShowDecisionInfo] = useState(false);

    const acceptRequest = () => {
        setDecision(decision = "accept");
        setMessageText(messageText = "Twoja prośba o członkostwo została zaakceptowana.")
        sendDecision();
    }

    const denyRequest = () => {
        setDecision(decision = "deny");
        setMessageText(messageText = "Twoja prośba o członkostwo została odrzucona.")
        sendDecision();
    }

    const sendDecision = () => {
        const userData = {decision, krsNumber, emailSender, messageText, loggedUserId, messageId};
        console.log(userData);
        fetch(`http://localhost:8080/send-decision-about-membership`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(userData)
        }).then(response => {
            if (response.status === 200) {
                setShowAcceptButton(false);
                setShowDenyButton(false);
                setShowDecisionInfo(true);
                return response.blob();
            } else {
                throw new Error('Send request failed!');
            }
        }).catch(() => console.log("Error!"));
    }

    return (
        <div className="decision-button">
            {showAcceptButton && <button className="btn btn-success" onClick={acceptRequest}>Zaakceptuj prośbę</button>}
            {showDenyButton && <button className="btn btn-danger" onClick={denyRequest}>Odrzuć prośbę</button>}
            {showDecisionInfo && <DeleteNotificationButton messageId={messageId} loggedUserId={loggedUserId}/>}
        </div>
    )
}

export default AcceptDenyRequestButton