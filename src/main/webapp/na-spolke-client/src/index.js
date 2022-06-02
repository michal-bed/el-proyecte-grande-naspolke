import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import style from './components/sectionTitle/SectionTitle.css'
import SectionComponent from "./components/sectionComponent/SectionComponent";
import SectionTitle from "./components/sectionTitle/SectionTitle";
import Navbar from './components/Navbar/Navbar.js';

let text1 = "Celem naszej apliakcji jest pomoc w zarządzaniu dokumnetacją koproracyjną niezbędną do prowadzenia spółki."

let text2= 'Jesteśmy małą firmą z wielkimi ambicjami. Stale rozwijamy się aby prowadzenie dokumentacji w twojej firmie ' +
            'było tylko formalnością.'


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

    <div>
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
    </div>)
