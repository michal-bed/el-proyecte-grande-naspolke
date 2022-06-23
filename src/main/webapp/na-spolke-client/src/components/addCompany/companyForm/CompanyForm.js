import styles from "./CompanyForm.module.css";
import {useEffect, useReducer, useState} from "react";
import BaseInfo from "./formComponents/baseInfo/BaseInfo";
import AddressForm from "./formComponents/address/AddressForm";
import MembersCompanyBodies from "./formComponents/companyOrgans/MembersCompanyBodies";
import Partners from "./formComponents/companyOrgans/Partners";



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
    const FormTitles = ["Dane Podstawowe", "Adres", "Zarząd", "Rada Nadzorcza", "Wspólnicy"]

    useEffect(()=>{
        setPartFormToDisplay(PageDisplay)
    }, [page])


    const changePage = (companyData, pageType, newPage) => {
        setPartFormToDisplay(<div/>)
        setPage((currPage) => currPage + newPage)
        switch (pageType){
            case "baseInfo": setBaseInfo(companyData); break
            case "address": setCompanyAddress(companyData); break
            case "board": setBoardMembers(companyData); break
            case "directors": setBoardOfDirectors(companyData); break
            case "partners": setPartnersList(companyData); break
        }
    }
    const [partFormToDisplay, setPartFormToDisplay] = useState(<BaseInfo pageType="baseInfo" changePage={changePage} baseInfo={baseInfo}
                                                                         prev={page === 0} next={page === FormTitles.length - 1}/>)

    function saveCompanyData(data){
        const companyToSave = {
            companyName: baseInfo.companyName,
            krsNumber: baseInfo.krsNumber,
            nip: baseInfo.nip,
            regon: baseInfo.regon,
            shareCapital: baseInfo.shareCapital,
            address: companyAddress,
            boardMembers: boardMembers,
            boardOfDirectors: boardOfDirectors,
            partners: data,
            manySharesAllowed: company.manySharesAllowed
        }
        saveData(companyToSave);
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
                                     shareValue={company.shareValue} sharesCount={company.sharesCount} saveCompanyData={saveCompanyData}/>;
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
            <div className={styles["body"]}>{partFormToDisplay}</div>
            <div className={styles["footer"]}></div>
            <div className={styles["form-nav-bar"]}>
            </div>
        </div>
    </div>
}

export default CompanyForm;