import styles from "./CompanyForm.module.css";
import {useState} from "react";
import BaseInfo from "./BaseInfo";
import Adress from "./Adress";
import BoardMembers from "./BoardMembers";
import BoardOfDirectors from "./BoardOfDirectors";
import Partners from "./Partners";


const CompanyForm = (props)=>{
    const [page, setPage] = useState(0)

    const FormTitles = ["Dane Podstawowe", "Adres", "Zarząd", "Rada Nadzorcza", "Wspólnicy"]

    const PageDisplay = ()=> {
        switch (page){
            case 0: return <BaseInfo baseInfo={props.companyData.data.odpis}/>;
            case 1: return <Adress adress={props.companyData.data.odpis.dane.dzial1.siedzibaIAdres.adres}/>;
            case 2: return <BoardMembers boardMembers={props.companyData.data.odpis.dane.dzial2.reprezentacja.sklad} />;
            case 3: return <BoardMembers boardMembers={props.companyData.data.odpis.dane.dzial2.organNadzoru[0].sklad}/>;
            default: return <Partners partners={props.companyData.data.odpis.dane.dzial1.wspolnicySpzoo}/>;
        }
    }

    return<div className={styles["form"]}>
        <div className={styles["progresbar"]}></div>
        <div className={styles["form-container"]}>
            <div className={styles["header"]}>
                <h1>{FormTitles[page]}</h1>
            </div>
            <div className={styles["body"]}>{PageDisplay()}</div>
            <div className={styles["footer"]}></div>
            <button
                disabled={page === 0}
                onClick={()=>{setPage((currPage) => currPage-1)}}> Prev </button>
            <button
                disabled={page === FormTitles.length-1}
                onClick={()=>{setPage((currPage) => currPage+1)}}> Next </button>
        </div>
    </div>
}

export default CompanyForm;