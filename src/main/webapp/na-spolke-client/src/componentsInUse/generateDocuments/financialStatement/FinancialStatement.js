import {getCompanyFromDb} from "../../../api/axios"
import {useState} from "react";
import {Company} from "../../../classes/company/Company";
import FinancialStatementForm from "./FinancialStatementForm";



export default function FinancialStatement() {
    const companyIdMac= "19b39ee0-6093-4745-9fb2-c4734badccae"
    const companyIdEASY= "392a1d1c-e8d6-43d2-9c60-2f1eaf0cc41c"
    const companyIdPC= "820af98b-0618-4055-b72b-477f21a76829"
    const [company, setCompany] = useState(new Company())

    if (!!!company.krsNumber) {
        getCompanyFromDb(companyIdPC, setCompany)
    }

    return <div>
        {company.krsNumber!==null && <FinancialStatementForm company={company} companyIdMac={companyIdPC}/>}
    </div>
}
