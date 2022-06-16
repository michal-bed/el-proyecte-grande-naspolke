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
        if (data === 404) {
            setCompanyDataForm(<ModalErrorMessage hide={hideModal}
                                                  messageTitle="Nie znaleziono.."
                                                  message="Nie znaleziono firmy o podanym numerze KRS \n Sprawdź jego popranowność lub uzupełnij dane samodzielnie"
                                                  closeAndDisplay={closeAndDisplay}/>)
        } else if (data.length === 3) {
            setCompanyDataForm(<ModalErrorMessage hide={hideModal}
                                                  messageTitle={"Problem.."}
                                                  message={"Wystąpił problem z połaczeniem \n Możesz spróbować później lub uzupełnic dane samodzielnie"}
                                                  closeAndDisplay={closeAndDisplay}/>)
        } else if (data.data===null){
            setCompanyDataForm(<ModalErrorMessage hide={hideModal}
                                                  messageTitle={"Problem.."}
                                                  message={"Ta spółka została już dodana. Sprawdź Twoje repozytorium"}
                                                  closeAndDisplay={closeAndDisplay}/>)
        } else {
              setCompanyDataForm(<CompanyForm companyData={data.data}/>);
          }
      }

    const closeAndDisplay = () => {
        setCompanyDataForm(<CompanyForm companyData={null}/>)
    }

    return <div>
        <KrsUserInput addCompanyData={addCompanyForm}/>
        {companyDataForm}
    </div>
}

export default AddCompany;