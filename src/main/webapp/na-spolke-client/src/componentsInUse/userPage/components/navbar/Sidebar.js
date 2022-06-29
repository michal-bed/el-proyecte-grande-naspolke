import {Menu, MenuItem, ProSidebar, SidebarContent, SidebarFooter, SidebarHeader, SubMenu} from "react-pro-sidebar";
import DraftsIcon from "@mui/icons-material/Drafts";
import {Link, matchPath, useLocation, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import DocumentScannerIcon from "@mui/icons-material/DocumentScanner";




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
        const location = useLocation();
        const match = matchPath(location.pathname, "/userpanel")

        const {companyId} = useParams();

        if (match == null) {
            return (
                <>
                    <MenuItem icon={<DraftsIcon/>}>
                        Twoja Spółka <Link to={"/userpanel/" + companyId}/>
                    </MenuItem>
                    <MenuItem icon={<DraftsIcon/>}>
                        Ludzie Spółki <Link to={"/userpanel/" + companyId + "/members"}/>
                    </MenuItem>
                    <MenuItem icon={<DraftsIcon/>}>
                        {companyId} <Link to={"/userpanel/" + companyId}/>
                    </MenuItem>
                    <MenuItem icon={<DraftsIcon/>}>
                        {companyId} <Link to={"/userpanel/" + companyId}/>
                    </MenuItem>
                    <MenuItem icon={<DraftsIcon/>}>
                        {companyId} <Link to={"/userpanel/" + companyId}/>
                    </MenuItem>
                    <MenuItem icon={<DraftsIcon/>}>
                        {companyId} <Link to={"/userpanel/" + companyId}/>
                    </MenuItem>
                </>
            );
        } else {
            return null;
        }
    }

    return (
        <ProSidebar collapsed={windowWidthCheck}>

            <SidebarHeader>
                naspolke
            </SidebarHeader>

            <SidebarContent>
                <Menu iconShape="circle">

                    <MenuItem icon={<DraftsIcon/>}>
                        Wybór Spółki <Link to={"/userpanel"}/>
                    </MenuItem>
                    <MenuItem icon={<DraftsIcon/>}>
                        Dołącz do Spółki <Link to={"/userpanel/join"}/>
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