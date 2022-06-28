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
            <WhiteTextTypography>
            <Container maxWidth="lg">
                <Grid container spacing={5}>
                    <Grid item xs={12} sm={4}>
                        <Box color='white' borderBottom={1}>Kontakt</Box>
                        <Box>
                            E-mail:
                        </Box>
                        <Box>
                            naspolke@gmail.com
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Box color='white' borderBottom={1}>Informacje</Box>
                        <Box>
                            <Link href="/#o_nas" color="inherit">
                                O nas
                            </Link>
                        </Box>
                        <Box>
                            <Link href="/#uslugi">
                                Usługi
                            </Link>
                        </Box>
                        <Box>
                            <Link href="/faq">
                                FAQ
                            </Link>
                        </Box>
                    </Grid>
                </Grid>
                <Box textAlign="center" pt={{ xs: 5, sm: 10 }} pb={{ xs: 5, sm: 0 }}>
                    Na spółkę &reg; {new Date().getFullYear()}
                </Box>
            </Container>
            </WhiteTextTypography>
        </Box>
    </footer>
}