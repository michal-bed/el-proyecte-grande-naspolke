import {Box, Container, Grid, Link, Typography} from "@mui/material";
import withStyles from "@material-ui/core/styles/withStyles";


const WhiteTextTypography = withStyles({
    root: {
        color: "#FFFFFF"
    }
})(Typography);

export default function Footer() {
    return <footer>
        <Box px={{ xs: 3, sm: 10 }} py={{ xs: 5, sm: 10 }}  bgcolor="text.secondary">

            <Container maxWidth="lg">
                <Grid container spacing={5}>
                    <Grid item xs={12} sm={4}>
                        <Box borderBottom={1}><WhiteTextTypography>Kontakt</WhiteTextTypography></Box>
                        <Box>
                            <WhiteTextTypography>E-mail:</WhiteTextTypography>
                        </Box>
                        <Box>
                            <WhiteTextTypography>naspolke@gmail.com</WhiteTextTypography>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Box borderBottom={1}><WhiteTextTypography>Informacje</WhiteTextTypography></Box>
                        <Box>
                            <Link href="/#o_nas" color="inherit">
                                <WhiteTextTypography>O nas</WhiteTextTypography>
                            </Link>
                        </Box>
                        <Box>
                            <Link href="/#uslugi">
                                <WhiteTextTypography>Usługi</WhiteTextTypography>
                            </Link>
                        </Box>
                        <Box>
                            <Link href="/faq">
                                <WhiteTextTypography>FAQ</WhiteTextTypography>
                            </Link>
                        </Box>
                    </Grid>
                </Grid>
                <Box textAlign="center" pt={{ xs: 5, sm: 10 }} pb={{ xs: 5, sm: 0 }}>
                    <WhiteTextTypography> Na spółkę &reg; {new Date().getFullYear()}</WhiteTextTypography>
                </Box>
            </Container>

        </Box>
    </footer>
}