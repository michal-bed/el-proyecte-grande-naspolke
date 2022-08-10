
import { SectionComponentStyle } from "../sectionComponent/SectionComponentStyle";
import { Box, Grid, Divider } from "@mui/material";

import index_photo1 from "../../../assets/photos/index_photo1.jpg"
import index_photo2 from "../../../assets/photos/index_photo2.jpg"
import index_photo4 from "../../../assets/photos/index_photo4.jpg"
import index_photo5 from "../../../assets/photos/index_photo5.jpg"

import KitComponentSection from "../kitComponentSection/KitComponentSection"
import SectionTitle from "../sectionTitle/SectionTitle";
import PricingComponentSection from "../pricing/PricingComponentSection"


let text1 = "Celem naszej apliakcji jest pomoc w zarządzaniu dokumnetacją koproracyjną niezbędną do prowadzenia spółki " +
    "oraz pomoc w efektywnym organizowaniu wydarzeń z nią związanych."


let text2= 'Jesteśmy małą firmą z wielkimi ambicjami. Stale rozwijamy się aby prowadzenie dokumentacji w twojej firmie ' +
    'było tylko formalnością.'

let text3= "Nasze kompleksowe rozwiązanie biznesowe kierujemy zarówno dla spółek każdej wielkośći jak i kancelarii prawnych."

let pricingDescription = "Przygotowaliśmy oferty cenowe naszej usługi skrojone pod każdą kieszeń i " +
    "potrzeby naszych klientów."

const MainPage = ()=> {
    return<>
        <Grid container >
            <Box sx={SectionComponentStyle.titleHolder}>
                <SectionTitle title= 'Jedna aplikacja do zarządzania dokumentacją w Twojej spółce' />
            </Box>

            <Grid item xs={12} id="uslugi">
                <KitComponentSection textContent={text1}
                                     id={'uslugi'}
                                     title='Nasze usługi'
                                     position="positionL"
                                     photoPath={index_photo1} />

            </Grid>
            <Grid item xs={12}>
                <Divider  />
            </Grid>
                <Grid item xs={12} id="o_nas">
                    <KitComponentSection textContent={text2}
                                         id={'o_nas'}
                                         title='O nas'
                                         position="positionR"
                                         photoPath={index_photo2} />

            </Grid>
            <Grid item xs={12}>
                <Divider  />
            </Grid>
            <Grid item xs={12} id="oferta">
                <KitComponentSection textContent={text3}
                                     id={'oferta'}
                                     title='Oferta'
                                     position="positionL"
                                     photoPath={index_photo4} />

            </Grid>
            <Grid item xs={12}>
                <Divider  />
            </Grid>
            <PricingComponentSection textContent={pricingDescription} photoPath={index_photo5}/>
        </Grid>
    </>


}

export default MainPage;