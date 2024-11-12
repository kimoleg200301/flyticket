// MainPage.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import FlightCard from '../components/FlightCard';
import Header from '../components/Header';
//import flightsData from '../data/flights.json';



const MainPage: React.FC = () => {
  const [stateTabs, UseStateTabs] = useState<number>(0);

  return (
    <>
    <Header username='oleg' role='admin'/>
    <div className='text-[400px] text-[400px] hover:scale-105'>Hello World!</div>
    </>
  );
};

export default MainPage;
