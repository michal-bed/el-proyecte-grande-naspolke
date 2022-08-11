import {Menu, MenuItem, ProSidebar, SidebarContent, SidebarFooter, SidebarHeader, SubMenu} from "react-pro-sidebar";
import DraftsIcon from "@mui/icons-material/Drafts";
import {Link, matchPath, useLocation, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import DocumentScannerIcon from "@mui/icons-material/DocumentScanner";
import { Typography, Box } from "@material-ui/core";
import ApartmentIcon from '@mui/icons-material/Apartment';
import FaxIcon from '@mui/icons-material/Fax';
import KeyboardHideIcon from '@mui/icons-material/KeyboardHide';
import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import InsertInvitationIcon from '@mui/icons-material/InsertInvitation';
import ArticleIcon from '@mui/icons-material/Article';
import FingerprintIcon from '@mui/icons-material/Fingerprint';

export default function Sidebar () {

    const [windowWidth, setWindowWidth] = useState(undefined);
    const [windowWidthCheck, setWindowWidthCheck] = useState(false);

    useEffect(() => {
        function handleResize() {
            setWindowWidth(window.innerWidth);
            if (windowWidth <= 600) {
                setWindowWidthCheck(true);
            } else {
                setWindowWidthCheck(false);
            }
        }
        handleResize();
        window.addEventListener('resize', handleResize);
    })

    function PopulateNavbar () {
        const {companyId} = useParams();

        if (companyId != null) {
            return (
                <>
                    <MenuItem icon={<FaxIcon fontSize="large"/>}>
                        <h6>Twoja Spółka</h6> <Link to={"/userpanel/company/" + companyId}/>
                    </MenuItem>
                    <MenuItem icon={<PeopleAltIcon fontSize="large"/>}>
                        <h6>Ludzie Spółki</h6> <Link to={"/userpanel/company/" + companyId + "/members"}/>
                    </MenuItem>
                    <MenuItem icon={<InsertInvitationIcon fontSize="large"/>}>
                        <h6>Zaproś do Spółki</h6> <Link to={"/userpanel/company/" + companyId + "/invite"}/>
                    </MenuItem>
                    <MenuItem icon={<ArticleIcon fontSize="large"/>}>
                        <h6>Wygeneruj PDF</h6> <Link to={"/userpanel/company/" + companyId + "/generate"}/>
                    </MenuItem>
                    <MenuItem icon={<FingerprintIcon fontSize="large"/>}>
                        <h6>{companyId}</h6> <Link to={"/userpanel/company/" + companyId}/>
                    </MenuItem>
                </>
            );
        } else {
            return (
                <SidebarHeader>
                    Wybierz Spółkę
                </SidebarHeader>
            );
        }
    }

    return (
        <ProSidebar collapsed={windowWidthCheck}>

            <SidebarHeader>
                <Typography align="center" variant="h4">
                    naspolke
                </Typography>
            </SidebarHeader>

            <SidebarContent>
                <Menu iconShape="circle">

                    <MenuItem icon={<ApartmentIcon fontSize="large"/>}>
                        <h6>Wybór Spółki</h6> <Link to={"/userpanel"}/>
                    </MenuItem>

                    <MenuItem icon={<KeyboardHideIcon fontSize="large"/>}>
                        <h6>Dołącz do Spółki</h6> <Link to={"/userpanel/join"}/>
                    </MenuItem>

                    <MenuItem icon={<AddBusinessIcon fontSize="large"/>}>
                        <h6>Dodaj Spółkę</h6> <Link to={"/userpanel/add"}/>
                    </MenuItem>

                    <hr />
                    <PopulateNavbar/>


                </Menu>
            </SidebarContent>

            <SidebarFooter>
                naspolke.com
            </SidebarFooter>
        </ProSidebar>
    )
}
