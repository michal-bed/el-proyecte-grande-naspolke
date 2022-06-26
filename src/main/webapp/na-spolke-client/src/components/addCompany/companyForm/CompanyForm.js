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
    // const [page, setPage] = useState(0)
    // const [baseInfo, setBaseInfo] = useState(company===null ? null:{
    //     companyName: company.companyName,
    //     krsNumber:company.krsNumber,
    //     nip:company.nip,
    //     regon:company.regon,
    //     shareCapital:company.shareCapital})
    // const [companyAddress, setCompanyAddress] = useState(company===null ? null: company.address)
    // const [boardMembers, setBoardMembers] = useState(company===null ? null: company.boardMembers)
    // const [boardOfDirectors, setBoardOfDirectors] = useState(company===null ? null: company.boardOfDirectors)
    // const [partnersList, setPartnersList] = useState(company===null ? null: company.partners)
    // const [componentError, setComponentErrors] = useState({})
    // const FormTitles = ["Dane Podstawowe", "Zarząd", "Rada Nadzorcza", "Wspólnicy"]

    // useEffect(()=>{
    //     setPartFormToDisplay(PageDisplay)
    // }, [page, componentError])


    // const changePage = (companyData, pageType, newPage, containError) => {
    //     setPartFormToDisplay(<div/>)
    //     let componentErrors = {...componentError}
    //     setPage((currPage) => currPage + newPage)
    //     switch (pageType){
    //         case "baseInfo": {
    //             setBaseInfo(companyData);
    //             componentErrors.baseInfo = containError;
    //             setComponentErrors(componentErrors);
    //             break
    //         }
    //         case "address": {
    //             setCompanyAddress(companyData);
    //             componentErrors.address = containError;
    //             setComponentErrors(componentErrors);
    //             break
    //         }
    //         case "board": {
    //             setBoardMembers(companyData);
    //             componentErrors.board = containError;
    //             setComponentErrors(componentErrors);
    //             break
    //         }
    //         case "directors": {
    //             setBoardOfDirectors(companyData);
    //             componentErrors.directors = containError;
    //             setComponentErrors(componentErrors);
    //             break
    //         }
    //         case "partners": {
    //             componentErrors.partners = containError;
    //             setComponentErrors(containError);
    //             setPartnersList(componentErrors);
    //             break
    //         }
    //     }
    // }
    // const [partFormToDisplay, setPartFormToDisplay] = useState(<BaseInfo pageType="baseInfo" changePage={changePage} baseInfo={baseInfo}
    //                                                                      address={companyAddress} prev={page === 0} next={page === FormTitles.length - 1}/>)
    //

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

    // const PageDisplay = ()=> {
    //     switch (page){
    //         case 0: return <BaseInfo pageType="baseInfo" changePage={changePage} baseInfo={baseInfo} address={companyAddress}
    //                                   prev={page === 0} next={page === FormTitles.length - 1}/>;
    //         // case 1: return <AddressForm address={companyAddress} changePage={changePage}
    //         //                             pageType={"address"} prev={page === 0} next={page === FormTitles.length - 1}/>;
    //         case 1: return <MembersCompanyBodies companyBodies={boardMembers} changePage={changePage}
    //                                              pageType={"board"} prev={page === 0} next={page === FormTitles.length - 1}/>;
    //         case 2: return <MembersCompanyBodies companyBodies={boardOfDirectors} changePage={changePage}
    //                                              pageType={"directors"} prev={page === 0} next={page === FormTitles.length - 1}/>;
    //         case 3: return <Partners partners={partnersList} changePage={changePage}
    //                                  bodyType={"partners"} prev={page === 0} next={page === FormTitles.length - 1} shareCapital={company.shareCapital}
    //                                  shareValue={company.shareValue} sharesCount={company.sharesCount} saveCompanyData={handleSaveDataFromPartnerForm}/>;
    //     }
    // }


    return<form className={styles["form"]}>
        <div className={styles["form-container"]}>
            <div className={styles["header"]}>
                <h1>Dane podstawowe</h1>
            </div>
            <div className={styles["body"]}>
                <BaseInfo pageType="baseInfo" />;
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