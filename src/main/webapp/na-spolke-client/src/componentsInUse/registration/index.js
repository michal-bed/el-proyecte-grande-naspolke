import {useLayoutEffect, useRef, useState} from "react";

// react-router-dom components
import {Link, useLocation, useNavigate} from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
import Switch from "@mui/material/Switch";
import Grid from "@mui/material/Grid";

// @mui icons

// Material Kit 2 React components
import MKBox from "../../mkFiles/components/MKBox";
import MKTypography from "../../mkFiles/components/MKTypography";
import MKInput from "../../mkFiles/components/MKInput";
import MKButton from "../../mkFiles/components/MKButton";

// Material Kit 2 React example components
import DefaultNavbar from "../../mkFiles/pageComponents/DefaultNavbar";
import SimpleFooter from "../footer/SimpleFooter";

// Material Kit 2 React page layout routes
import Routes from "../../routes";

// Images
import bgImage from "../../assets/images/bg-sign-in-basic.jpeg"
import axios from "../../api/axios";
import {
    Box,
    CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText,
    DialogTitle,
    FormControlLabel,
    IconButton,
    InputAdornment,
    LinearProgress
} from "@mui/material";
import * as Yup from "yup";
import {useFormik} from "formik";
import {Visibility, VisibilityOff} from "@material-ui/icons";
import {Button} from "@chakra-ui/react";


