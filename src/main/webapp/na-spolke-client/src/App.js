import './App.css';

import Layout from './componentsInUse/Layout';
import Login from './componentsInUse/login/Login';
import Registration from "./componentsInUse/registration/Registration"

import Presentation from "./componentsInUse/pageWithKit"
import {Route, Routes} from "react-router-dom";
import Registration from "./componentsInUse/registration/Registration";
import {CssBaseline, ThemeProvider} from "@mui/material";
import theme from "./assets/theme";

function App() {

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <Routes>
                <Route path="/" element={<Layout/>}>
                    {/* public routes */}
                    <Route path="/" element={<Presentation/>}/>
                    <Route path="login" element={<Login/>}/>
                    <Route path="register" element={<Registration/>}/>
                </Route>
            </Routes>
        </ThemeProvider>);
}

export default App;

