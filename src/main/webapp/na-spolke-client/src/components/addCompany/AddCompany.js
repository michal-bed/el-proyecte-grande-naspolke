import KrsUserInput from "./krsInput/KrsUserInput";
import CompanyForm from "./companyForm/CompanyForm";
import {useState} from "react";
import {ModalErrorMessage} from "./companyForm/ModalFormKrsInputError";
import {Company} from "../../classes/company/Company";
import Axios from "axios";
import {Box} from "@mui/material";
import CompanyContextProvider from "./companyForm/CompanyContext";


const AddCompany = ()=>{
    const [companyDataForm, setCompanyDataForm] = useState(<div/>);
    const [hideKrsInput, setHideKrsInput] = useState("block")

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
              const company = checkForCompanyData(data.data)
            setHideKrsInput("none")
              setCompanyDataForm(
                  <CompanyContextProvider company={company}>
                    <CompanyForm company={company} saveData={saveDataIntoDb}/>
                  </CompanyContextProvider>
              );
          }
      }

    function saveDataIntoDb(data){
        Axios.post("http://localhost:8080/add-company/",data)
            .then(response=> {
                if (response.status===201) {
                    alert(`Spółka ${response.data} została pomyślnie dodana`)
                }
            })
            .catch(error=>{
                console.log(error)
                alert(`Wystąpił błąd.. spółka nie została dodana. Spróbuj ponownie później.`)
            })
    }

    const closeAndDisplay = () => {
        setCompanyDataForm(<CompanyForm companyData={null}/>)
    }

    function checkForCompanyData(data) {
        if (data !== null) {
            return new Company(data)
        } else {
            return null;
        }
    }
    return <div>
        <Box style={{display: hideKrsInput}}>
            <KrsUserInput addCompanyData={addCompanyForm}/>
        </Box>
        {companyDataForm}
    </div>
}

export default AddCompany;