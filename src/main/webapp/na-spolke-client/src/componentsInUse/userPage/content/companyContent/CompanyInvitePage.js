import {Box, Card, CardHeader, Typography} from "@material-ui/core";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import {getCompanyById} from "../../handlers/CompanyDataHandler";
import useAxiosPrivate from "../../../../hooks/useAxiosPrivate";
import {Grid, TextField} from "@mui/material";
import React, {useState} from "react";
import Button from "@mui/material/Button";
import ModalTop from "../../../modal/ModalTop";
import RequestForMembership from "../../../requestToCompany/RequestForMembership";

function CompanyInvitePage () {

    const successfullyInvitationMessage = {
        title: "Wysłano zaproszenie",
        text: "Użytkownik o podanym przez Ciebie adresie e-mail otrzymał zaproszenie do spółki."
    }

    const failedInvitationMessage = {
        title: "Coś poszło nie tak",
        text: "Nie udało się wysłać zaproszenia do wskazanego przez Ciebie użytkownika."
    }

    function handleStatusChange() {
        setMessageText(messageText = "Zostałeś zaproszony do spółki przez użytkownika o podanym adresie email");
    }

    const [successInvitationInfo, setSuccessInvitationInfo] = useState(false);
    const [failedInvitationInfo, setFailedInvitationInfo] = useState(false);
    const backToPreviousState = () => {
        setSuccessInvitationInfo(false);
        setFailedInvitationInfo(false);
    }

    const axiosPrivate = useAxiosPrivate();
    let {companyId} = useParams();
    let company = getCompanyById(companyId);
    let [messageText, setMessageText] = useState("");
    const [emailAddress, setEmailAddress] = useState("");

    const titleCardStyle = {
        marginLeft: "25%",
        marginRight: "25%",
        minWidth: "300px",
        marginTop: "30px",
        marginBottom: "80px"
    };

    const infoCardStyle = {
        width: "500px",
        height: "auto",
        minWidth: "500px",
        marginLeft: "3%",
        marginRight: "3%",
        marginBottom: "5%",
        padding: "15px",
        paddingBottom: "40px"
    };

    const gridStyle = {
        align: "center",
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        marginLeft: "auto",
        marginRight: "auto",
        width: 400,
        mx: "auto"
    }

    const inputStyle = {
        marginLeft: "120px",
        align:'center'
    }

    const formStyle = {
        textAlign: "center",
        marginLeft: "60px",
        width: 500,
        mx: "auto"
    }

    // const location = useLocation();
    // const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        handleStatusChange();
        const data = {companyId, emailAddress, messageText};
        axiosPrivate.post('/send-invitation-to-company', data)
            .then(response => {
                if(response.status === 200) {
                    console.log("wysłano");
                    setSuccessInvitationInfo(true);
                    setTimeout(backToPreviousState, 4000);
                    // navigate(location.pathname + "/success");
                }
            }).catch((error) => {
            console.log(error);
            setFailedInvitationInfo(true);
            setTimeout(backToPreviousState, 4000);
            // navigate(location.pathname + "/fail");
        })
    }

    return(
        <>
            <Card style={{ height: '10vh' }}>
                <Box sx={{ mx: "auto", width: 400 }}>
                    <Typography
                        variant="h3" component="div"
                        style={{ textAlign: 'center' }}>Zaproś do spółki</Typography><br/>
                </Box>
            </Card><br/>
            <Card style={{ height: 300 }}>
                <Box sx={{ mx: "auto", width: 400 }}>
                    <Typography variant="h3" component="div"><hr/>
                        <h2 style={{ textAlign: 'center' }}>Wpisz e-mail użytkownika:</h2><hr/>
                        <form onSubmit={handleSubmit}>
                            <Grid style={gridStyle}>
                                <TextField id="outlined-search" label="Adres e-mail" type="search"
                                           className="form-input" value={emailAddress} required={true}
                                           style={{ alignItems: 'center' }}
                                           onChange={(e) => setEmailAddress(e.target.value)}/>
                                <Button type="submit">Wyślij zaproszenie</Button>
                            </Grid>
                        </form><hr/>
                    </Typography>
                </Box>
            </Card>
            {successInvitationInfo && <ModalTop info={successfullyInvitationMessage}/>}
            {failedInvitationInfo && <ModalTop info={failedInvitationMessage}/>}

            {/*<Card style={titleCardStyle}>*/}
            {/*<Card style={{ height: '10vh' }}>*/}
            {/*    <Typography variant="h2" align="center">*/}
            {/*        <Typography variant="h3" component="div">Zaproś do spółki</Typography><br/>*/}
            {/*    </Typography>*/}
            {/*</Card><br/>*/}
            {/*<Card style={{ height: '30vh' }}>*/}
            {/*    <Box sx={{ mx: "auto", height: '40vh' }}><hr/>*/}
            {/*        <h2 style={{ textAlign: 'center' }}>Wpisz e-mail użytkownika:</h2><hr/>*/}
            {/*        <form onSubmit={handleSubmit}>*/}
            {/*            <Grid style={{display: "flex", alignContent: 'center'}}>*/}
            {/*                <TextField id="outlined-search" label="Adres e-mail" type="search"*/}
            {/*                    className="form-input" value={emailAddress} required={true}*/}
            {/*                    onChange={(e) => setEmailAddress(e.target.value)}/>*/}
            {/*                <Button type="submit">Wyślij zaproszenie</Button>*/}
            {/*            </Grid>*/}
            {/*        </form><hr/>*/}
            {/*    </Box>*/}
            {/*</Card>*/}
            {/*{successInvitationInfo && <ModalTop info={successfullyInvitationMessage}/>}*/}
            {/*{failedInvitationInfo && <ModalTop info={failedInvitationMessage}/>}*/}
        </>
    )
}

export default CompanyInvitePage;
