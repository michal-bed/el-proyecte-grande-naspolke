import Card from "@mui/material/Card";
import {Voting} from "../voting/Voting";
import {Box} from "@chakra-ui/react";
import Typography from "@mui/material/Typography";


export function MeetingAgenda({values, handleChange}) {
    return  <Card sx={{minWidth: 275, width: '80%', height: '100%', marginBottom:'2%', margin:'auto',
        ':hover': { boxShadow: 20,}}}>
        <Box sx={{minWidth: 275, width: '90%', height: '100%', marginBottom:'2%', margin:'auto'}}>
            <Typography sx={{ fontSize: 26, marginBottom: "8%", marginTop:'4%' }} color="text.secondary" gutterBottom align={"center"}>
                Porządek obrad:
            </Typography>
            <ol>
                <li>otwarcie Zwyczajnego Zgromadzenia;</li>
                <li>wybór Przewodniczącego Zgromadzenia i Protokolanta;</li>
                <li>stwierdzenie prawidłowości zwołania Zgromadzenia;</li>
                <li>podjęcie uchwały w przedmiocie rozpatrzenia i zatwierdzenie sprawozdania finansowego
                    Spółki oraz sprawozdania Zarządu;
                </li>
                {values.amountProfitOrLoss > 0 && <li>podjęcie uchwały w przedmiocie sposobu podziału zysku;</li>}
                {values.amountProfitOrLoss < 0 && <li>podjęcie uchwały w przedmiocie sposobu pokrycia straty;</li>}
                <li>podjęcie uchwały w przedmiocie udzielenia absolutorium organom spółki;</li>
                <li>wolne głosy i wnioski;</li>
                <li>zamknięcie obrad Zgromadzenia;</li>
            </ol>
            <Voting values={values} handleChange={handleChange} votingMatter={"agenda"}
                    votingTitle={"Głosowanie nad przyjęciem porządku obrad"}/>
        </Box>
    </Card>
}