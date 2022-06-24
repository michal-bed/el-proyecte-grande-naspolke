export default function validatePartners(values){
    let errors = {};

    //individual Partner last name validation
    if (!values.lastNameI) {
        errors.lastNameI = "Wpisz nazwisko";
    } else if (/[^a-zA-Z.ążźćółęśńŻŹĆĄŚĘŁÓŃ\s]/.test(values.lastNameI)) {
        errors.lastNameI = "Nazwisko zawiera niedozwolone znaki";
    } else if (values.lastNameI.length < 3) {
        errors.lastNameI = "Nazwisko powinno zawierać conajmniej 3 litery";
    }


    //individual Partner last nameII validation
    if (!values.lastNameII) {
    } else if (/[^a-zA-Z.ążźćółęśńŻŹĆĄŚĘŁÓŃ\s]/.test(values.lastNameII)) {
        errors.lastNameII = "Nazwisko zawiera niedozwolone znaki";
    } else if (values.lastNameII.length < 3) {
        errors.lastNameII = "Nazwisko powinno zawierać conajmniej 3 litery";
    }


     //individual Partner first name validation
    if (!values.firstName) {
        errors.firstName = "Wpisz imię";
    } else if (/[^a-zA-Z.ążźćółęśńŻŹĆĄŚĘŁÓŃ\s]/.test(values.firstName)) {
        errors.firstName = "Imię zawiera niedozwolone znaki";
    } else if (values.firstName.length < 2) {
        errors.firstName = "Nazwisko musi zawierać conajmniej 2 znaki";
    } else if (values.firstName.length > 31) {
        errors.firstName = "Nazwisko moze zawierać maksymalnie 30 znakow";
    }

    //individual Partner second name validation
    if (!values.secondName) {
    } else if (/[^a-zA-Z.ążźćółęśńŻŹĆĄŚĘŁÓŃ\s]/.test(values.secondName)) {
        errors.secondName = "Imię zawiera niedozwolone znaki";
    } else if (values.secondName.length < 2) {
        errors.secondName = "Imię powinno zawierać conajmniej 2 litery";
    }

    //company partner name validation
    if (!values.name) {
        errors.name = "Wpisz pełną nazwę spółki";
    } else if (/[^a-zA-Z.ążźćółęśńŻŹĆĄŚĘŁÓŃ\s]/.test(values.name)) {
        errors.name = "Nazwa zawiera niedozwolone znaki";
    } else if (values.name.length < 3) {
        errors.name = "Nazwa powinna zawierać conajmniej 3 litery";
    }

    //share count validation
    if (!values.sharesCount) {
        errors.sharesCount = "Podaj ilość udziałów";
    } else if (/[^0-9,]/.test(values.sharesCount)) {
        errors.sharesCount = "Niedozwolone znaki";
    } else if (parseInt(values.sharesCount) <= 0) {
        errors.sharesCount = "ilość udziałów powinna być dodatnia"
    } else if (!Number.isInteger(parseInt(values.sharesCount))) {
        errors.sharesCount = "ilość udziałów powinna być całkowita";
    }

    //share capital validation
    if (!values.sharesValue) {
        errors.sharesValue = "Wpisz wartość udziałów";
    } else if (parseInt(values.shareCapitalInput) <= 0) {
        errors.sharesValue = "wartość udziałów powinna być większa niż 0";
    }

    if (!values.function) {
        errors.function = "Wpisz nazwę funkcji";
    } else if (/[^a-zA-Z.ążźćółęśńŻŹĆĄŚĘŁÓŃ\s]/.test(values.function)){
        errors.function = "Nazwa funkcji posiada niedozwolone znaki";
    } else if (values.function.length > 20) {
        errors.function = "Nazwa funkcji nie powinna mieć więcej niż 20 znaków";
    }

    return errors;
}