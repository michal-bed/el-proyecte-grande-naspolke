export default function ValidationKrsUserInput(values) {
    let errors = {};
    console.log(values)
    //company name validation
    if (!values) {
        errors.krsNumber = "Wpisz numer KRS spółki którą chcesz dodać";
    } else if (/[^0-9]/.test(values)) {
        errors.krsNumber = "Niedozwolone znaki";
    } else if (values.trim().length !== 10) {
        errors.krsNumber = "Numer KRS składa się z 10 cyfr"
    }

    return errors;
}