export default function validateAddress(values){
    let errors = {};

    //street name validation
    if(!values.streetNameInput){
        errors.streetNameInput = "Wpisz ulicę"
    } else if (/[^a-zA-ZżźćńłśąęóŻŹĆŃŁŚĄĘÓ.\s-]/.test(values.streetNameInput)){
        errors.streetNameInput = "Nazwa ulicy posiada niedozwolone znaki"
    } else if (values.streetNameInput.length > 150){
        errors.streetNameInput = "Nazwa powinna składać się z maksymalnie 150 znaków"
    }

    // street number validation
    if (!values.streetNumberInput){
        errors.streetNumberInput = "Podaj numer ulicy";
    } else if (/[^0-9a-zA-Z]/.test(values.streetNumberInput)){
        errors.streetNumberInput = "Numer zawiera niedzwolone znaki";
    } else if (values.streetNumberInput.trim().length > 15) {
        errors.streetNumberInput = "Nazwa powinna składać się z maksymalnie 15 znaków"
    }

    //local number validation
    if (!values.localNumberInpu){
    } else if (/[^0-9a-zA-Z]/.test(values.localNumberInput)){
        errors.localNumberInput = "Numer lokalu posiada niedozwolone znaki"
    } else if (values.localNumberInput.length > 9){
        errors.localNumberInput = "Numer lokalu powinien składać z maksymalnie 9 cyfr"
    }

    //city name validation
    if (!values.cityInput){
        errors.cityInput = "Podaj miasto";
    } else if (/[^a-zA-ZżźćńłśąęóŻŹĆŃŁŚĄĘÓ\s-]/.test(values.cityInput)){
        errors.cityInput = "Nazwa miasta zawiera niedzwolone znaki";
    } else if (values.cityInput.trim().length > 31) {
        errors.cityInput = "Nazwa powinna składać się z maksymalnie 30 znaków"
    }

    //zipCode validation
    if(!values.zipCodeInput){
        errors.zipCodeInput = "Wpisz kod pocztowy"
    } else if (/[^0-9-]/.test(values.zipCodeInput)){
        errors.zipCodeInput = "Wpisano niedozwolone znaki"
    } else if (values.zipCodeInput.length !== 6){
        errors.zipCodeInput = "kod pocztowy powinien składać z się maksymalnie 6 znaków"
    }

    //share capital validation
    if(!values.postOfficeInput){
        errors.postOfficeInput = "Wpisz właściwą miejscowo pocztę"
    } else if (/[^0-9a-zA-ZżźćńłśąęóŻŹĆŃŁŚĄĘÓ\s-]/.test(values.zipCodeInput)){
        errors.postOfficeInput = "Wpisano niedozwolone znaki"
    } else if (values.postOfficeInput.length > 31){
        errors.postOfficeInput = "Nazwa miejscowości powinna składać z się maksymalnie 30 liter"
    }

    return errors;
}