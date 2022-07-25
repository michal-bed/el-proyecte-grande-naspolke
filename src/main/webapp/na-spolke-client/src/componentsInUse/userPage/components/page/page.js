import {Menu, MenuItem, ProSidebar, SidebarContent, SidebarFooter, SidebarHeader, SubMenu} from "react-pro-sidebar";
import DraftsIcon from "@mui/icons-material/Drafts";
import {Link, matchPath, Route, Routes, useLocation, useParams} from "react-router-dom";
import MainCockpitPage from "../../content/mainCockpitPage";
import TestPage from "../../content/testPage";
import CompanyInfo from "../../content/companyContent/CompanyInfo";
import CompanyMembers from '../../content/companyContent/CompanyMembers';
import {Box} from "@mui/material";
import {useEffect, useState} from "react";
import DocumentScannerIcon from "@mui/icons-material/DocumentScanner";
import withStyles from "@material-ui/core/styles/withStyles";
import Subpage from "./Subpage";
import useAuth from "../../../../hooks/useAuth";
import CompanyInvitePage from "../../content/companyContent/CompanyInvitePage";
import InviteSuccess from "../../content/companyContent/inviteResult/InviteSuccess";
import InviteFail from "../../content/companyContent/inviteResult/InviteFail";
import GenerateDocument from "../../content/companyContent/generateDocument/GenerateDocument";





function Page ({classes}) {
    const { auth } = useAuth();
    console.log(auth.accessToken);
    return (
        <Box style={{display: "flex", flexDirection: "column", height: '100%', width: '100%', contain: 'paint'} }>

            <Routes>
                {/* jeśli route ma routy pod nim, trzeba dodać "/*"  */}
                <Route path="/" element={<Subpage component={<MainCockpitPage/>}/>}/>
                <Route path="/join" element={<Subpage component={<TestPage/>}/>}/>
                <Route path="/add" element={<Subpage component={<TestPage/>}/>}/>
                <Route path="/company/:companyId/*">
                    <Route path="" element={<Subpage component={<CompanyInfo />}/>}/>
                    <Route path="members" element={<Subpage component={<CompanyMembers/>}/>}/>
                    <Route path="invite/*">
                        <Route path="" element={<Subpage component={<CompanyInvitePage/>}/>}/>
                        <Route path="success" element={<Subpage component={<InviteSuccess/>}/>}/>
                        <Route path="fail" element={<Subpage component={<InviteFail/>}/>}/>
                    </Route>
                    <Route path="generate" element={<Subpage component={<GenerateDocument/>}/>}/>
                </Route>
            </Routes>
        </Box>
    )
}

export default Page;