import styles from "./CompanyForm.module.css";
import {useEffect, useReducer, useState} from "react";
import BaseInfo from "./formComponents/BaseInfo";
import Address from "./formComponents/Address";
import MembersCompanyBodies from "./formComponents/MembersCompanyBodies";
import Partners from "./formComponents/Partners";
import {Company} from "../../../classes/company/Company";


const CompanyForm = ({company})=>{
    const [page, setPage] = useState(0)
    const FormTitles = ["Dane Podstawowe", "Adres", "Zarząd", "Rada Nadzorcza", "Wspólnicy"]


    useEffect(()=>{
        setPartFormToDisplay(PageDisplay)
    }, [page])

    const changePage = (memberBody, pageType, newPage) => {
        setPartFormToDisplay(<div/>)
        setPage((currPage) => currPage + newPage)
        //
        // if (pageType==="board"){
        //     company.BoardMembers = memberBody
        // } else if  (pageType==="directors"){
        //     company.BoardOfDirectors = memberBody
        // }

    }
    const [partFormToDisplay, setPartFormToDisplay] = useState(<BaseInfo pageType="baseInfo" changePage={changePage} company={company===null ? null: company}
                                                                         prev={page === 0} next={page === FormTitles.length - 1}/>)

    const PageDisplay = ()=> {
        switch (page){
            case 0: return <BaseInfo pageType="baseInfo" changePage={changePage} company={company===null ? null: company}
                                      prev={page === 0} next={page === FormTitles.length - 1}/>;
            case 1: return <Address address={company===null ? null: company.Address} changePage={changePage}
                                    pageType={"address"} prev={page === 0} next={page === FormTitles.length - 1}/>;
            case 2: return <MembersCompanyBodies companyBodies={company===null ? null: company.BoardMembers} changePage={changePage}
                                                 bodyType={"board"} prev={page === 0} next={page === FormTitles.length - 1}/>;
            case 3: return <MembersCompanyBodies companyBodies={company===null ? null: company.BoardOfDirectors} changePage={changePage}
                                                 bodyType={"directors"} prev={page === 0} next={page === FormTitles.length - 1}/>;
            case 4: return <Partners partners={company===null ? null: company.Partners} changePage={changePage}
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