import { useRef, useState, useEffect } from 'react';
import useAuth from '../../hooks/useAuth';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Formik, Field } from "formik";
import style from "./Login.module.css"
import {
    Box,
    Button,
    Checkbox,
    Flex,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Input,
    VStack,
    Heading,
    InputRightElement,
    InputGroup
} from "@chakra-ui/react";
import * as Yup from 'yup'
import { ChakraProvider } from '@chakra-ui/react';
import axios from '../../api/axios';
import AESEncrypt from "../../util/AESEncrypt";
const LOGIN_URL = '/auth';

const Login = () => {
    const { setAuth, persist, setPersist, user, setUser } = useAuth();
    const [show, setShow] = useState(false)
    const handleClick = () => setShow(!show)

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    // const userRef = useRef();
    const errRef = useRef();

    const [errMsg, setErrMsg] = useState('');

    const customHandleSubmit = async (values) => {
       // e.preventDefault();

        try {
            const response = await axios.post(LOGIN_URL,
                JSON.stringify({ username: values.email, password: values.password }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            // console.log(JSON.stringify(response?.data));
            const accessToken = response?.data?.accessToken;
            const roles = response?.data?.roles;
            const email = response?.data?.email;
            setAuth({ user: values.email,
                    // pwd: values.password,
                    roles, accessToken });
            // console.log(email)
            localStorage.setItem("user", AESEncrypt(email));
            // console.log(localStorage.getItem("user"));
            setUser(email);
            // console.log(user);
            togglePersist(checkboxRef.current);
            navigate(from, { replace: true });
        } catch (err) {
            // console.log(err);
            if (!err?.response) {
                setErrMsg('Brak odpowiedzi serwera');
            } else if (err.response?.status === 400) {
                setErrMsg('Nie podano adresu e-mail lub hasła');
            } else if (err.response?.status === 401) {
                setErrMsg('Brak dostępu');
            } else {
                setErrMsg('Błędne dane logowania');
            }
            errRef.current.focus();
        }
    }

    const togglePersist = (target) => {
        // console.log("toggle ", target.checked);
        setPersist(target.checked);
        // console.log(persist);
        // setPersist(prev => !prev);
    }

    useEffect(() => {
        localStorage.setItem("persist", persist);
        // console.log("persist", persist);
    }, [persist])

    let password;
    let email;
    useEffect(() => {
        password = document.querySelector("#password");
        email = document.querySelector("#email");
        password.setAttribute('aria-required', "true");
        email.setAttribute('aria-required', "true");
    })

    let toggleFocus = (e) => {
        // document.querySelector("#email").focus();
        // console.log(e.target)
        e.target.focus();
        // email.setAttribute('focus', "true");
    }

    const RefCheckbox = ({ innerRef, ...props }) => (
        <Checkbox ref={innerRef} {...props} />
    );

    let checkboxRef = useRef();

    return (
    <ChakraProvider>
        {/*<section>*/}
                <Flex bg="gray.100" align="center" justify="center" h="100vh">
                    <Box bg="white" p={6} rounded="md" w={80}>
                        <p ref={errRef} className={errMsg ? style.errmsg : style.offscreen} aria-live="assertive">{errMsg}</p>
                        <Heading style={{marginBottom: "0.5rem"}}>Logowanie</Heading>
                        <Formik
                            initialValues={ {
                                email: '',
                                password: '',
                                trustDevice: false
                            }}
                            onSubmit={(values, actions) => {
                                customHandleSubmit(values).then(() =>  {
                                    // actions.resetForm({values: ''})
                                    actions.setSubmitting(false);
                                }).catch(console.log);
                            }}
                            validationSchema={Yup.object({
                                email: Yup.string().required('Wymagane pole'),
                                password: Yup.string().required("Wymagane pole")
                            })}
                            validateOnChange={false}
                            validateOnBlur={false}
                        >
                        {({handleSubmit, handleChange, values, errors, validateForm}) => (
                        <form onSubmit={handleSubmit}>
                            <VStack spacing={4} align="flex-start">
                                <FormControl isRequired isInvalid={!!errors.email}>
                                    <FormLabel htmlFor="email">E-mail</FormLabel>
                                    <Field
                                        as={Input}
                                        id="email"
                                        name="email"
                                        autoFocus
                                        autoComplete={"off"}
                                        value={values.email}
                                        onChange={(e) => { setErrMsg(''); handleChange(e) }}
                                        onClick={toggleFocus}
                                        type="email"
                                        variant="filled"
                                        required={false}
                                        // ariaRequired={true}
                                    />
                                    <FormErrorMessage>{errors.email}</FormErrorMessage>
                                </FormControl>
                                <FormControl isRequired isInvalid={!!errors.password}>
                                    <FormLabel htmlFor="password">Hasło</FormLabel>
                                    <InputGroup size='md'>
                                    <Field
                                        as={Input}
                                        id="password"
                                        name="password"
                                        type={show ? 'text' : 'password'}
                                        value={values.password}
                                        onChange={(e) => { setErrMsg(''); handleChange(e) }}
                                        variant="filled"
                                        required={false}
                                        // ariaRequired={true}
                                        // validate={(value) => {
                                        //     let error;
                                        //
                                        //     if (value.length < 5) {
                                        //         error = "Password must contain at least 6 characters";
                                        //     }
                                        //
                                        //     return error;
                                        // }}
                                    />
                                    <InputRightElement width='4.5rem'>
                                        <Button h='1.75rem' size='sm' onClick={handleClick}>
                                            {show ? 'Ukryj' : 'Pokaż'}
                                        </Button>
                                    </InputRightElement>
                                    </InputGroup>
                                    <FormErrorMessage>{errors.password}</FormErrorMessage>
                                </FormControl>
                                <Field
                                    as={RefCheckbox}
                                    innerRef={(el) => (checkboxRef.current = el)}
                                    id="trustDevice"
                                    name="trustDevice"
                                    value={persist}
                                    onChange = {(e) => {handleChange(e)}}
                                    colorScheme="teal"
                                >
                                    Zapamiętaj mnie
                                </Field>
                                <p>
                                    Nie masz jeszcze konta?<br />
                                    <span className={style.line}>
                                        <Link to="/register">Zarejestruj się</Link>
                                    </span>
                                </p>
                                <Button onClick={(e) => { validateForm() }} type="submit" colorScheme="teal" width="full">
                                    Zaloguj się
                                </Button>
                            </VStack>
                            </form>)}
                        </Formik>
                    </Box>
                </Flex>
        {/*</section>*/}
    </ChakraProvider>
    )
}

export default Login;
