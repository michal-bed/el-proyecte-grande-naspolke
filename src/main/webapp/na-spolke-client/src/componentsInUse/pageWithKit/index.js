// @mui material components
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Kit 2 React components
import MKBox from "../../mkFiles/components/MKBox";
import MKTypography from "../../mkFiles/components/MKTypography";
import MKSocialButton from "../../mkFiles/components/MKSocialButton";

// Material Kit 2 React examples
import DefaultNavbar from "../indexNavbar/WorkingNavbar";


import MainPage from "../mainPage/mainPage";
import FaqPage from "../faqPage/FaqPage";
import Footer from "../footer/Footer";
import Statute from "../statute/Statute"

// Routes
import Routes from "../../routes";

// Images
import index_photo3 from "../../assets/photos/index_photo3.jpg";


function Presentation(props) {
    const route = Routes()
    let title = "Na Spółkę"
    let titleDescription = "Ta aplikacja jest projektem końcowym studnetów\n" +
                            " codecool."

    const currentSite = props.site;

    function setContent() {

        switch (currentSite){
            case "index":
                return(<MainPage />)

            case "faq":
                title = "Frequently Asked Questions"
                titleDescription = "Zebraliśmy najczęściej pojawiające się pytania i " +
                    "postaraliśmy się w jak najlepszy sposób na nie odpowiedzieć."
                return(<FaqPage />)
            case "statute":
                title = "Regulamin strony"
                titleDescription = "Regulamin korzystania ze strony i oferowanych usług"
                return (<Statute />)
        }
    }

    const component = setContent()

  return (
    <>
        <MKBox>
      <DefaultNavbar
        routes={route}
        sticky
      />
      <MKBox
        minHeight="75vh"
        width="100%"
        sx={{
          backgroundImage: `url(${index_photo3})`,
          backgroundSize: "cover",
          backgroundPosition: "top",
          display: "grid",
          placeItems: "center",
        }}
      >
        <Container>
          <Grid container item xs={12} lg={7} justifyContent="center" mx="auto">
            <MKTypography
              variant="h1"
              color="white"
              mt={-6}
              mb={1}
              sx={({ breakpoints, typography: { size } }) => ({
                [breakpoints.down("md")]: {
                  fontSize: size["3xl"],
                },
              })}
            >
                {title}
            </MKTypography>
            <MKTypography
              variant="body1"
              color="white"
              textAlign="center"
              px={{ xs: 6, lg: 12 }}
              mt={1}
            >
                {titleDescription}
            </MKTypography>
          </Grid>
        </Container>
      </MKBox>
      <Card
        sx={{
          p: 2,
          mx: { xs: 2, lg: 3 },
          mt: -8,
          mb: 4,
          backgroundColor: ({ palette: { white }, functions: { rgba } }) => rgba(white.main, 0.8),
          backdropFilter: "saturate(200%) blur(30px)",
          boxShadow: ({ boxShadows: { xxl } }) => xxl,
        }}
      >
          {component}

      </Card>
        <Footer/>
        </MKBox>
    </>
  );
}

export default Presentation;
