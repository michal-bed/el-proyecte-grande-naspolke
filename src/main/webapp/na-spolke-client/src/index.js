import App from './App';
import { AuthProvider } from './context/AuthProvider';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from "./componentsInUse/login/Login";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
        <React.StrictMode>
            <BrowserRouter>
                <AuthProvider>
                    <Routes>
                        <Route path="/*" element={<App />} />
                        <Route path="/pages/authentication/sign-in" element={<Login />} />
                    </Routes>
                </AuthProvider>
            </BrowserRouter>
        </React.StrictMode>
);

