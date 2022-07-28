import useAxiosPrivate from "../../hooks/useAxiosPrivate";

const DeleteNotificationButton = ({messageId}) => {

    const axiosPrivate = useAxiosPrivate();

    const deleteNotification = (e) => {
        e.preventDefault();
        axiosPrivate.delete(`/delete-message-from-notification/${messageId}`
        ).then(response => {
            if (response.status === 200) {
                let parentNode = document.getElementById(`message${messageId}`);
                parentNode.remove();
                return response.data;
            } else {
                throw new Error('Send request failed!');
            }
        }).catch((error) => console.log(error));
    }

    return (
        <button className="btn btn-success" onClick={deleteNotification}>Usuń powiadomienie</button>
    )
}

export default DeleteNotificationButton
