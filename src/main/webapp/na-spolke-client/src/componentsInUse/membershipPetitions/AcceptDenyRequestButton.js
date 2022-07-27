import {useState} from "react";
import DeleteNotificationButton from "./DeleteNotificationButton";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

const AcceptDenyRequestButton = ({ emailSender, krsNumber, messageId }) => {

    const axiosPrivate = useAxiosPrivate();

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
            {showAcceptButton && <button className="btn btn-success" onClick={acceptRequest}>Zaakceptuj prośbę</button>}
            {showDenyButton && <button className="btn btn-danger" onClick={denyRequest}>Odrzuć prośbę</button>}
            {showDecisionInfo && <DeleteNotificationButton messageId={messageId}/>}
        </div>
    )
}
export default AcceptDenyRequestButton
