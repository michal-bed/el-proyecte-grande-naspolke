import {getCompanyFromDb} from "../../../api/axios"
import {useEffect, useState} from "react";
import {Company} from "../../../classes/company/Company";
import FinancialStatementForm from "./FinancialStatementForm";
import {useParams} from "react-router-dom";



export default function FinancialStatement() {

    const [company, setCompany] = useState(new Company())
    let {companyId} = useParams();

    useEffect(() => {
        getCompanyFromDb(companyId, setCompany)
    }, [])

    return <div>
        {company.krsNumber!==null && <FinancialStatementForm company={company} companyIdMac={companyId}/>}
    </div>
}
