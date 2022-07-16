import {getCompanyFromDb} from "../../../api/axios"
import {useState} from "react";
import {Company} from "../../../classes/company/Company";
import FinancialStatementForm from "./FinancialStatementForm";



export default function FinancialStatement() {
    const companyIdMac= "19b39ee0-6093-4745-9fb2-c4734badccae"
    const companyIdPC= "b884c2a9-5e4a-4f7c-bae0-5f5a98d67508"
    const [company, setCompany] = useState(new Company())

    if (!!!company.krsNumber) {
        getCompanyFromDb(companyIdMac, setCompany)
    }

    console.log(company.krsNumber)
    console.log(company)
    return <div>
        {company.krsNumber!==null && <FinancialStatementForm company={company} companyIdMac={companyIdMac}/>}
    </div>
}
