import './App.css';

import Layout from './componentsInUse/Layout';
import Logout from './componentsInUse/Logout';
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
import RequestForMembership from "./componentsInUse/requestToCompany/RequestForMembership";
import RequireAuth from "./componentsInUse/login/RequireAuth";
import Unauthorized from "./componentsInUse/login/Unaurthorized";
import PersistLogin from "./componentsInUse/login/PersistLogin";


function App() {
    return (<ThemeProvider theme={theme}>
        <CssBaseline/>
        <Routes>
            <Route path="/" element={<Layout/>}>
                {/* public routes */}
                <Route path="/" element={<Presentation site="index"/> }/>
                <Route path="faq" element={<Presentation site="faq"/>}/>
                <Route path="login" element={<Login/>}/>
                <Route path="logout" element={<Logout/>}/>
                <Route path="registration" element={<Registration/>}/>
                <Route path="unauthorized" element={<Unauthorized />} />

                {/* we want to protect these routes */}
                <Route element={<PersistLogin/>}>
                    <Route element={<RequireAuth allowedRoles={["ROLE_USER"]}/>}>
                        <Route path="add-member" element={<AddMember/>}/>
                        <Route path="delete-member" element={<DeleteMember/>}/>
                        <Route path="change-role" element={<ChangeRole/>}/>
                        <Route path="add-company" element={<AddCompany/>}/>
                        <Route path="userpanel/*" element={<Cockpit/>}/>
                    </Route>
                </Route>
            </Route>
        </Routes>
    </ThemeProvider>)
}

export default App;
