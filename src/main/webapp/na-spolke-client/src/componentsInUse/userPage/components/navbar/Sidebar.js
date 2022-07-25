import {Menu, MenuItem, ProSidebar, SidebarContent, SidebarFooter, SidebarHeader, SubMenu} from "react-pro-sidebar";
import DraftsIcon from "@mui/icons-material/Drafts";
import {Link, matchPath, useLocation, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import DocumentScannerIcon from "@mui/icons-material/DocumentScanner";
import { Typography, Box } from "@material-ui/core";




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
                    <MenuItem icon={<DraftsIcon/>}>
                        Twoja Spółka <Link to={"/userpanel/company/" + companyId}/>
                    </MenuItem>
                    <MenuItem icon={<DraftsIcon/>}>
                        Ludzie Spółki <Link to={"/userpanel/company/" + companyId + "/members"}/>
                    </MenuItem>
                    <MenuItem icon={<DraftsIcon/>}>
                        Zaproś do Spółki <Link to={"/userpanel/company/" + companyId + "/invite"}/>
                    </MenuItem>
                    <MenuItem icon={<DraftsIcon/>}>
                        {companyId} <Link to={"/userpanel/company/" + companyId}/>
                    </MenuItem>
                    <MenuItem icon={<DraftsIcon/>}>
                        {companyId} <Link to={"/userpanel/company/" + companyId}/>
                    </MenuItem>
                    <MenuItem icon={<DraftsIcon/>}>
                        {companyId} <Link to={"/userpanel/company/" + companyId}/>
                    </MenuItem>
                </>
            );
        } else {
            return (
                <MenuItem>
                    Wybierz Spółkę
                </MenuItem>
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

                    <MenuItem icon={<DraftsIcon/>}>
                        Wybór Spółki <Link to={"/userpanel"}/>
                    </MenuItem>

                    <MenuItem icon={<DraftsIcon/>}>
                        Dołącz do Spółki <Link to={"/userpanel/join"}/>
                    </MenuItem>

                    <MenuItem icon={<DraftsIcon/>}>
                        Dodaj Spółkę <Link to={"/userpanel/add"}/>
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