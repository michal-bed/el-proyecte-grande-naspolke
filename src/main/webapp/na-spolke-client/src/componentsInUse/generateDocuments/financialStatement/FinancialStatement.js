import {getCompanyFromDb} from "../../../api/axios"
import {useEffect, useState} from "react";
import {Company} from "../../../classes/company/Company";
import FinancialStatementForm from "./FinancialStatementForm";
import {useParams} from "react-router-dom";



export default function FinancialStatement() {
    const companyIdMac= "19b39ee0-6093-4745-9fb2-c4734badccae"
    const companyIdEASY= "392a1d1c-e8d6-43d2-9c60-2f1eaf0cc41c"
    // const companyIdPC= "0018bb6f-6844-417f-b5f9-6923a629b980"
    const [company, setCompany] = useState(new Company())
    let {companyId} = useParams();
    useEffect(() => {
        // getCompanyById(companyId)
        //     .then(res => {
        //         setCompany(res.data)})
    if (!!!company.krsNumber) {
        getCompanyFromDb(companyId, setCompany)
        console.log()
    }
    }, [company])
console.log(company)

    return <div>
        {company.krsNumber!==null && <FinancialStatementForm company={company} companyIdMac={companyId}/>}
    </div>
}
