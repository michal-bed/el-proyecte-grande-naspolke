import styles from "./CompanyForm.module.css";
import {useEffect, useState} from "react";
import BaseInfo from "./formComponents/baseInfo/BaseInfo";
import AddressForm from "./formComponents/address/AddressForm";
import MembersCompanyBodies from "./formComponents/companyOrgans/MembersCompanyBodies";
import Partners from "./formComponents/companyOrgans/Partners";
import {ModalErrorFormComponent} from "./ModalErrorComponent";



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
    const FormTitles = ["Dane Podstawowe", "Adres", "Zarząd", "Rada Nadzorcza", "Wspólnicy"]

    useEffect(()=>{
        setPartFormToDisplay(PageDisplay)
    }, [page])


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
                componentError.address = containError;
                setComponentErrors(componentErrors);
                break
            }
            case "board": {
                setBoardMembers(companyData);
                componentError.board = containError;
                setComponentErrors(componentErrors);
                break
            }
            case "directors": {
                setBoardOfDirectors(companyData);
                componentError.directors = containError;
                setComponentErrors(componentErrors);
                break
            }
            case "partners": {
                componentError.partners = containError;
                setComponentErrors(containError);
                setPartnersList(componentErrors);
                break
            }
        }
    }
    const [partFormToDisplay, setPartFormToDisplay] = useState(<BaseInfo pageType="baseInfo" changePage={changePage} baseInfo={baseInfo}
                                                                         prev={page === 0} next={page === FormTitles.length - 1}/>)

    function checkIfComponentsIncludesErrors(){
        return Object.values(componentError).includes(true);
    }

    function checkIfCompanyDataCanBeSaved(data){
        setPartnersList(data);
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
            case 0: return <BaseInfo pageType="baseInfo" changePage={changePage} baseInfo={baseInfo}
                                      prev={page === 0} next={page === FormTitles.length - 1}/>;
            case 1: return <AddressForm address={companyAddress} changePage={changePage}
                                        pageType={"address"} prev={page === 0} next={page === FormTitles.length - 1}/>;
            case 2: return <MembersCompanyBodies companyBodies={boardMembers} changePage={changePage}
                                                 pageType={"board"} prev={page === 0} next={page === FormTitles.length - 1}/>;
            case 3: return <MembersCompanyBodies companyBodies={boardOfDirectors} changePage={changePage}
                                                 pageType={"directors"} prev={page === 0} next={page === FormTitles.length - 1}/>;
            case 4: return <Partners partners={partnersList} changePage={changePage}
                                     bodyType={"partners"} prev={page === 0} next={page === FormTitles.length - 1} shareCapital={company.shareCapital}
                                     shareValue={company.shareValue} sharesCount={company.sharesCount} saveCompanyData={checkIfCompanyDataCanBeSaved}/>;
        }
    }


    return<div className={styles["form"]}>
        <div className={styles["form-container"]}>
        <div className={styles["progressbar"]}>
            <div style={{width: page === 0 ? "20%" : page === 1 ? "40%" : page === 2 ? "60%" : page === 3 ? "80%" : "100%"}}/>
        </div>
            <div className={styles["header"]}>
                <h1>{FormTitles[page]}</h1>
            </div>
            <div className={styles["body"]}>{partFormToDisplay} {modalError}</div>
            <div className={styles["footer"]}></div>
            <div className={styles["form-nav-bar"]}>
            </div>
        </div>
    </div>
}

export default CompanyForm;