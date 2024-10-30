import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import MainPage from './pages/MainPage';
import FlightDetailsPage from './pages/FlightDetailsPage';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/MainPage" element={<MainPage />} />
        <Route path="/FlightDetailsPage" element={<FlightDetailsPage departure="Нурсултан-Назарбаев" arrival="Санкт-Петербург" username="Тажи Нурдаулет" date="2023-11-10" flightNumber="A1 234" seats={{economy: 0, business: 1, firstClass: 0}} />} />
      </Routes>
    </Router>
  );
}

export default App;  