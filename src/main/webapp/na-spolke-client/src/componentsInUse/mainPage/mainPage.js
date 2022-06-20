import Navbar from "../Navbar/Navbar";
import style from "../sectionTitle/SectionTitle.css";
import SectionTitle from "../sectionTitle/SectionTitle";
import SectionComponent from "../sectionComponent/SectionComponent";
import { SectionComponentStyle } from "../sectionComponent/SectionComponentStyle";
import React from "react";
import Grid from "@mui/material/Grid"

import Divider from "@mui/material/Divider"

import index_photo1 from "../../assets/photos/index_photo1.jpg"
import index_photo2 from "../../assets/photos/index_photo2.jpg"
import { Box } from "@mui/material";

import KitComponentSection from "../kitComponentSection/KitComponentSection"

let text1 = "Celem naszej apliakcji jest pomoc w zarządzaniu dokumnetacją koproracyjną niezbędną do prowadzenia spółki."

let text2= 'Jesteśmy małą firmą z wielkimi ambicjami. Stale rozwijamy się aby prowadzenie dokumentacji w twojej firmie ' +
    'było tylko formalnością.'

const MainPage = ()=> {
  return<>
      
        <Grid container >
      <Box sx={SectionComponentStyle.titleHolder}>
          <SectionTitle title= 'Jedna aplikacja do zarządzania dokumentacją w Twojej spółce' />
      </Box>
      
      <Grid item xs={12}>
        <KitComponentSection textContent={text1}
                        id={'uslugi'}
                        title='Nasze usługi'
                        position="positionL"
                        photoPath={index_photo1} />


      </Grid>
      <Divider />
      <Grid item xs={12}>
      <KitComponentSection textContent={text2}
                        id={'o_nas'}
                        title='O nas'
                        position="positionR"
                        photoPath={index_photo2} />

        </Grid>
        <Divider />
        </Grid>
      </>
      
  
}

export default MainPage;