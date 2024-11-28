import MainPage from './pages/MainPage';
import AuthPage from './pages/AuthPage';
import SettingsPage from './pages/SettingsPage';
import FlightDetailsPage from './pages/FlightDetailsPage';
import LoginForm from './pages/LoginForm';
import RegisterForm from './pages/RegisterForm';
import './input.css';

const App: React.FC = () => {


  return (
    // <Router>
    //   <Routes>
    //     <Route path={"/"} element={<MainPage />} />
    //     <Route path={"/SettingsPage"} element={<SettingsPage />} />
    //     <Route path={"/FlightDetailsPage/:id"} element={<FlightDetailsPage />} />
    //     <Route path={"/LoginForm"} element={<LoginForm />} />
    //     <Route path={"/RegisterForm"} element={<RegisterForm />}/>
    //   </Routes>
    // </Router>
    <>
    <MainPage />
    </>
  );
}

export default App;  