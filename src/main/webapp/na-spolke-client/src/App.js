import './App.css';

import SignInBasic from "./componentsInUse/login/index";
import RegistrationBasic from "./componentsInUse/registration/index"
import Layout from './componentsInUse/Layout';
import Logout from './componentsInUse/Logout';
import Presentation from "./componentsInUse/indexComponents/indexPageWithKit"
import {Route, Routes} from "react-router-dom";
import {CssBaseline, ThemeProvider} from "@mui/material";
import theme from "./assets/theme";
import AddMember from "./componentsInUse/ownerPanel/AddMember";
import DeleteMember from "./componentsInUse/ownerPanel/DeleteMember";
import ChangeRole from "./componentsInUse/ownerPanel/ChangeRole";
import AddCompany from "./componentsInUse/addCompany/AddCompany";
import Cockpit from './componentsInUse/userPage/cockpit';
import RequireAuth from "./componentsInUse/login/RequireAuth";
import Unauthorized from "./componentsInUse/login/Unaurthorized";
import PersistLogin from "./componentsInUse/login/PersistLogin";
import FinancialStatement from "./componentsInUse/generateDocuments/financialStatement/FinancialStatement";

import VerifyRegistration from "./componentsInUse/registration/VerifyRegistration";
import PdfView from "./componentsInUse/generateDocuments/displayPdfDocument/PdfView";

function App() {
    return (<ThemeProvider theme={theme}>
        <CssBaseline/>
        <Routes>
            <Route path="/" element={<Layout/>}>

                {/* public routes */}
                <Route path="faq" element={<Presentation site="faq"/>}/>
                <Route path="statute" element={<Presentation site="statute"/>}/>
                <Route path="login" element={<SignInBasic />}/>
                <Route path="logout" element={<Logout/>}/>
                <Route path="register" element={<RegistrationBasic/>}/>
                <Route path="verify/*" element={<VerifyRegistration/>}/>
                <Route path="pdf" element={<PdfView/>}/>
                <Route path="unauthorized" element={<Unauthorized />} />

                {/* we want to protect these routes */}
                <Route element={<PersistLogin/>}>
                    {/* public routes */}
                    <Route path="/" element={<Presentation site="index"/> }/>
                    {/* restricted access routes */}
                    <Route element={<RequireAuth allowedRoles={["ROLE_USER"]}/>}>
                        <Route path="generate/*" element={<FinancialStatement />} />
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
