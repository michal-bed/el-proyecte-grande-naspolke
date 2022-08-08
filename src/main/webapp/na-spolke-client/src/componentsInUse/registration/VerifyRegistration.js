import {useLayoutEffect, useState} from "react";
import {Link, useSearchParams} from "react-router-dom";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import MKBox from "../../mkFiles/components/MKBox";
import MKTypography from "../../mkFiles/components/MKTypography";
import MKButton from "../../mkFiles/components/MKButton";
import DefaultNavbar from "../indexNavbar/WorkingNavbar";
import SimpleFooter from "../footer/SimpleFooter";
import Routes from "../../routes";
import bgImage from "../../assets/images/bg-sign-in-basic.jpeg"
import {Box, CircularProgress, Typography} from "@mui/material";


function VerifyRegistration() {

    const route = Routes();
    const [searchParams, setSearchParams] = useSearchParams();
    const activationCode = searchParams.get("code");
    const [isVerified, setIsVerified] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useLayoutEffect(() => {
        let registrationForm = document.getElementById("verify-user-register");
        if (isLoading) {
            registrationForm.style.opacity = "0.5";
        }
        if (!isLoading) {
            registrationForm.style.opacity = "1";
        }
    }, [isLoading]);

    const verifyAccount = () => {
        setIsLoading(true);
        fetch(`http://localhost:8080/verify-registration-code/${activationCode}`, {
            headers: {'Content-Type': 'application/json'}
        })
        .then((response) => {
            if(response.status === 200) {
                setIsLoading(false);
                setIsVerified(true);
            }
        })
        .catch((error) => {
            console.error('Error:', error);
        })
    }

    return (
        <>
            <DefaultNavbar routes={route}/>
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
                                    Weryfikacja
                                </MKTypography>
                            </MKBox>
                            <MKBox pt={4} pb={3} px={3}>
                                <MKBox id="verify-user-register">
                                    {!isVerified ?
                                        <Box>
                                            <Typography textAlign="center">
                                                Konto zostało pomyślnie zweryfikowane
                                            </Typography>
                                            <MKBox mt={4} mb={1}>
                                                {isLoading ?
                                                    <CircularProgress style={{ position: 'absolute', top: '45%', left: '45%'}} color="black"/> :
                                                    <MKButton
                                                        onClick={verifyAccount}
                                                        variant="gradient"
                                                        color="info" fullWidth
                                                    >
                                                        Ok
                                                    </MKButton>}
                                            </MKBox>
                                        </Box>:
                                        <Box mt={3} mb={1} textAlign="center">
                                            <MKTypography variant="button" color="text">
                                                <MKButton
                                                    component={Link}
                                                    to="/login"
                                                    variant="gradient"
                                                    color="info" fullWidth
                                                >
                                                    Zaloguj się
                                                </MKButton>
                                            </MKTypography>
                                        </Box>}
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

export default VerifyRegistration;
