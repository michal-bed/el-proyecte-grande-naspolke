import {Link} from "react-router-dom";
import Navbar from "./Navbar/Navbar";
import style from "./sectionTitle/SectionTitle.css";
import SectionTitle from "./sectionTitle/SectionTitle";
import SectionComponent from "./sectionComponent/SectionComponent";

export default function MainPage() {
    let text1 = "Celem naszej apliakcji jest pomoc w zarządzaniu dokumnetacją koproracyjną niezbędną do prowadzenia spółki."

    let text2= 'Jesteśmy małą firmą z wielkimi ambicjami. Stale rozwijamy się aby prowadzenie dokumentacji w twojej firmie ' +
        'było tylko formalnością.'

    return (<div>
        <Navbar />
        <div className={style.aloneTitle}>
            <SectionTitle title= 'Jedna aplikacja do zarządzania
                          dokumentacją w Twojej spółce' />
        </div>
        <SectionComponent text={text1}
                          id={'uslugi'}
                          title='Usługi'
                          position="positionR"
                          imagePath="./images/index_photo1.jpg" />

        <SectionComponent text={text2}
                          id={'o_nas'}
                          title='O nas'
                          position='positionL'
                          imagePath="./images/index_photo2.jpg" />
    </div>);
}