import {getCompanyFromDb} from "../../../api/axios"
import {useState} from "react";
import {Company} from "../../../classes/company/Company";
import FinancialStatementForm from "./FinancialStatementForm";



export default function FinancialStatement() {
    const companyIdMac= "19b39ee0-6093-4745-9fb2-c4734badccae"
    const companyIdEASY= "b923aaa8-5c0a-4090-b125-48e8d7a45e0e"
    const companyIdPC= "88eac81a-0163-4bc5-ae47-d6a135af6ae1"
    const [company, setCompany] = useState(new Company())

    if (!!!company.krsNumber) {
        getCompanyFromDb(companyIdPC, setCompany)
    }

    return <div>
        {company.krsNumber!==null && <FinancialStatementForm company={company} companyIdMac={companyIdPC}/>}
    </div>
}
