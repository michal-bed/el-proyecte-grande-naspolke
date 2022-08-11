import React from "react";
import styles from "./CompanyForm.module.css";
import {useContext, useEffect, useState} from "react";
import BaseInfo from "./formComponents/baseInfo/BaseInfo";
import MembersCompanyBodies from "./formComponents/companyOrgans/MembersCompanyBodies";
import Partners from "./formComponents/companyOrgans/Partners";
import {ModalErrorFormComponent} from "./ModalErrorComponent";
import FullWidthTabs from "./FormNavbar";
import CompanyContextProvider, {CompanyContext} from "./CompanyContext";

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
        <div className={styles["form-container"]}>
            <div className={styles["header"]}>
                <h1 style={{ textAlign: 'center' }}>Dane podstawowe</h1>
            </div>
            <div className={styles["body"]}>
                <BaseInfo pageType="baseInfo" />
                {modalError}
            </div>
                <FullWidthTabs company={companyData.state.company} saveCompanyData={handleSaveDataFromPartnerForm}/>
            <div className={styles["footer"]}/>
            <div className={styles["form-nav-bar"]}>
            </div>
        </div>
    </form>
}

export default CompanyForm;
