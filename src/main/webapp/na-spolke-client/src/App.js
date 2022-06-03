import './App.css';
import Registration from "./components/registration/Registration";
import AddCompany from "./components/addCompany/AddCompany";
import MainPage from "./components/mainPage/mainPage";

function App() {
  return (
    <div className="App">
        <MainPage/>
        <Registration />
        <AddCompany/>
    </div>
  );
}

export default App;
