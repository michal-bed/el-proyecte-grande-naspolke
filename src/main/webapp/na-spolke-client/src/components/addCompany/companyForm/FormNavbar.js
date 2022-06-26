import * as React from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import MembersCompanyBodies from "./formComponents/companyOrgans/MembersCompanyBodies";
import Partners from "./formComponents/companyOrgans/Partners";
import {useContext, useState} from "react";
import {CompanyContext} from "./CompanyContext";
import {Button} from "@mui/material";

function FormNavbar(props) {
    const { company, value, index, ...other } = props;
    const companyData = useContext(CompanyContext)

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    {index===0 && <MembersCompanyBodies companyBodies={company.boardMembers} changePage={null}pageType={"board"}/>}
                    {index===1 && <MembersCompanyBodies companyBodies={company.boardOfDirectors} changePage={null} pageType={"directors"}/>}
                    {index===2 && <Partners partners={company.partners} changePage={null} pageType={"partners"} shareCapital={company.shareCapital}
                                            shareValue={company.shareValue} sharesCount={company.sharesCount}/>}
                </Box>
            )}
        </div>
    );
}

FormNavbar.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `full-width-tab-${index}`,
        'aria-controls': `full-width-tabpanel-${index}`,
    };
}

export default function FullWidthTabs(props) {
    const FormTitles = ["Zarząd", "Rada Nadzorcza", "Wspólnicy"]
    const theme = useTheme();
    const [value, setValue] = React.useState(0);
    const { company, saveCompanyData } = props;
    const [companyOrgans, setCompanyOrgans] = useState(company)
    const [boardMembers, setBoardMembers] = useState(company===null ? null: company.boardMembers)
    const [boardOfDirectors, setBoardOfDirectors] = useState(company===null ? null: company.boardOfDirectors)
    const [partnersList, setPartnersList] = useState(company===null ? null: company.partners)
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleChangeIndex = (index) => {
        setValue(index);
    };

    function saveCompany(){
        props.saveCompanyData()
    }

    return (
        <Box sx={{ bgcolor: 'background.paper' }}>
            <AppBar position="static">
                <Tabs
                    value={value}
                    onChange={handleChange}
                    indicatorColor="secondary"
                    textColor="inherit"
                    variant="fullWidth"
                    aria-label="full width tabs example"
                >
                    <Tab label={FormTitles[0]} {...a11yProps(0)} />
                    <Tab label={FormTitles[1]} {...a11yProps(1)} />
                    <Tab label={FormTitles[2]} {...a11yProps(2)} />
                </Tabs>
            </AppBar>
            <SwipeableViews
                axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                index={value}
                onChangeIndex={handleChangeIndex}
            >
                <FormNavbar value={value} company={props.company} index={0} dir={theme.direction}/>
                <FormNavbar value={value} company={props.company} index={1} dir={theme.direction}/>
                <FormNavbar value={value} company={props.company} index={2} dir={theme.direction}/>
            </SwipeableViews>
            <Button onClick={saveCompany}>Zapisz</Button>
        </Box>
    );
}