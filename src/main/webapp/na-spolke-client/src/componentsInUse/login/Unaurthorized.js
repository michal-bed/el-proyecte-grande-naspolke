
import { useNavigate } from "react-router-dom"

const Unauthorized = () => {
    const navigate = useNavigate();

    const goBack = () => navigate(-1);

    return (
        <section>
            <h1>Brak dostępu</h1>
            <br />
            <p>Brak dostępu do żądanej strony.</p>
            <div className="flexGrow">
                <button onClick={goBack}>Wróć</button>
            </div>
        </section>
    )
}

export default Unauthorized