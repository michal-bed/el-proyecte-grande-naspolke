import Card from "@mui/material/Card";
import {Checkbox} from "@material-ui/core";
import {VotingNoUnanimously} from "./VotingNoUnanimously";


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
            <div>
                <p>Głosowanie nad przyjęciem porządku obrad</p>
                <div>
                    <Checkbox aria-label={"jednogłośnie"} name={"agendaUnanimously"} defaultChecked
                              value={values.agendaUnanimously} onChange={handleChange}
                              color="secondary"/>
                </div>
                {values.agendaUnanimously === false &&
                    <VotingNoUnanimously votingType={"agenda"} values={values}/> }
            </div>
        </div>
    </Card>
}