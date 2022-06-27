import { useState, useEffect } from 'react';
import { ProSidebar, Menu, MenuItem, SubMenu, SidebarFooter, SidebarHeader, SidebarContent } from 'react-pro-sidebar'
import 'react-pro-sidebar/dist/css/styles.css';
import SimpleNavbar from './components/navbar/SimpleNavbar';
import DocumentScannerIcon from '@mui/icons-material/DocumentScanner';
import DraftsIcon from '@mui/icons-material/Drafts';
import {Box} from "@mui/material";
import withStyles from '@material-ui/core/styles/withStyles';
import {Routes, Route, Link, matchPath, useLocation, useParams} from 'react-router-dom';

import MainCockpitPage from "./content/mainCockpitPage";
import TestPage from "./content/testPage";
import CompanyInfo from "./content/companyContent/CompanyInfo"
import Page from "./components/page/page";


function Cockpit () {
    return (
        <>
            <Box style={{display: "flex", flexDirection: "column", height: '100%', contain: 'paint'} }>
                <SimpleNavbar />
                <Page />
            </Box>
        </>
    )
}

export default Cockpit;