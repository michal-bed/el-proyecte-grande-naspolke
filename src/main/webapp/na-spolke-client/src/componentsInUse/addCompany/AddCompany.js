import React from "react";
import KrsUserInput from "./krsInput/KrsUserInput";
import CompanyForm from "./companyForm/CompanyForm";
import {useState} from "react";

const AddCompany = ()=>{
    const [companyDataForm, setCompanyDataForm] = useState(<div/>);
    
    const addCompanyForm = (data) => {
          if (data)
              setCompanyDataForm(<CompanyForm companyData={data}/>);
      }

    return <div>
        <KrsUserInput addCompanyData={addCompanyForm}/>
        {companyDataForm}
    </div>
}

export default AddCompany;