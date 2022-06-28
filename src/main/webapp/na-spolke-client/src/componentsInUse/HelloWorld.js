import {Link} from "react-router-dom";

export default function HelloWorld() {
    return (
            <div>
                <p>
                    {"Witaj na głównej stronie. Możesz się zalogować "}
                    <Link to="/login">tutaj</Link>
                </p>
                <p>
                    {"Jeśli nie masz jeszcze konta, możesz zarejestrować się "}
                    <Link to="/register">tutaj</Link>
                </p>
            </div>);
}