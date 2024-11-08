// MainPage.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import FlightCard from '../components/FlightCard';
import Header from '../components/Header';
//import flightsData from '../data/flights.json';

interface Flights {
  id: number;
  departure: string;
  arrival: string;
  date: string;
  time: string;
  flightNumber: string;
  economy: number;
  business: number;
  firstClass: number;
}
interface Token {
  username: string;
  role: string;
}

const MainPage: React.FC = () => {
  const navigate = useNavigate();
  const [flights, setFlights] = useState<Flights []>([]);
  const [token, setToken] = useState<Token>({
    username: '',
    role: '',
  });
  const [resultSelects, setResultSelects] = useState<Flights []>([]);

  /* ----- Обработчики от селект ----- */
  const [selectDeparture, setSelectDeparture] = useState<string>('');
  const [selectArrival, setSelectArrival] = useState<string>('');
  const [selectDate, setSelectDate] = useState<string>('');

  const handleChangeDeparture = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectDeparture(event.target.value);
  }
  const handleChangeArrival = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectArrival(event.target.value);
  }
  const handleChangeDate = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectDate(event.target.value);
  }
  /* -------------------- */

  const settings = (event: React.MouseEvent<HTMLButtonElement>) => {
    navigate('/SettingsPage');
  }

  useEffect(() => {
    const fetchFlights = async () => {
      const response = await axios.post('http://localhost:5000/', '', {
        withCredentials: true,
      });
      if (response.data.message) { // проверка на наличие токена либо его валидность
        alert(response.data.message);
        return navigate('/LoginForm');
      }
      else {
        setFlights(response.data.data); // данные уже реально из БД
        setToken({
          username: response.data.username,
          role: response.data.role,
        });
        console.log(response.data); 
      };
    //setFlights(flightsData); // данные якобы берутся из сервера
    //console.log(flights);
    }
    fetchFlights();
  }, []);
  
  useEffect(() => {
    const filteredFlights = flights.filter((flight: Flights) => 
    (selectDeparture ? flight.departure === selectDeparture : true) &&
    (selectArrival ? flight.arrival === selectArrival : true) &&
    (selectDate ? flight.date === selectDate : true)
    );
    setResultSelects(filteredFlights);
  }, [flights, selectDeparture, selectArrival, selectDate]);

  return (
    <>
    <Header username={token.username} role={token.role} />
    <div className="h-550 mt-50 sm:h-175 p-16 bg-blue-500 shadow-md flex flex-wrap sm:flex-nowrap items-center justify-center">
      <h1 className='mb-2 font-bold text-3xl text-white sm:-translate-x-4 sm:-translate-y-4'>Выбирайте нужный рейс под Ваш вкус</h1>
      <select id="point_of_departure" onChange={handleChangeDeparture} className="h-70 w-350 font-bold sm:-translate-x-4 sm:-translate-y-4 bg-white border border-gray-300 rounded-16 sm:rounded-tr-none sm:rounded-br-none p-2">
        <option value="">Откуда</option>
        {flights.map((departure_) => (
          <>
          <option key={departure_.id} value={departure_.departure}>{departure_.departure}</option>
          </>
        )
        )}
      </select>
      <select id="point_of_arrival" onChange={handleChangeArrival} className="h-70 w-350 font-bold sm:-translate-x-4 sm:-translate-y-4 bg-white border border-gray-300 rounded-16 sm:rounded-tl-none sm:rounded-bl-none p-2">
        <option value="">Куда</option>
        {flights.map((arrival_) => (
          <>
          <option key={arrival_.id} value={arrival_.arrival}>{arrival_.arrival}</option>
          </>
        )
        )}
      </select>
      <select id="date_of_dispatch" onChange={handleChangeDate} className="h-70 w-350 font-bold sm:-translate-x-4 sm:-translate-y-4 bg-white border border-gray-300 rounded-16 sm:rounded-tr-none sm:rounded-br-none p-2">
        <option value="">Когда</option>
        {flights.map((date_) => (
          <>
          <option key={date_.id} value={date_.date}>{date_.date}</option>
          </>
        )
        )}
      </select>
      <select id="date_of_departure" className="h-70 w-350 font-bold sm:-translate-x-4 sm:-translate-y-4 bg-white border border-gray-300 rounded-16 sm:rounded-tl-none sm:rounded-bl-none p-2">
        <option value="">Обратно</option>
        <option value="option1">Опция 1</option>
        <option value="option2">Опция 2</option>
        <option value="option3">Опция 3</option>
      </select>
      <button className='transform transition duration-300 hover:scale-105 h-70 w-350 ml-2 p-2 font-bold sm:-translate-x-4 sm:-translate-y-4 text-xl text-white bg-orange-500 rounded-16'>Найти рейс</button>
    </div>
    <div className='mt-6 mb-6 flex items-center justify-center'>
      <button className='transform transition duration-300 hover:scale-105 h-70 w-350 ml-2 p-2 font-bold sm:-translate-x-4 sm:-translate-y-4 text-xl text-white bg-orange-500 rounded-16' onClick={settings}>Настройки рейсов</button>
    </div>
    <div className='mt-6 mb-6 flex items-center justify-center'>
      {selectDeparture || selectArrival || selectDate ? (
        <h1 className='font-bold text-3xl text-customBlue'>Список найденных рейсов</h1>
      ) : (
        <h1 className='font-bold text-3xl'>Список всех доступных рейсов</h1>
      )
    }
      
    </div>
    {(selectDeparture || selectArrival || selectDate ? resultSelects : flights).map((flight) => (
          <div className='flex items-center justify-center'>
            <FlightCard key={flight.id} {...flight} />
          </div>
        ))}
    </>
  );
};

export default MainPage;
