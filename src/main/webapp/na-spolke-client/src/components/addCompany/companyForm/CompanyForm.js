import styles from "./CompanyForm.module.css";
import {useEffect, useState} from "react";
import BaseInfo from "./formComponents/baseInfo/BaseInfo";
import MembersCompanyBodies from "./formComponents/companyOrgans/MembersCompanyBodies";
import Partners from "./formComponents/companyOrgans/Partners";
import {ModalErrorFormComponent} from "./ModalErrorComponent";
import FullWidthTabs from "./FormNavbar";
import CompanyContextProvider, {CompanyContext} from "./CompanyContext";

const CompanyForm = ({company, saveData})=>{
    const [page, setPage] = useState(0)
    const [baseInfo, setBaseInfo] = useState(company===null ? null:{
        companyName: company.companyName,
        krsNumber:company.krsNumber,
        nip:company.nip,
        regon:company.regon,
        shareCapital:company.shareCapital})
    const [companyAddress, setCompanyAddress] = useState(company===null ? null: company.address)
    const [boardMembers, setBoardMembers] = useState(company===null ? null: company.boardMembers)
    const [boardOfDirectors, setBoardOfDirectors] = useState(company===null ? null: company.boardOfDirectors)
    const [partnersList, setPartnersList] = useState(company===null ? null: company.partners)
    const [componentError, setComponentErrors] = useState({})
    const [modalError, setModalError] = useState(<div/>)
    const FormTitles = ["Dane Podstawowe", "Zarząd", "Rada Nadzorcza", "Wspólnicy"]

    useEffect(()=>{
        setPartFormToDisplay(PageDisplay)
    }, [page, componentError])


    const changePage = (companyData, pageType, newPage, containError) => {
        setPartFormToDisplay(<div/>)
        let componentErrors = {...componentError}
        setPage((currPage) => currPage + newPage)
        switch (pageType){
            case "baseInfo": {
                setBaseInfo(companyData);
                componentErrors.baseInfo = containError;
                setComponentErrors(componentErrors);
                break
            }
            case "address": {
                setCompanyAddress(companyData);
                componentErrors.address = containError;
                setComponentErrors(componentErrors);
                break
            }
            case "board": {
                setBoardMembers(companyData);
                componentErrors.board = containError;
                setComponentErrors(componentErrors);
                break
            }
            case "directors": {
                setBoardOfDirectors(companyData);
                componentErrors.directors = containError;
                setComponentErrors(componentErrors);
                break
            }
            case "partners": {
                componentErrors.partners = containError;
                setComponentErrors(containError);
                setPartnersList(componentErrors);
                break
            }
        }
    }
    const [partFormToDisplay, setPartFormToDisplay] = useState(<BaseInfo pageType="baseInfo" changePage={changePage} baseInfo={baseInfo}
                                                                         address={companyAddress} prev={page === 0} next={page === FormTitles.length - 1}/>)

    function checkIfComponentsIncludesErrors(){
        return Object.values(componentError).includes(true);
    }

    function handleSaveDataFromPartnerForm(data, hasError){
        let componentErrors = {...componentError};
        componentErrors.partners = hasError;
        setComponentErrors(componentErrors);
        setPartnersList(data);
        checkIfCompanyDataCanBeSaved()
    }

    function checkIfCompanyDataCanBeSaved(){
        if (!checkIfComponentsIncludesErrors()) {
        saveCompanyData()
        } else {
            setModalError(<ModalErrorFormComponent hide={closeErrorModal} saveData={saveCompanyData}/>)
        }
    }

    function closeErrorModal(){
        setModalError(<div/>)
    }

    function saveCompanyData(){
        const companyToSave = {
            companyName: baseInfo.companyName,
            krsNumber: baseInfo.krsNumber,
            nip: baseInfo.nip,
            regon: baseInfo.regon,
            shareCapital: baseInfo.shareCapital,
            address: companyAddress,
            boardMembers: boardMembers,
            boardOfDirectors: boardOfDirectors,
            partners: partnersList,
            manySharesAllowed: company.manySharesAllowed
        }
            saveData(companyToSave);
            setModalError(<div/>);
    }

    const PageDisplay = ()=> {
        switch (page){
            case 0: return <BaseInfo pageType="baseInfo" changePage={changePage} baseInfo={baseInfo} address={companyAddress}
                                      prev={page === 0} next={page === FormTitles.length - 1}/>;
            // case 1: return <AddressForm address={companyAddress} changePage={changePage}
            //                             pageType={"address"} prev={page === 0} next={page === FormTitles.length - 1}/>;
            case 1: return <MembersCompanyBodies companyBodies={boardMembers} changePage={changePage}
                                                 pageType={"board"} prev={page === 0} next={page === FormTitles.length - 1}/>;
            case 2: return <MembersCompanyBodies companyBodies={boardOfDirectors} changePage={changePage}
                                                 pageType={"directors"} prev={page === 0} next={page === FormTitles.length - 1}/>;
            case 3: return <Partners partners={partnersList} changePage={changePage}
                                     bodyType={"partners"} prev={page === 0} next={page === FormTitles.length - 1} shareCapital={company.shareCapital}
                                     shareValue={company.shareValue} sharesCount={company.sharesCount} saveCompanyData={handleSaveDataFromPartnerForm}/>;
        }
    }


    return<form className={styles["form"]}>
        <div className={styles["form-container"]}>
        <div className={styles["progressbar"]}>
            <div style={{width: page === 0 ? "1%" : page === 1 ? "33%" : page === 2 ? "66%" : "100%"}}/>
        </div>
            <div className={styles["header"]}>
                <h1>{FormTitles[page]}</h1>
            </div>
            <CompanyContextProvider company={company}>
            <div className={styles["body"]}>
                <BaseInfo pageType="baseInfo" changePage={changePage} baseInfo={baseInfo} address={companyAddress}
                          prev={page === 0} next={page === FormTitles.length - 1}/>;
                {modalError}</div>
                <FullWidthTabs company={company} saveCompanyData={handleSaveDataFromPartnerForm}/>
            </CompanyContextProvider>
            <div className={styles["footer"]}/>
            <div className={styles["form-nav-bar"]}>
            </div>
        </div>
    </form>
}

export default CompanyForm;