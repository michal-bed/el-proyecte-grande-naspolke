export default function validateBaseInfo(values){
    let errors = {};

    //company name validation
    if (!values.companyName){
        errors.companyName = "Wpisz pełną nazwę spółki";
    } else if (/[^a-zA-Z0-9.ążźćółęśńŻŹĆĄŚĘŁÓŃ\s-&$@#!^*()?<>"':~_+,/\\]/.test(values.companyName)){
        errors.companyName = "Nazwa zawiera niedozwolone znaki";
    } else if (values.companyName.trim().length < 2) {
        errors.companyName = "Nazwa powinna składać się z conajmniej 2 liter"
    }

    //nip validation

    if(!values.nipInput){
        errors.nipInput = "Wpisz numer NIP"
    } else if (/[^0-9]/.test(values.nipInput)){
        errors.nipInput = "NIP posiada niedozwolone znaki"
    } else if (values.nipInput.length !== 10){
        errors.nipInput = "NIP powinien składać się z 10 cyfr"
    }

    //regon validation
    if(!values.regonInput){
        errors.regonInput = "Wpisz numer REGON"
    } else if (/[^0-9]/.test(values.regonInput)){
        errors.regonInput = "REGON posiada niedozwolone znaki"
    } else if (values.regonInput.length !== 9){
        errors.regonInput = "REGON powinien składać się z 9 cyfr"
    }

    //share capital validation
    if(!values.shareCapitalInput){
        errors.shareCapitalInput = "Wpisz kapitał zakładowy"
    // } else if (/[^0-9.]/.test(values.shareCapitalInput)){
    //     errors.shareCapitalInput = "Niedozwolone znaki"
    // }
    } else if (!(/^\d+(\.\d+)?$/.test(values.shareCapitalInput.toString().trim()))) {
        errors.shareCapitalInput = "Błędny format danych"
    }
    else if (parseInt(values.shareCapitalInput) < 5000){
        errors.shareCapitalInput = "Kapitał zakładowy musi być większy niż 5000 zł"
    }

    //share value validation
    if(!values.shareValueInput){
        errors.shareValueInput = "Wpisz wartość pojedynczego udziału"
    // } else if (/[^0-9.]/.test(values.shareValueInput)){
    //     errors.shareValueInput = "Niedozwolone znaki"
    // }
    } else if (!(/^\d+(\.\d+)?$/.test(values.shareValueInput.toString().trim()))) {
        errors.shareValueInput = "Błędny format danych"
    } else if (values.shareValueInput.toString().trim() < 50) {
        errors.shareValueInput = "Wartość jednego udziału musi być większa niż 50 zł"
    }


    // board members' term validation
    if(values.boardMembersTermInput == null ||
        (!values?.boardMembersTermInput?.toString().replace(/\s/g, '').length)){
        console.log("VALUE")
        console.log(values.boardMembersTermInput)
        errors.boardMembersTermInput = "Wpisz długość kadencji rady nadzorczej"
    } else if (!(/^\d+(\.\d+)?$/.test(values.boardMembersTermInput.toString().trim()))) {
        errors.boardMembersTermInput = "Błędny format danych"
    } else {
        // if (parseFloat(values.boardMembersTermInput) <= 0) {
        //     errors.boardMembersTermInput = "Długość kadencji musi być dłuższa niż 0"
        // }
    }


    // board od directors' term validation
    if(values.boardOfDirectorsTermInput == null ||
        (!values?.boardOfDirectorsTermInput?.toString().replace(/\s/g, '').length)){
        errors.boardOfDirectorsTermInput = "Wpisz długość kadencji zarządu"
    } else if (!(/^\d+(\.\d+)?$/.test(values.boardOfDirectorsTermInput.toString().trim()))) {
        errors.boardOfDirectorsTermInput = "Błędny format danych"
    } else {
        // if (parseFloat(values.boardOfDirectorsTermInput) <= 0) {
        //     errors.boardOfDirectorsTermInput = "Długość kadencji musi być dłuższa niż 0"
        // }
    }


    return errors;
}