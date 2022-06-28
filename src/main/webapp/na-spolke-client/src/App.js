import './App.css';

import Layout from './componentsInUse/Layout';
import Login from './componentsInUse/login/Login';
import Presentation from "./componentsInUse/pageWithKit"
import {Route, Routes} from "react-router-dom";
import Registration from "./componentsInUse/registration/Registration";
import {CssBaseline, ThemeProvider} from "@mui/material";
import theme from "./assets/theme";
import AddMember from "./componentsInUse/ownerPanel/AddMember";
import DeleteMember from "./componentsInUse/ownerPanel/DeleteMember";
import ChangeRole from "./componentsInUse/ownerPanel/ChangeRole";
import AddCompany from "./componentsInUse/addCompany/AddCompany";
import Cockpit from './componentsInUse/userPage/cockpit';

// import Registration from "./components/registration/Registration";
// import AddCompany from "./components/addCompany/AddCompany";
// import MainPage from "./components/mainPage/mainPage";
// import Nav from 'react-bootstrap/Nav'
// import {useState} from "react";

// import { Routes, Route, Link } from 'react-router-dom';

function App() {
  //   const [active, setActive] = useState("MainPage")
  //
  //   const getMainPage = ()=> {
  //       setActive("MainPage")
  //   }
  //   const getRegistration = () => {
  //     setActive("Registration")
  //   }
  //
  //   const addCompany = () => {
  //     setActive("addCompany")
  //   }
  //
  // return (
  //   <div className="App">
  //       {/*<Nav variant="pills" defaultActiveKey="MainPage">*/}
  //       {/*    <Nav.Item>*/}
  //       {/*        <Nav.Link onClick={getMainPage} >Strona główna</Nav.Link>*/}
  //       {/*    </Nav.Item>*/}
  //       {/*    <Nav.Item>*/}
  //       {/*        <Nav.Link onClick={getRegistration} >Rejestracja</Nav.Link>*/}
  //       {/*    </Nav.Item>*/}
  //       {/*    <Nav.Item>*/}
  //       {/*        <Nav.Link onClick={addCompany}  >Dodaj spółkę</Nav.Link>*/}
  //       {/*    </Nav.Item>*/}
  //       {/*    <Nav.Item>*/}
  //       {/*    </Nav.Item>*/}
  //       {/*</Nav>*/}
  //
  //       {/*{active === "MainPage" && <MainPage title={"MainPage"}/>}*/}
  //       {/*{active === "Registration" && <Registration title={"Registration"}/>}*/}
  //       {/*{active === "addCompany" && <AddCompany title={"addCompany"}/>}*/}
  //       <Routes>
  //           <Route path="/" element={<MainPage title={"MainPage"} />} />
  //
  //       </Routes>
  //
  //   </div>
  // );
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <Routes>
                <Route path="/" element={<Layout/>}>
                    {/* public routes */}
                    <Route path="/" element={<Presentation/>}/>
                    <Route path="login" element={<Login/>}/>
                    <Route path="register" element={<Registration/>}/>
                    <Route path="add-member" element={<AddMember/>}/>
                    <Route path="delete-member" element={<DeleteMember/>}/>
                    <Route path="change-role" element={<ChangeRole/>}/>
                    <Route path="add-company" element={<AddCompany/>}/>
                    <Route path="userpanel/*" element={<Cockpit />} />
                </Route>
            </Routes>
        </ThemeProvider>);
}

export default App;
