import Card from "@mui/material/Card";
import {Voting} from "../voting/Voting";


export function MeetingAgenda({values, handleChange}) {
    return  <Card>
        <div><p>Porządek obrad:</p>
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
        </div>
    </Card>
}