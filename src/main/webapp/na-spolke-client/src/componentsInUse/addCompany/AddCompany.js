import React, {useState} from "react";
import KrsUserInput from "./krsInput/KrsUserInput";
import CompanyForm from "./companyForm/CompanyForm";
import {ModalErrorMessage} from "./companyForm/ModalFormKrsInputError";
import {Company} from "../../classes/company/Company";
import {Box} from "@mui/material";
import CompanyContextProvider from "./companyForm/CompanyContext";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import {useLocation, useNavigate} from "react-router-dom";


const AddCompany = () => {

    const axiosPrivate = useAxiosPrivate();

    const [companyDataForm, setCompanyDataForm] = useState(<div/>);
    const [hideKrsInput, setHideKrsInput] = useState("block")
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/userpanel";


    const hideModal = () => {
      setCompanyDataForm(<div/>);
    }


    const addCompanyForm = (data, companyName="") => {
        console.log(data, companyName)
        if (data === 404) {
            setCompanyDataForm(<ModalErrorMessage hide={hideModal}
                                                  messageTitle="Nie znaleziono.."
                                                  message={"Nie znaleziono firmy o podanym numerze KRS. " +
                                                      "Sprawdź jego popranowność lub uzupełnij dane samodzielnie"}
                                                  closeAndDisplay={closeAndDisplay}/>)
        } else if (data === 503) {
            setCompanyDataForm(<ModalErrorMessage hide={hideModal}
                                                  messageTitle={"Problem.."}
                                                  message={"Przepraszamy.. Z uwagi na przerwę techniczną nie można pobrać danych spółki. " +
                                                      "Możesz spróbować później lub uzupełnić dane samodzielnie"}
                                                  closeAndDisplay={closeAndDisplay}/>)
        }  else if (data === 422) {
            setCompanyDataForm(<ModalErrorMessage hide={hideModal}
                                                  messageTitle={"Problem.."}
                                                  message={`Przepraszamy "${companyName}" nie może zostać dodana.` +
                                                      "Obecna wersja programu umożliwia prawidłową obsługę wyłącznie spółek z ograniczoną odpowiedzialnością." +
                                                      "Możesz dodać inną spółke samodzielnie lub anulować"}
                                                  closeAndDisplay={closeAndDisplay}/>)
        }else if (data.length === 3) {
            setCompanyDataForm(<ModalErrorMessage hide={hideModal}
                                                  messageTitle={"Problem.."}
                                                  message={"Wystąpił problem z połaczeniem. Możesz spróbować później lub uzupełnić dane samodzielnie"}
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
        axiosPrivate.post("/add-company/", data)
            .then((response) => {
                if (response.status === 201) {
                    alert(`Spółka ${response.data} została pomyślnie dodana`)
                    setTimeout(()=> {
                        navigate(from, { replace:true })
                    }, 1000)
                }
            })
            .catch((error) => {
                console.log(error)
                alert(`Wystąpił błąd. Spółka nie została dodana. Spróbuj ponownie później.`)
            })
    }

    const closeAndDisplay = () => {
        setCompanyDataForm(<CompanyContextProvider company={new Company(null)}>
            <CompanyForm />
        </CompanyContextProvider>)
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
