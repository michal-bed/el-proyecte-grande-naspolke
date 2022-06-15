import { useState, useEffect } from 'react';
import { ProSidebar, Menu, MenuItem, SubMenu, SidebarFooter, SidebarHeader, SidebarContent } from 'react-pro-sidebar'
import 'react-pro-sidebar/dist/css/styles.css';
import SimpleNavbar from './components/navbar/SimpleNavbar';
import DocumentScannerIcon from '@mui/icons-material/DocumentScanner';
import DraftsIcon from '@mui/icons-material/Drafts';
import {Box} from "@mui/material";
import withStyles from '@material-ui/core/styles/withStyles';
import { Routes, Route, Link } from 'react-router-dom';

import MainCockpitPage from "./content/mainCockpitPage";
import TestPage from "./content/testPage";


const styles = theme => ({
    appBarSpacer: theme.mixins.toolbar
});

const style = withStyles(styles);

function Cockpit ({classes}) {

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



    return (
        <>
            <Box style={{display: "flex", flexDirection: "column", height: '100%', contain: 'paint'} }>

                <SimpleNavbar />

                <Box className={classes.appBarSpacer} style={{display: "flex", height: '100%'}}>
                    <ProSidebar collapsed={windowWidthCheck}>

                        <SidebarHeader>
                            naspolke
                        </SidebarHeader>

                        <SidebarContent>
                            <Menu iconShape="circle">

                                <MenuItem icon={<DraftsIcon />}>
                                    Kokpit <Link to={"/userpanel"} />
                                </MenuItem>

                                <SubMenu title="komponent 1" icon={<DocumentScannerIcon/>}>
                                    <MenuItem icon={<DraftsIcon/>}>
                                        zagnieżdżony komponent <Link to={"/userpanel/test"} />
                                    </MenuItem>
                                </SubMenu>

                            </Menu>
                        </SidebarContent>

                        <SidebarFooter>
                            krzysiek
                        </SidebarFooter>
                    </ProSidebar>


                    <div style={{overflow: 'auto', height: '100%', width: '100%'}}>

                        <Routes>
                            {/* jeśli route ma routy pod nim, trzeba dodać "/*" */}
                            <Route path="/" element={<MainCockpitPage />} />
                            <Route path="/test" element={<TestPage />} />
                        </Routes>

                    </div>
                </Box>
            </Box>
        </>
    )
}

export default style(Cockpit);