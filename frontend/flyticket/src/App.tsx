import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import MainPage from './pages/MainPage';
import FlightDetailsPage from './pages/FlightDetailsPage';
import LoginForm from './pages/LoginForm';
import RegisterForm from './pages/RegisterForm';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path={"/"} element={<LoginPage />} />
        <Route path={"/MainPage"} element={<MainPage />} />
        <Route path={"/FlightDetailsPage/:id"} element={<FlightDetailsPage />} />
        <Route path={"/LoginForm"} element={<LoginForm />} />
        <Route path={"/RegisterForm"} element={<RegisterForm />}/>
      </Routes>
    </Router>
  );
}

export default App;  