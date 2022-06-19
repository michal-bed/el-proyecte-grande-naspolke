import styles from "./CompanyForm.module.css";
import {useEffect, useReducer, useState} from "react";
import BaseInfo from "./formComponents/BaseInfo";
import AddressForm from "./formComponents/AddressForm";
import MembersCompanyBodies from "./formComponents/MembersCompanyBodies";
import Partners from "./formComponents/Partners";
import {Company} from "../../../classes/company/Company";


const CompanyForm = ({company})=>{
    const [page, setPage] = useState(0)
    const [baseInfo, setBaseInfo] = useState(company===null ? null:{
        name: company.name,
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
        console.log(companyData.streetName + companyAddress.streetName)
        switch (pageType){
            case "baseInfo": setBaseInfo(companyData); break
            case "address": setCompanyAddress(companyData); break
            case "board": setBoardMembers(companyData); break
            case "directors": setBoardOfDirectors(companyData); break
            case "partners": setPartnersList(companyData); break

        }
        console.log(companyData.streetName +" d" +companyAddress.streetName)

        //
        // if (pageType==="board"){
        //     company.BoardMembers = companyData
        // } else if  (pageType==="directors"){
        //     company.BoardOfDirectors = companyData
        // }

    }
    const [partFormToDisplay, setPartFormToDisplay] = useState(<BaseInfo pageType="baseInfo" changePage={changePage} baseInfo={baseInfo}
                                                                         prev={page === 0} next={page === FormTitles.length - 1}/>)

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
                                     bodyType={"partners"} prev={page === 0} next={page === FormTitles.length - 1}/>;
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
                {/*<button*/}
                {/*    disabled={page === 0}*/}
                {/*    onClick={() => {*/}
                {/*        setPage((currPage) => currPage - 1)*/}
                {/*    }}> Prev*/}
                {/*</button>*/}
                {/*<button*/}
                {/*    disabled={page === FormTitles.length - 1}*/}
                {/*    onClick={() => {*/}
                {/*        setPage((currPage) => currPage + 1)*/}
                {/*    }}> Next*/}
                {/*</button>*/}
            </div>
        </div>
    </div>
}

export default CompanyForm;