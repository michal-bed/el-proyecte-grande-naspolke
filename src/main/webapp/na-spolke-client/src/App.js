import logo from './logo.svg';
import './App.css';
import Layout from './components/Layout';
import Login from './components/Login';
import HelloWorld from "./components/HelloWorld";
import {Route, Routes} from "react-router-dom";


function App() {
  return (
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* public routes */}
            <Route path="/" element={<HelloWorld />} />
            <Route path="login" element={<Login />} />
        </Route>
      </Routes>
  );
}

export default App;
