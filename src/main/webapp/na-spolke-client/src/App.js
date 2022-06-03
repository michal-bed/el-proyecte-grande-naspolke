import './App.css';
import Registration from "./components/registration/Registration";
import AddCompany from "./components/addCompany/AddCompany";
import MainPage from "./components/mainPage/mainPage";
import Nav from 'react-bootstrap/Nav'
import {useState} from "react";

function App() {
    const [active, setActive] = useState("MainPage")

    const getMainPage = ()=> {
        setActive("MainPage")
    }
    const getRegistration = () => {
      setActive("Registration")
    }

    const addCompany = () => {
      setActive("addCompany")
    }

  return (
    <div className="App">
        <Nav variant="pills" defaultActiveKey="MainPage">
            <Nav.Item>
                <Nav.Link onClick={getMainPage} >Strona główna</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link onClick={getRegistration} >Rejestracja</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link onClick={addCompany}  >Dodaj spółkę</Nav.Link>
            </Nav.Item>
            <Nav.Item>
            </Nav.Item>
        </Nav>

        {active === "MainPage" && <MainPage title={"MainPage"}/>}
        {active === "Registration" && <Registration title={"Registration"}/>}
        {active === "addCompany" && <AddCompany title={"addCompany"}/>}

    </div>
  );
}

export default App;
