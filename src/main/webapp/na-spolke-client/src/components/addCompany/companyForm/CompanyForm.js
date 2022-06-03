import styles from "./CompanyForm.module.css";
import {useState} from "react";
import BaseInfo from "./BaseInfo";
import Address from "./Adress";
import MembersCompanyBodies from "./MembersCompanyBodies";
import Partners from "./Partners";
import {Company} from "../../../classes/company/company";


const CompanyForm = (props)=>{
    const [page, setPage] = useState(0)
    const FormTitles = ["Dane Podstawowe", "Adres", "Zarząd", "Rada Nadzorcza", "Wspólnicy"]

    const company = new Company(props.companyData)
    // const dataFromKRS = props.companyData.data.odpis.dane;

    const PageDisplay = ()=> {
        switch (page){
            case 0: return <BaseInfo company={company}/>;
            case 1: return <Address adress={company.Address}/>;
            case 2: return <MembersCompanyBodies boardMembers={company.BoardMembers} />;
            case 3: return <MembersCompanyBodies boardMembers={company.BoardOfDirectors}/>;
            case 4: return <Partners partners={company.Partners}/>;
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
            <div className={styles["body"]}>{PageDisplay()}</div>
            <div className={styles["footer"]}></div>
            <div className={styles["form-nav-bar"]}>
                <button
                    disabled={page === 0}
                    onClick={() => {
                        setPage((currPage) => currPage - 1)
                    }}> Prev
                </button>
                <button
                    disabled={page === FormTitles.length - 1}
                    onClick={() => {
                        setPage((currPage) => currPage + 1)
                    }}> Next
                </button>
            </div>
        </div>
    </div>
}

export default CompanyForm;