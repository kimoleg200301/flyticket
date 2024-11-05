// SettingsPage.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import FlightCardSettings from '../components/FlightCardSettings';
import SettingsModal from '../modal/SettingsModal';

interface Flight {
  id: number;
  departure: string;
  arrival: string;
  date: string;
  time: string;
  flightNumber: string;
  seats: {
    economy: number;
    business: number;
    firstClass: number;
  };
}

interface FormData {
  departure: string;
  arrival: string;
  date: string;
  time: string;
  flightNumber: string;
  economy: number;
  business: number;
  firstClass: number;
}

const SettingsPage: React.FC = () => {
  const navigate = useNavigate();
  const [flights, setFlights] = useState<Flight []>([]);
  const [resultSelects, setResultSelects] = useState<Flight []>([]);
  const [addFlight, setAddFlight] = useState<FormData>({
    departure: '',
    arrival: '',
    date: '',
    time: '',
    flightNumber: '',
    economy: parseInt(''),
    business: parseInt(''),
    firstClass: parseInt(''),
  }); // useState для создания нового рейса

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
        setFlights(response.data); // данные уже реально из БД
        console.log(response.data); 
      };
    }
    fetchFlights();
  }, []);

  /* ----- Логика отправки введенных данных на сервер ----- */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAddFlight({ ...addFlight, [name]: value}); 
  }
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
        const response = await axios.post("http://localhost:5000/addFlight", addFlight, {
            withCredentials: true,
        });
        if (response.data.message) { // проверка на наличие токена либо его валидность
          alert(response.data.message);
          return navigate('/LoginForm');
        }
        else {
          if (response.data.success) {
            alert(response.data.success);
            closeModal();
          }
          else {
            alert(response.data.message_error);
          }
        }
    } catch (error) {
        console.error("Ошибка при отправке данных", error);
    }
  }
  /* -------------------- */

  /* ----- Логика отображения модального окна ----- */
  const [isModalOpen, setModalOpen] = useState(false);
  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);
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
  
  useEffect(() => {
    const filteredFlights = flights.filter((flight: Flight) => 
    (selectDeparture ? flight.departure === selectDeparture : true) &&
    (selectArrival ? flight.arrival === selectArrival : true) &&
    (selectDate ? flight.date === selectDate : true)
    );
    setResultSelects(filteredFlights);
  }, [flights, selectDeparture, selectArrival, selectDate]);

  return (
    <>
    <div className="h-550 sm:h-300 p-16 bg-blue-500 shadow-md flex flex-wrap sm:flex-nowrap items-center justify-center">
      <h1 className='mb-2 font-bold text-3xl text-white sm:-translate-x-4 sm:-translate-y-4'>Настраивайте рейсы под Ваш вкус</h1>
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
      <button className='transform transition duration-300 hover:scale-105 h-70 w-350 ml-2 p-2 font-bold sm:-translate-x-4 sm:-translate-y-4 text-xl text-white bg-orange-500 rounded-16' onClick={openModal}>Добавить рейс</button>
    </div>
    <div className='mt-6 mb-6 flex items-center justify-center'>
      {selectDeparture || selectArrival || selectDate ? (
        <h1 className='font-bold text-3xl'>Список найденных рейсов для редактирования</h1>
      ) : (
        <h1 className='font-bold text-3xl'>Список всех доступных рейсов для редактирования</h1>
      )
    }
      
    </div>
    {(selectDeparture || selectArrival || selectDate ? resultSelects : flights).map((flight) => (
      <div className='flex items-center justify-center'>
        <FlightCardSettings key={flight.id} {...flight} />
      </div>
    ))}
    <SettingsModal isOpen={isModalOpen} onClose={closeModal}>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="block text-sm font-medium text-gray-700">Откуда</label>
          <input
            type="text"
            name="departure"
            onChange={handleChange}
            className="h-10 mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Куда</label>
          <input
            type="text"
            name="arrival"
            onChange={handleChange}
            className="h-10 mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Дата вылета</label>
          <input
            type="date"
            name="date"
            onChange={handleChange}
            className="h-10 mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Время вылета</label>
          <input
            type="time"
            name="time"
            onChange={handleChange}
            className="h-10 mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Номер рейса</label>
          <input
            type="text"
            name="flightNumber"
            onChange={handleChange}
            className="h-10 mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Номер места в эконом классе</label>
          <input
            type="text"
            name="economy"
            onChange={handleChange}
            className="h-10 mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Номер места в бизнес классе</label>
          <input
            type="text"
            name="business"
            onChange={handleChange}
            className="h-10 mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Номер места в первом классе</label>
          <input
            type="text"
            name="firstClass"
            onChange={handleChange}
            className="h-10 mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
          />
        </div>
        <button type="submit" className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-semibold py-2 px-6 rounded-lg shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-indigo-300">Создать рейс</button>
      </form>
    </SettingsModal>
    </>
  );
};

export default SettingsPage;