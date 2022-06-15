import KrsUserInput from "./krsInput/KrsUserInput";
import CompanyForm from "./companyForm/CompanyForm";
import {useState} from "react";
import {ModalErrorMessage} from "./companyForm/ModalFormError";

const AddCompany = ()=>{
    const [companyDataForm, setCompanyDataForm] = useState(<div/>);

    const hideModal = () => {
      setCompanyDataForm(<div/>);
    }

    const addCompanyForm = (data) => {
        console.debug(data)
          if (data===405) {
              setCompanyDataForm(<CompanyForm companyData={data.data}/>);
          } else if (data===404){
              setCompanyDataForm(<ModalErrorMessage hide={hideModal} message={"Nie znaleziono firmy o podanym numerze KRS \n Sprawdź jego popranowność lub uzupełnij dane ręcznie"}/>)
          }
      }

    return <div>
        <KrsUserInput addCompanyData={addCompanyForm}/>
        {companyDataForm}
    </div>
}

export default AddCompany;