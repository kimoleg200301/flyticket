import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useResolvedPath } from 'react-router-dom';
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

interface SortedDeparture {
  id: number;
  departure: string;
}

interface SortedArrival {
  id: number;
  arrival: string;
}

interface SortedDate {
  id: number;
  date: string;
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
  /* ----- Хранит выбранные в фильтрах объекты ----- */
  const [resultSelects, setResultSelects] = useState<Flights []>([]);
  /* -------------------- */

  const [flagToStart, setFlagToStart] = useState(false);

  /* ----- Хранилища сортированных данных для вывода option ----- */
  const [sortedDeparture, setSortedDeparture] = useState<SortedDeparture []>([]);
  const [sortedArrival, setSortedArrival] = useState<SortedArrival []>([]); 
  const [sortedDate, setSortedDate] = useState<SortedDate []>([]);
  /* -------------------- */

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

  useEffect(() => { // useEffect который имеет api
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
  
  useEffect(() => { // useEffect для фильтрации значений фильтров при получении значений в массив flights
    /* ----- departure ----- */
    const departureWithKeys = flights.map((flight) => ({
      id: flight.id,
      departure: flight.departure
    }));
    const filtringDeparture = departureWithKeys.filter((departure, index, self) => {
      return index === self.findIndex((p) => p.departure === departure.departure)
    });
    /* --------------------- */
    /* ----- arrival ----- */
    const arrivalWithKeys = flights.map((flight) => ({
      id: flight.id,
      arrival: flight.arrival
    }));
    const filtringArrival = arrivalWithKeys.filter((arrival, index, self) => {
      return index === self.findIndex((p) => p.arrival === arrival.arrival)
    });
    /* --------------------- */
    /* ----- date ----- */
    const dateWithKeys = flights.map((flight) => ({
      id: flight.id,
      date: flight.date
    }));
    const filtringDate = dateWithKeys.filter((date, index, self) => {
      return index === self.findIndex((p) => p.date === date.date)
    });
    /* ----- накладываем в setState ----- */
    setSortedDeparture(filtringDeparture);
    setSortedArrival(filtringArrival);
    setSortedDate(filtringDate);
    /* --------------------- */
  }, [flights, flagToStart]);
  
  useEffect(() => { /* ----- useEffect для вывода нужных карточек в зависимости от выбранных значений в фильтрах ----- */ 
    const filteredFlights = flights.filter((flight: Flights) => {
      const matchesDeparture = selectDeparture ? flight.departure === selectDeparture : true;
      const matchesArrival = selectArrival ? flight.arrival === selectArrival : true;
      const matchesDate = selectDate ? flight.date === selectDate : true;
      if (selectDeparture && matchesDeparture) {
        setFlagToStart(true);

      }
      if (selectArrival && matchesArrival) {
        // sortedArrival.filter((flight: SortedArrival) => flight.arrival !== selectArrival);
        if (selectArrival !== null) {
          setSortedDeparture(sortedDeparture.filter((flight: SortedDeparture) => sortedDeparture.some((arrival) => arrival.id !== flight.id)));
          setSortedDate(sortedDate.filter((flight: SortedDate) => sortedDate.some((date) => date.id !== flight.id)));
        }
        else {
          setFlagToStart(false);
        }
      }
      if (selectDate && matchesDate) {
        // sortedDate.filter((flight: SortedDate) => flight.date !== selectDate);
      }
      return matchesDeparture && matchesArrival && matchesDate;
    });
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
              {sortedDeparture.map((departure_) => (
                <>
                <option key={departure_.id} value={departure_.departure}>{departure_.departure}</option>
                </>
              )
              )}
            </select>
            <select id="point_of_arrival" onChange={handleChangeArrival} className="h-[60px] w-350 font-bold text-center sm:-translate-x-4 sm:-translate-y-4 bg-white border border-gray-300 rounded-16 p-2">
              <option value="">Куда</option>
              {sortedArrival.map((arrival_) => (
                <>
                <option key={arrival_.id} value={arrival_.arrival}>{arrival_.arrival}</option>
                </>
              )
              )}
            </select>
            <select id="date_of_dispatch" onChange={handleChangeDate} className="h-[60px] w-350 font-bold text-center sm:-translate-x-4 sm:-translate-y-4 bg-white border border-gray-300 rounded-16 p-2">
              <option value="">Когда</option>
              {sortedDate.map((date_) => (
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