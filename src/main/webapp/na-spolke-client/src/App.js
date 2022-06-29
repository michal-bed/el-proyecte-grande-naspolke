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


function App() {

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
