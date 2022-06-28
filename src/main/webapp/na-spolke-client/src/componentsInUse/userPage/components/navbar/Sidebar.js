import {Menu, MenuItem, ProSidebar, SidebarContent, SidebarFooter, SidebarHeader, SubMenu} from "react-pro-sidebar";
import DraftsIcon from "@mui/icons-material/Drafts";
import {Link, matchPath, useLocation, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import DocumentScannerIcon from "@mui/icons-material/DocumentScanner";



export default function Sidebar () {

    const [windowWidth, setWindowWidth] = useState(undefined);
    const [windowWidthCheck, setWindowWidthCheck] = useState(true);

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
        console.log(companyId + " fkoawekfo");

        if (match == null) {
            return (
                <SubMenu title="komponent 1" icon={<DocumentScannerIcon/>}>
                    <MenuItem icon={<DraftsIcon/>}>
                        {companyId} <Link to={"/userpanel/" + companyId}/>
                    </MenuItem>
                </SubMenu>
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

                    <hr />
                    <PopulateNavbar/>


                </Menu>
            </SidebarContent>

            <SidebarFooter>
                krzysiek
            </SidebarFooter>
        </ProSidebar>
    )
}