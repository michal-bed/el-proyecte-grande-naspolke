import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import style from './components/sectionTitle/SectionTitle.css'
import SectionComponent from "./components/sectionComponent/SectionComponent";
import SectionTitle from "./components/sectionTitle/SectionTitle";
import Navbar from './components/Navbar/Navbar.js';
import App from "./App";
import {BrowserRouter} from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
        <App/>
    </BrowserRouter>
)
