import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ProSidebar, Menu, MenuItem, SubMenu, SidebarFooter, SidebarHeader, SidebarContent } from 'react-pro-sidebar'
import 'react-pro-sidebar/dist/css/styles.css';
import SimpleNavbar from './components/navbar/SimpleNavbar';
import DocumentScannerIcon from '@mui/icons-material/DocumentScanner';
import DraftsIcon from '@mui/icons-material/Drafts';
import {Box} from "@mui/material";
import withStyles from '@material-ui/core/styles/withStyles';


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
                                <SubMenu title="komponent 1" icon={<DocumentScannerIcon/>}>
                                    <MenuItem icon={<DraftsIcon/>}>
                                        zagnieżdżony komponent
                                    </MenuItem>
                                </SubMenu>
                            </Menu>
                        </SidebarContent>

                        <SidebarFooter>
                            krzysiek
                        </SidebarFooter>
                    </ProSidebar>


                    <div style={{overflow: 'auto', height: '100%', width: '100%'}}>
                        <p>test</p>
                        <p>test</p>
                        <p>test</p>
                        <p>test</p>

                    </div>
                </Box>
            </Box>
        </>
    )
}

export default style(Cockpit);