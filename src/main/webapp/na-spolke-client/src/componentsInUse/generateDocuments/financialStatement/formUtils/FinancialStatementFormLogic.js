import * as yup from "yup";

export const validationSchema = yup.object().shape({
    protocolNumber: yup
        .number("Liczba musi być całkowita większa niż 0")
        .required("To pole jest wymagane")
        .min(1, "Liczba musi być większa niż 0"),
    meetingPlace : (yup
        .string()
        .trim()
        .matches(/[a-zA-z\sżźćńłśąęóŻŹĆŃŁŚĄÓĘ-]+$/, "niedozwolone znaki")
        .min(5, "nazwa musi mieć conajmniej 5 znaków")),
    streetName : (yup
        .string()
        .trim()
        .matches(/[a-zA-z\sżźćńłśąęóŻŹĆŃŁŚĄÓĘ-]+$/, "niedozwolone znaki")
        .min(5, "nazwa musi mieć conajmniej 5 znaków")),
    city : (yup
        .string()
        .trim()
        .matches(/[a-zA-z\sżźćńłśąęóŻŹĆŃŁŚĄÓĘ-]+$/, "niedozwolone znaki")
        .min(3, "nazwa musi mieć conajmniej 3 znaki")),
    zipCode  : (yup
        .string()
        .trim()
        .matches(/\d\d-\d\d\d/, "prawidłowy format kodu pocztowego to xx-xxx")
        .min(6, "prawidłowy format kodu pocztowego to xx-xxx")
        .max(6, "prawidłowy format kodu pocztowego to xx-xxx")),
})