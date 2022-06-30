import AcceptDenyRequestButton from "./AcceptDenyRequestButton";
import DeleteNotificationButton from "./DeleteNotificationButton";

const Notification = ({ messages, loggedUserId }) => {

    return (
        <div className="messages">
            {messages.length === 0 && <h5>Nie masz żadnych nowych powiadomień</h5>}
            {messages.map((message, index) => (
                <div id={`message${message.messageId}`} key={index}>
                    <h5>Otrzymana od {message.emailSender}</h5>
                    <p>{message.messageText} {message.companyId}</p>
                    {message.hasRead === true && <DeleteNotificationButton messageId={message.messageId}
                        emailSender={message.emailSender} krsNumber={message.krsNumber} loggedUserId={loggedUserId}/>}
                    {(message.hasRead === false && message.membershipRequest === true) &&
                        <AcceptDenyRequestButton messageId={message.messageId}
                        emailSender={message.emailSender} krsNumber={message.krsNumber} loggedUserId={loggedUserId}/>}
                </div>))}
        </div>
    )
}

export default Notification