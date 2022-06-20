// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import './index.css';
// import style from './components/sectionTitle/SectionTitle.css'
// import SectionComponent from "./components/sectionComponent/SectionComponent";
// import SectionTitle from "./components/sectionTitle/SectionTitle";
// import Navbar from './components/Navbar/Navbar.js';
// import App from "./App";
// import {BrowserRouter} from "react-router-dom";
// import {AuthProvider} from "./context/AuthProvider";
//
// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(<App />);

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Login from "./componentsInUse/login/Login"
import { AuthProvider } from './context/AuthProvider';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Registration from "./componentsInUse/registration/Registration";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
        <React.StrictMode>
            <BrowserRouter>
                <AuthProvider>
                    <Routes>
                        <Route path="/*" element={<App />} />
                        <Route path="/log-in" element={<Login />} />
                        <Route path="/registration" element={<Registration />} />
                    </Routes>
                </AuthProvider>
            </BrowserRouter>
        </React.StrictMode>

);

