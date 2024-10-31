import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import MainPage from './pages/MainPage';
import FlightDetailsPage from './pages/FlightDetailsPage';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path={"/"} element={<LoginPage />} />
        <Route path={"/MainPage"} element={<MainPage />} />
        <Route path={"/FlightDetailsPage"} element={<FlightDetailsPage id={5} />} />
      </Routes>
    </Router>
  );
}

export default App;  