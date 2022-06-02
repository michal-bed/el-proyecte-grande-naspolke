import './App.css';
import Layout from './components/Layout';
import Login from './components/login/Login';
import HelloWorld from "./components/HelloWorld";
import MainPage from "./components/MainPage";
import {Route, Routes} from "react-router-dom";
import Registration from "./components/registration/Registration";


function App() {
    return (
        <Routes>
            <Route path="/" element={<Layout/>}>
                {/* public routes */}
                <Route path="/" element={<MainPage/>}/>
                <Route path="login" element={<Login/>}/>
                <Route path="register" element={<Registration/>}/>
            </Route>
        </Routes>);
}

export default App;
