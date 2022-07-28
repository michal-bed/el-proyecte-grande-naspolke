import AcceptDenyRequestButton from "./AcceptDenyRequestButton";
import DeleteNotificationButton from "./DeleteNotificationButton";

const Notification = ({ messages }) => {

    return (
        <div className="messages">
            {messages.length === 0 && <h5>Nie masz żadnych nowych powiadomień</h5>}
            {messages.map((message, index) => (
                <div id={`message${message.messageId}`} key={index}>
                    <h5>Otrzymana od {message.emailSender}</h5>
                    <p>{message.messageText} {message.companyId}</p>
                    {message.hasRead === true && <DeleteNotificationButton messageId={message.messageId}/>}
                    {(message.hasRead === false && message.membershipRequest === false && message.membershipInvitation === false) &&
                        <DeleteNotificationButton messageId={message.messageId}/>}
                    {(message.hasRead === false && message.membershipRequest === true) &&
                        <AcceptDenyRequestButton message={message}/>}
                    {(message.hasRead === false && message.membershipInvitation === true) &&
                        <AcceptDenyRequestButton message={message}/>}
                </div>))}
        </div>
    )
}

export default Notification
