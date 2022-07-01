const DeleteNotificationButton = ({messageId, loggedUserId}) => {

    const deleteNotification = (e) => {
        e.preventDefault();
        console.log(messageId)
        console.log(loggedUserId)
        const userData = {messageId, loggedUserId};
        fetch(`http://localhost:8080/delete-message-from-notification`, {
            method: "DELETE",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(userData)
        }).then(response => {
            if (response.status === 200) {
                let parentNode = document.getElementById(`message${messageId}`);
                console.log(parentNode);
                parentNode.remove();
                return response.blob();
            } else {
                throw new Error('Send request failed!');
            }
        }).catch(() => console.log("Error!"));
    }

    return (
        <button className="btn btn-success" onClick={deleteNotification}>Usuń powiadomienie</button>
    )
}

export default DeleteNotificationButton