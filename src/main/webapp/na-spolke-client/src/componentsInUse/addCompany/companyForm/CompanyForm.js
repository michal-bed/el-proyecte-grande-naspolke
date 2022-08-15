import React from "react";
import styles from "./CompanyForm.module.css";
import {useContext, useEffect, useState} from "react";
import BaseInfo from "./formComponents/baseInfo/BaseInfo";
import MembersCompanyBodies from "./formComponents/companyOrgans/MembersCompanyBodies";
import Partners from "./formComponents/companyOrgans/Partners";
import {ModalErrorFormComponent} from "./ModalErrorComponent";
import FullWidthTabs from "./FormNavbar";
import CompanyContextProvider, {CompanyContext} from "./CompanyContext";
import Typography from "@mui/material/Typography";
import {Box} from "@mui/material";

const CompanyForm = ({saveData})=>{
    const companyData = useContext(CompanyContext);
    const [modalError, setModalError] = useState(<div/>)

    function handleSaveDataFromPartnerForm(){
        if (Object.values(companyData.state.componentsErrors).includes(true) || Object.values(companyData.state.componentsErrors).includes("default")){
            setModalError( <ModalErrorFormComponent hide={closeErrorModal} saveCompanyDataModal={saveCompanyData}/>);
        } else {
            saveCompanyData()
        }
    }

    function closeErrorModal(){
        setModalError(<div/>)
    }

    function saveCompanyData(){
            setModalError( <div/>);
            saveData(companyData.state.company);
    }

    return<form className={styles["form"]}>
        <Box className={styles["form-container"]}>
            <Box className={styles["header"]}>
                <Typography style={{ textAlign: 'center', fontSize: 32 }}>Dane podstawowe</Typography>
            </Box>
            <Box className={styles["body"]}>
                <BaseInfo pageType="baseInfo" />
                {modalError}
            </Box>
                <FullWidthTabs company={companyData.state.company} saveCompanyData={handleSaveDataFromPartnerForm}/>
            <Box className={styles["footer"]}/>
            <Box className={styles["form-nav-bar"]}>
            </Box>
        </Box>
    </form>
}

export default CompanyForm;
