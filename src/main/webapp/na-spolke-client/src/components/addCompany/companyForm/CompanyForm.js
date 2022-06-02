import styles from "./CompanyForm.module.css";


const CompanyForm = (props)=>{

    console.log(props.companyData.data.odpis.dane)

    return<div className={styles["form"]}>
        <div className={styles["progresbar"]}></div>
        <div className={styles["form-container"]}></div>
        <div className={styles["header"]}></div>
        <div className={styles["body"]}></div>
        <div className={styles["footer"]}></div>
        <button>Prev</button>
        <button>Next</button>
    </div>
}

export default CompanyForm;