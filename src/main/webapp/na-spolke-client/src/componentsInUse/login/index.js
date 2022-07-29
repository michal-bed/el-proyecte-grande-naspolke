import {useLayoutEffect, useRef, useState} from 'react';
import useAuth from '../../hooks/useAuth';
import {Link, useLocation, useNavigate} from 'react-router-dom';
import {useFormik} from "formik";
import Checkbox from "@mui/material/Checkbox";
import * as Yup from 'yup'
import axios from '../../api/axios';
import AESEncrypt from "../../util/AESEncrypt";

// @mui material components
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import {CircularProgress, FormControlLabel, IconButton, InputAdornment} from "@mui/material";
import {Visibility, VisibilityOff} from "@material-ui/icons";

// Material Kit 2 React components
import MKBox from "../../mkFiles/components/MKBox";
import MKTypography from "../../mkFiles/components/MKTypography";
import MKInput from "../../mkFiles/components/MKInput";
import MKButton from "../../mkFiles/components/MKButton";

// Images
import bgImage from "../../assets/images/bg-sign-in-basic.jpeg"

// React page layout routes
import Routes from "../../routes";
import SimpleFooter from "../footer/SimpleFooter";
import DefaultNavbar from "../../mkFiles/pageComponents/DefaultNavbar";


function SignInBasic() {
    const LOGIN_URL = '/auth';

    const route = Routes();

    const { setAuth, persist, setPersist, user, setUser } = useAuth();

    const [show, setShow] = useState(false)
    const handleClick = () => setShow(!show)

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";
    const errRef = useRef();

    const [errMsg, setErrMsg] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    useLayoutEffect(() => {
        let registrationForm = document.getElementById("user-login-form");
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
            const response = await axios.post(LOGIN_URL,
                JSON.stringify({ username: values.email, password: values.password }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );

            const accessToken = response?.data?.accessToken;
            const roles = response?.data?.roles;
            const email = response?.data?.email;
            setAuth({ user: values.email,
                roles, accessToken });

            localStorage.setItem("user", AESEncrypt(email));
            setUser(email);
            setIsLoading(false);
            togglePersist(formik.values.trustDevice);
            navigate(from, { replace: true });
        } catch (err) {
            console.log(err)
            setIsLoading(false);
            if (!err?.response) {
                setErrMsg('Brak odpowiedzi serwera');
            } else if (err.response?.status === 400) {
                setErrMsg('Nie podano adresu e-mail lub hasła');
            } else if (err.response?.status === 401) {
                setErrMsg('Brak dostępu');
            } else {
                setErrMsg('Błędne dane logowania');
            }
        }
    }

    const togglePersist = (checked) => {
        localStorage.setItem("persist", checked);
        setPersist(checked);
        console.log(persist);
    }


    const RefCheckbox = ({ innerRef, ...props }) => (
        <Checkbox ref={innerRef} {...props} />
    );

    let checkboxRef = useRef();

    const validationSchema = Yup.object({
        email: Yup
            .string().required('Wymagane pole'),
        password: Yup
            .string().required("Wymagane pole")
    })


    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            trustDevice: false,
        },
        validationSchema: validationSchema,
        onSubmit: (values, actions) => {
        customHandleSubmit(values).then(() =>  {
            actions.setSubmitting(false);
        }).catch(console.log);
    }
    })


  return (
    <>
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
                  Logowanie
                </MKTypography>
              </MKBox>
              <MKBox pt={4} pb={3} px={3}>
                  <MKTypography ref={errRef} color="error" sx={{display: errRef ? "block" : "none",
                      textAlign: "center",
                    pb: 3}} aria-live="assertive">
                      {errMsg}
                  </MKTypography>

                <MKBox id="user-login-form">
                    <form onSubmit={formik.handleSubmit}>
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
                    <MKInput type={show ? "text" : "password"}
                             label="Password"
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
                                  id="show"
                                  name="show"
                                  checked={show}
                                  onClick={() => {handleClick()}}
                                  >

                                  {show ? <Visibility /> : <VisibilityOff />}
                              </IconButton>
                          </InputAdornment>
                      )
                  }}/>
                  </MKBox>
                  <MKBox display="flex" alignItems="center" ml={-1}>
                      <FormControlLabel
                          control={
                              <Checkbox
                                  id="trustDevice"
                                  name="trustDevice"
                                  checked={formik.values.trustDevice}
                                  as={RefCheckbox}
                                  innerRef={(el) => (checkboxRef.current = el)}
                                  color="text"
                                  onClick={(e) => {
                                      formik.handleChange(e)
                                  }}
                                  sx={{cursor: "pointer", userSelect: "none", ml: -1}}
                              />
                          }
                          label="Zapamiętaj mnie"
                          sx={{pl: 3}}
                          />

                  </MKBox>
                  <MKBox mt={4} mb={1}>
                      {isLoading ?
                          <CircularProgress style={{ position: 'absolute', top: '45%', left: '45%'}} color="black"/> :
                    <MKButton type="submit" variant="gradient" color="info" fullWidth>
                      Zaloguj się
                    </MKButton>}
                  </MKBox>
                  <MKBox mt={3} mb={1} textAlign="center">
                    <MKTypography variant="button" color="text">
                      Nie masz konta?{" "}
                      <MKTypography
                        component={Link}
                        to="/register"
                        variant="button"
                        color="info"
                        fontWeight="medium"
                        textGradient
                      >
                        Zarejestruj się
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
    </>
  );
}

export default SignInBasic;
