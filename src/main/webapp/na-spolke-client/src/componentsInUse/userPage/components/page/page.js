import {Menu, MenuItem, ProSidebar, SidebarContent, SidebarFooter, SidebarHeader, SubMenu} from "react-pro-sidebar";
import DraftsIcon from "@mui/icons-material/Drafts";
import {Link, matchPath, Route, Routes, useLocation, useParams} from "react-router-dom";
import MainCockpitPage from "../../content/mainCockpitPage";
import TestPage from "../../content/testPage";
import CompanyInfo from "../../content/companyContent/CompanyInfo";
import {Box} from "@mui/material";
import {useEffect, useState} from "react";
import DocumentScannerIcon from "@mui/icons-material/DocumentScanner";
import withStyles from "@material-ui/core/styles/withStyles";
import Subpage from "./Subpage";




function Page ({classes}) {
    return (
        <Box style={{display: "flex", flexDirection: "column", height: '100%', width: '100%', contain: 'paint'} }>

            <Routes>
                {/* jeśli route ma routy pod nim, trzeba dodać "/*"  */}
                <Route path="/" element={<Subpage component={<MainCockpitPage/>}/>}/>
                <Route path="/test" element={<Subpage component={<TestPage/>}/>}/>
                <Route path="/:companyId/*">
                    <Route path="" element={<Subpage component={<CompanyInfo />}/>}/>
                </Route>
            </Routes>
        </Box>
    )
}

export default Page;