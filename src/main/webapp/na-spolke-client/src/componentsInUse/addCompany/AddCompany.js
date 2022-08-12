import React, {useState} from "react";
import KrsUserInput from "./krsInput/KrsUserInput";
import CompanyForm from "./companyForm/CompanyForm";
import {ModalErrorMessage} from "./companyForm/ModalFormKrsInputError";
import {Company} from "../../classes/company/Company";
import {Box, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@mui/material";
import CompanyContextProvider from "./companyForm/CompanyContext";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import {Card, Typography} from "@material-ui/core";
import MKButton from "../../mkFiles/components/MKButton";
import {useLocation, useNavigate} from "react-router-dom";


const AddCompany = () => {

    const axiosPrivate = useAxiosPrivate();
    const [companyDataForm, setCompanyDataForm] = useState(<div/>);
    const [hideKrsInput, setHideKrsInput] = useState("block")
    const [companyFound, setCompanyFound] = useState(false);
    const [verifyDialogIsOpen, setVerifyDialogIsOpen] = useState(false);
    const [addCompanyInfo, setAddCompanyInfo] = useState("");
    const [toNavigate, setToNavigate] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/userpanel";


    const hideModal = () => {
      setCompanyDataForm(<div/>);
    }

    const handleClose = () => {
        setVerifyDialogIsOpen(false);
        if (toNavigate) {
            navigate(from, {replace: true});
        }
    }

    const handleOpen = (addingData, ifNavigate) => {
        setAddCompanyInfo(addingData);
        setVerifyDialogIsOpen(true);
        setToNavigate(ifNavigate);
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
            setCompanyFound(true);
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
                    handleOpen(`Spółka ${response.data} została pomyślnie dodana`, true);
                }
            })
            .catch((error) => {
                console.log(error)

                // alert(`Wystąpił błąd. Spółka nie została dodana. Spróbuj ponownie później.`)

                handleOpen(`Wystąpił błąd. Spółka nie została dodana. Spróbuj ponownie później.`, false);

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
    return (
        <div>
            <Card style={{ height: '10vh' }}>
                <Box sx={{ mx: "auto", width: 400, textAlign: 'center' }}>
                    <Typography variant="h3" component="div">Dodaj spółkę</Typography>
                </Box>
            </Card><br/>
            {companyFound ?
            <Card><br/>
                <Box sx={{ mx: "auto" }}>
                    {companyDataForm}
                </Box>
            </Card> :
            <Card style={{ height: '15rem' }}>
                <Box sx={{ mx: "auto", width: 500 }}>
                    <Box style={{display: hideKrsInput, justifyContent:'center', alignItems:'center', height: '300vh'}}>
                        <KrsUserInput addCompanyData={addCompanyForm}/>
                    </Box>
                </Box>
            </Card>
            }
            {verifyDialogIsOpen &&
                <Dialog
                    open={verifyDialogIsOpen}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title" style={{ textAlign: 'center' }}>
                        {"Użytkowniku"}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            {addCompanyInfo}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <MKButton onClick={handleClose} variant="gradient" color="info" fullWidth>Ok</MKButton>
                    </DialogActions>
                </Dialog>
            }
        </div>
    )
}

export default AddCompany;
