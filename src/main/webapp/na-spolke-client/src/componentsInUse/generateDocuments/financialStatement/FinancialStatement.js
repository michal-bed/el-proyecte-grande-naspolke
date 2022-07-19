import {getCompanyFromDb} from "../../../api/axios"
import {useState} from "react";
import {Company} from "../../../classes/company/Company";
import FinancialStatementForm from "./FinancialStatementForm";



export default function FinancialStatement() {
    const companyIdMac= "19b39ee0-6093-4745-9fb2-c4734badccae"
    const companyIdEASY= "b923aaa8-5c0a-4090-b125-48e8d7a45e0e"
    const companyIdPC= "b884c2a9-5e4a-4f7c-bae0-5f5a98d67508"
    const [company, setCompany] = useState(new Company())

    if (!!!company.krsNumber) {
        getCompanyFromDb(companyIdEASY, setCompany)
    }

    return <div>
        {company.krsNumber!==null && <FinancialStatementForm company={company} companyIdMac={companyIdEASY}/>}
    </div>
}
