import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import FlightCard from "../FlightCard";

import Header from "../Header";
import ContentTop from "../ContentTop";

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
  right: boolean;
}

const TabDirection: React.FC = () => {
  const navigate = useNavigate();
  const onPage = 'MainPage';
  const [flights, setFlights] = useState<Flights []>([{
    id: 0,
    departure: '',
    arrival: '',
    date: '',
    time: '',
    flightNumber: '',
    economy: 0,
    business: 0,
    firstClass: 0,
  }],
);
  const [token, setToken] = useState<Token>({
    username: '',
    role: '',
    right: false,
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
      const response = await axios.post('http://localhost:5000/', onPage, {
        withCredentials: true,
      });
      if (response.data.message) { // проверка на наличие токена либо его валидность
        alert(response.data.message);
        return navigate('/login');
      }
      else {
        setFlights(response.data.data); // данные уже реально из БД
        setToken({
          username: response.data.username,
          role: response.data.role,
          right: response.data.right,
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
    <Header username='oleg' role='admin'/>
      <div className='mt-[60px]'>
        <ContentTop tab={'TabDirection'} />
          <div className="pl-[100px] pr-[100px] text-center flex flex-col items-center justify-between space-y-4"> {/* начало */}
            <select id="point_of_departure" onChange={handleChangeDeparture} className="h-[60px] w-350 font-bold text-center sm:-translate-x-4 sm:-translate-y-4 bg-white border border-gray-300 rounded-16 p-2">
              <option value="">Откуда</option>
              {flights.map((departure_) => (
                <>
                <option key={departure_.id} value={departure_.departure}>{departure_.departure}</option>
                </>
              )
              )}
            </select>
            <select id="point_of_arrival" onChange={handleChangeArrival} className="h-[60px] w-350 font-bold text-center sm:-translate-x-4 sm:-translate-y-4 bg-white border border-gray-300 rounded-16 p-2">
              <option value="">Куда</option>
              {flights.map((arrival_) => (
                <>
                <option key={arrival_.id} value={arrival_.arrival}>{arrival_.arrival}</option>
                </>
              )
              )}
            </select>
            <select id="date_of_dispatch" onChange={handleChangeDate} className="h-[60px] w-350 font-bold text-center sm:-translate-x-4 sm:-translate-y-4 bg-white border border-gray-300 rounded-16 p-2">
              <option value="">Когда</option>
              {flights.map((date_) => (
                <>
                <option key={date_.id} value={date_.date}>{date_.date}</option>
                </>
              )
              )}
            </select>
            <div className='mt-6 mb-6 flex items-center justify-center'>
            {selectDeparture || selectArrival || selectDate ? (
              <h1 className='font-bold text-3xl text-customBlue'>Список найденных рейсов</h1>
            ) : (
              <h1 className='font-bold text-3xl text-customBlue'>Список всех доступных рейсов</h1>
            )
          }
            
          </div>
          {(selectDeparture || selectArrival || selectDate ? resultSelects : flights).map((flight) => (
                <div className='flex items-center justify-center'>
                  <FlightCard key={flight.id} {...flight} />
                </div>
              ))}
              
          </div>
      </div>
    </>
  );
}

export default TabDirection;