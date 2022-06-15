import { useState, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { ProSidebar, Menu, MenuItem, SubMenu, SidebarFooter, SidebarHeader, SidebarContent } from 'react-pro-sidebar'
import 'react-pro-sidebar/dist/css/styles.css';
import SimpleNavbar from './components/navbar/SimpleNavbar';
import DocumentScannerIcon from '@mui/icons-material/DocumentScanner';
import DraftsIcon from '@mui/icons-material/Drafts';
import { flexbox } from '@mui/system';
import {Box} from "@mui/material";
import withStyles from '@material-ui/core/styles/withStyles';


const styles = theme => ({
    appBarSpacer: theme.mixins.toolbar
});

const style = withStyles(styles);

function Cockpit ({classes}) {
    return (
        <>
            <Box style={{display: "flex", flexDirection: "column", height: '100%', contain: 'paint'} }>
                <SimpleNavbar />
                <Box className={classes.appBarSpacer} style={{display: "flex", height: '100%'}}>
                    <div style={{}}>
                        <ProSidebar breakPoint='md' collapsedWidth="80px">
                            <SidebarHeader>
                                naspolke.com
                            </SidebarHeader>
                            <SidebarContent>
                                <Menu iconShape="circle">
                                    <SubMenu title="komponent 1" icon={<DocumentScannerIcon />}>
                                        <MenuItem icon={<DraftsIcon />}>
                                            zagnieżdżony komponent
                                        </MenuItem>
                                    </SubMenu>
                                </Menu>
                            </SidebarContent>
                            <SidebarFooter >
                                krzysiek
                            </SidebarFooter>
                        </ProSidebar>
                    </div>

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