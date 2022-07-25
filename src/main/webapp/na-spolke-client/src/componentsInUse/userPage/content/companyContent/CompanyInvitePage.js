import {Box, Button, Card, CardHeader, Typography} from "@material-ui/core";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import {getCompanyById} from "../../handlers/CompanyDataHandler";


function CompanyInvitePage () {

    let {companyId} = useParams();

    let company = getCompanyById(companyId);

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
        marginRight: "auto"
    }

    const inputStyle = {
        marginLeft: "5px",
    }

    const formStyle = {
        textAlign: "center"
    }

    function checkIfEmailSent() {
        return true;
    }

    const location = useLocation();
    const navigate = useNavigate();

    function handleSubmit (e) {
        let checkEmailSent = checkIfEmailSent();
        if (checkEmailSent === true) {
            console.log("wysłano");
            navigate(location.pathname + "/success");
        } else if (checkEmailSent === false) {
            console.log("coś poszło nie tak");
            console.log(e)
            navigate(location.pathname + "/fail");
        }
    }

    return(
        <>
            <Card style={titleCardStyle}>
                <Typography variant="h2" align="center">
                    {company['companyName']}<br />
                </Typography>
            </Card>

            <Box style={gridStyle}>
                <Card style={infoCardStyle}>
                    <CardHeader
                        title="Zaproś do Spółki"
                        titleTypographyProps={{align:'center'}}
                    />
                    <form style={formStyle} onSubmit={handleSubmit}>
                        <label for="email">Adres E-Mail:   </label>
                        <input type="text" id="email" style={inputStyle} /><br /><br /><br />
                        <Button variant="contained" type="submit">Wyślij zaproszenie</Button>
                    </form>
                </Card>
            </Box>
        </>
    )
}

export default CompanyInvitePage;