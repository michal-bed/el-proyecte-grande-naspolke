export default function validateBaseInfo(values){
    let errors = {};

    //company name validation
    if (!values.companyName){
        errors.companyName = "Wpisz pełną nazwę spółki";
    } else if (/[^a-zA-Z.ążźćółęśńŻŹĆĄŚĘŁÓŃ\s]/.test(values.companyName)){
        errors.companyName = "Nazwa zawiera niedozwolone znaki";
    } else if (values.companyName.trim().length < 9) {
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
    } else if (/[^0-9]/.test(values.shareCapitalInput)){
        errors.shareCapitalInput = "Niedozwolone znaki"
    } else if (parseInt(values.shareCapitalInput) < 5000){
        errors.shareCapitalInput = "kapitał zakładowy musi być większy niż 5000 zł"
    }

    return errors;
}