function RegistrationBasic() {
    const REGISTRATION_URL = '/registration';
    const route = Routes();

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const [showPassword, setShowPassword] = useState(false)
    const handleClickPassword = () => setShowPassword(!showPassword)

    const [showConfirmation, setShowConfirmation] = useState(false)
    const handleClickConfirmation = () => setShowConfirmation(!showConfirmation)

    const [agreed, setAgreed] = useState(false)
    const handleClickAgreed= () => setAgreed(!agreed)

    const errRef = useRef();
    const [errMsg, setErrMsg] = useState('');

    const [verifyDialogIsOpen, setVerifyDialogIsOpen] = useState(false);

    const handleClose = () => {
        setVerifyDialogIsOpen(false);
        navigate(from, { replace: true });
    };

    const [isLoading, setIsLoading] = useState(false);

    useLayoutEffect(() => {
        let registrationForm = document.getElementById("new-user-register-form");
        if (isLoading) {
            registrationForm.style.opacity = "0.5";
        }
        if (!isLoading) {
            registrationForm.style.opacity = "1";
        }
    }, [isLoading]);

    const customHandleSubmit = async (values) => {
        setIsLoading(true);
        try {

            let userData = { userName: values.name, userSurname: values.surname, userEmail: values.email, userPassword: values.password, statute: values.agreed };
            console.log(userData)

            const response = await axios.post(REGISTRATION_URL,
                JSON.stringify(userData),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            setIsLoading(false);
            setVerifyDialogIsOpen(true);

        } catch (err) {
            console.log(err)
            setIsLoading(false);
            if (!err?.response) {
                setErrMsg('Brak odpowiedzi serwera');
            } else if (err.response?.status === 401) {
                setErrMsg('Brak dostępu');
            } else if (err.response?.status === 400) {
                setErrMsg('Użytkownik o takim adresie email już istnieje');
            } else {
                setErrMsg('Rejestracja nie powiodła się ');
            }
        }
    }

    const validationSchema = Yup.object({
        name: Yup
            .string().required('Wymagane pole'),

        surname: Yup
            .string().required('Wymagane pole'),

        email: Yup
            .string().required('Wymagane pole'),

        password: Yup
            .string().required("Wymagane pole")
            .min(8, 'Hasło musi miec przynajmniej osiem znaków'),

        confirmPassword: Yup
            .string()
            .required("Wymagane pole")
            .oneOf([Yup.ref('password')], "Hasła muszą być takie same"),

        agreed: Yup
            .bool()
            .required("Musisz potwierdzić regulamin strony aby założyć konto")
            .oneOf([true], "Musisz potwierdzić regulamin strony aby założyć konto")
    })

    const formik = useFormik({
        initialValues: {
            name: '',
            surname: '',
            email: '',
            password: '',
            confirmPassword: '',
            agreed: false
        },
        validationSchema: validationSchema,
        onSubmit: (values, actions) => {
            customHandleSubmit(values).then(() =>  {
                actions.setSubmitting(false);
            }).catch(console.log);
        }
    })


  return (  <>
          <DefaultNavbar
              routes={route}
          />
          <MKBox
              position="absolute"
              top={0}
              left={0}
              zIndex={1}
              width="100%"
              minHeight="100vh"
              sx={{
                  backgroundImage: ({ functions: { linearGradient, rgba }, palette: { gradients } }) =>
                      `${linearGradient(
                          rgba(gradients.dark.main, 0.6),
                          rgba(gradients.dark.state, 0.6)
                      )}, url(${bgImage})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
              }}
          />
          <MKBox px={1} width="100%" height="100vh" mx="auto" position="relative" zIndex={2}>
              <Grid container spacing={1} justifyContent="center" alignItems="center" height="100%">
                  <Grid item xs={11} sm={9} md={5} lg={4} xl={3}>
                      <Card>
                          <MKBox
                              variant="gradient"
                              bgColor="info"
                              borderRadius="lg"
                              coloredShadow="info"
                              mx={2}
                              mt={-3}
                              p={2}
                              mb={1}
                              textAlign="center"
                          >
                              <MKTypography variant="h4" fontWeight="medium" color="white" mt={1}>
                                  Rejestracja
                              </MKTypography>
                          </MKBox>
                          <MKBox pt={4} pb={3} px={3}>
                              <MKTypography ref={errRef} color="error" sx={{display: errRef ? "block" : "none",
                                  textAlign: "center",
                                  pb: 3}} aria-live="assertive">
                                  {errMsg}
                              </MKTypography>

                              <MKBox id="new-user-register-form">
                                  <form onSubmit={formik.handleSubmit}>
                                      <MKBox mb={2}>
                                          <MKInput
                                              type="text"
                                              label="Imie"
                                              fullWidth
                                              id="name"
                                              name="name"
                                              value={formik.values.name}
                                              onChange={formik.handleChange}
                                              error={formik.touched.name && Boolean(formik.errors.name)}
                                              helperText={formik.touched.name && formik.errors.name}
                                          />
                                      </MKBox>
                                      <MKBox mb={2}>
                                          <MKInput
                                              type="text"
                                              label="Nazwisko"
                                              fullWidth
                                              id="surname"
                                              name="surname"
                                              value={formik.values.surname}
                                              onChange={formik.handleChange}
                                              error={formik.touched.surname && Boolean(formik.errors.surname)}
                                              helperText={formik.touched.surname && formik.errors.surname}
                                          />
                                      </MKBox>
                                      <MKBox mb={2}>
                                          <MKInput
                                              type="email"
                                              label="Email"
                                              fullWidth
                                              id="email"
                                              name="email"
                                              value={formik.values.email}
                                              onChange={formik.handleChange}
                                              error={formik.touched.email && Boolean(formik.errors.email)}
                                              helperText={formik.touched.email && formik.errors.email}
                                          />
                                      </MKBox>
                                      <MKBox mb={2}>
                                          <MKInput type={showPassword ? "text" : "password"}
                                                   label="Hasło"
                                                   fullWidth
                                                   id="password"
                                                   name="password"
                                                   value={formik.values.password}
                                                   onChange={formik.handleChange}
                                                   error={formik.touched.password && Boolean(formik.errors.password)}
                                                   helperText={formik.touched.password && formik.errors.password}
                                                   InputProps={{
                                                       endAdornment: (
                                                           <InputAdornment position="end">
                                                               <IconButton
                                                                   aria-label="toggle password visibility"
                                                                   id="showPassword"
                                                                   name="showPassword"
                                                                   checked={showPassword}
                                                                   onClick={() => {handleClickPassword()}}
                                                               >
                                                                   {showPassword ? <Visibility /> : <VisibilityOff />}
                                                               </IconButton>
                                                           </InputAdornment>
                                                       )
                                                   }}/>
                                      </MKBox>
                                      <MKBox mb={2}>
                                          <MKInput type={showConfirmation ? "text" : "password"}
                                                   label="Potwierdź hasło"
                                                   fullWidth
                                                   id="confirmPassword"
                                                   name="confirmPassword"
                                                   value={formik.values.confirmPassword}
                                                   onChange={formik.handleChange}
                                                   error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
                                                   helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
                                                   InputProps={{
                                                       endAdornment: (
                                                           <InputAdornment position="end">
                                                               <IconButton
                                                                   aria-label="toggle password visibility"
                                                                   id="showConfirmation"
                                                                   name="showConfirmation"
                                                                   checked={showConfirmation}
                                                                   onClick={() => {handleClickConfirmation()}}
                                                               >

                                                                   {showConfirmation ? <Visibility /> : <VisibilityOff />}
                                                               </IconButton>
                                                           </InputAdornment>
                                                       )
                                                   }}/>
                                      </MKBox>
                                      <MKBox mb={2}>
                                          <FormControlLabel
                                          control={
                                              <Switch

                                                  id="agreed"
                                                  name="agreed"
                                                  checked={agreed}
                                                  color="primary"

                                                  onChange={(e) => {
                                                      formik.handleChange(e)
                                                      handleClickAgreed()
                                                  }}
                                                  sx={{cursor: "pointer",
                                                      userSelect: "none",
                                                      ml: -1,
                                                      }}
                                              />}
                                          label={<MKTypography
                                              sx={{fontSize: "1em"}}
                                              variant="overline">
                                              Przeczytałem i akceptuje <MKTypography
                                              component={Link}
                                              target="_blank"
                                              to="/statute"
                                              variant="button"
                                              color="info"
                                              fontWeight="medium"
                                              textGradient
                                          >
                                              regulamin strony
                                          </MKTypography>
                                          </MKTypography>}
                                          labelPlacement="end"

                                      />
                                          <MKTypography color="error" variant="caption"> {formik.touched.agreed && formik.errors.agreed}</MKTypography>
                                      </MKBox>
                                      {isLoading ?
                                            <CircularProgress style={{ position: 'absolute', top: '45%', left: '45%'}} color="black"/> :
                                      <MKBox mt={4} mb={1}>
                                          <MKButton type="submit" variant="gradient" color="info" fullWidth disabled={isLoading}>
                                              Zarejestruj się
                                          </MKButton>
                                      </MKBox>}
                                      <MKBox mt={3} mb={1} textAlign="center">
                                          <MKTypography variant="button" color="text">
                                              Masz konto?{" "}
                                              <MKTypography
                                                  component={Link}
                                                  to="/login"
                                                  variant="button"
                                                  color="info"
                                                  fontWeight="medium"
                                                  textGradient
                                              >
                                                  Zaloguj się
                                              </MKTypography>
                                          </MKTypography>
                                      </MKBox>
                                  </form>
                              </MKBox>
                          </MKBox>
                      </Card>
                  </Grid>
              </Grid>
          </MKBox>
          <MKBox width="100%" position="absolute" zIndex={2} bottom="1.625rem">
              <SimpleFooter />
          </MKBox>
          {verifyDialogIsOpen &&
              <Dialog
                  open={verifyDialogIsOpen}
                  onClose={handleClose}
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description"
              >
                  <DialogTitle id="alert-dialog-title">
                      {"Zweryfikuj swoje konto"}
                  </DialogTitle>
                  <DialogContent>
                      <DialogContentText id="alert-dialog-description">
                          Wysłaliśmy do Ciebie maila z linkiem aktywacyjnym. Aby się zalogować, sprawdź
                          pocztę i kliknij 'Zweryfikuj'. Zostaniesz automatycznie przeniesiony do naszego
                          portalu.
                      </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                      <MKButton onClick={handleClose} variant="gradient" color="info" fullWidth>Ok</MKButton>
                  </DialogActions>
              </Dialog>
          }
      </>
  );
}

export default RegistrationBasic;
