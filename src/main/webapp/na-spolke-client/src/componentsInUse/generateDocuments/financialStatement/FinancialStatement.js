import {getCompanyFromDb} from "../../../api/axios"
import {useState} from "react";

export default function FinancialStatement(){
    const [company, setCompany] = useState("")

    if(!!!company) {
        getCompanyFromDb("sadad", setCompany)
    }
        console.log(company)
    return <div/>
}