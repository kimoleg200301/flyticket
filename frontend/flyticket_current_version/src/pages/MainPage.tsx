// MainPage.tsx
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// @ts-ignore
import AOS from 'aos';
import 'aos/dist/aos.css';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import Header from '../components/Header';
import ContentTop from '../components/ContentTop';
import ContentCenter from '../components/ContentCenter';
import TabMain from '../components/tabs/TabMain';
import TabDirection from '../components/tabs/TabDirection';
import TabDirectionDetail from '../components/tabs/TabDirectionDetail';
import TabSettings from '../components/tabs/TabSettings';
//import flightsData from '../data/flights.json';


// назначить цвета
const MainPage: React.FC = () => {
  const [stateTabs, useStateTabs] = useState<number>(0);
  useEffect(() => {
    AOS.init({
      offset: 100,
      duration: 500,
      easing: "ease-in-sine",
      delay: 100,
    });
    AOS.refresh();
  }, []);
  return (
    <>
    <Router>
        <Routes>
          <Route path={'/'} element={<TabMain />} />
          <Route path={'/Direction'} element={<TabDirection />} />
          <Route path={'/DirectionDetail/:id'} element={<TabDirectionDetail />} />
          <Route path={'/Settings'} element={<TabSettings />} />
          <Route path={'/login'} element={<LoginForm />} />
          <Route path={'/register'} element={<RegisterForm />} />
        </Routes>
    </Router>
    </>
  );
};

export default MainPage;
