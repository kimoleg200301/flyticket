import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import FlightCardSettings from '../FlightCardSettings';
import SettingsModal from '../../modal/SettingsModal';
import Header from "../Header";
import ContentTop from "../ContentTop";

interface Flight {
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

interface FormData {
  id: number;
  isDelete: boolean;
  departure: string;
  arrival: string;
  date: string;
  time: string;
  flightNumber: string;
  economy: number;
  business: number;
  firstClass: number;
}

const TabSettings: React.FC = () => {
  const navigate = useNavigate();
  const onPage = {page: 'SettingsPage'};
  const [flights, setFlights] = useState<Flight []>([{
    id: 0,
    departure: '',
    arrival: '',
    date: '',
    time: '',
    flightNumber: '',
    economy: 0,
    business: 0,
    firstClass: 0,
  }]);
  const [token, setToken] = useState<Token>({
    username: '',
    role: '',
    right: false,
  });
  const [resultSelects, setResultSelects] = useState<Flight []>([]);
  const [selectedFlightId, setSelectedFlightId] = useState<number | null>(null); // чекаем id нажатого блока
  const [addFlight, setAddFlight] = useState<FormData>({
    id: selectedFlightId ?? 0,
    isDelete: false,
    departure: '',
    arrival: '',
    date: '',
    time: '',
    flightNumber: '',
    economy: 0,
    business: 0,
    firstClass: 0,
  }); // useState для создания нового рейса
  const [isUpdate, setIsUpdate] = useState<boolean>(false);

  const handleFlightClick = (id: number) => { //  функция для нажатия на блок
    setSelectedFlightId(id);
    addFlight.id = id;
    openModal();
    console.log(`Selected flight id: ${id}`);
  };

  const deleteFlightClick = () => { //  удаляем рейс
    /* eslint-disable-next-line no-restricted-globals */
    let confirmDelete = confirm('Вы точно хотите удалить данный рейс?');
    if (confirmDelete) {
      return addFlight.isDelete = true;
    }
    else {
      return
    }
  };

  useEffect(() => {
    const fetchFlights = async () => {
      const response = await axios.post('http://localhost:5000/', onPage, {
        withCredentials: true,
      });
      if (response.data.message) { // проверка на наличие токена либо его валидность
        alert(response.data.message);
        return navigate('/login');
      }
      // else if (response.data.message_right) { // проверка на права настроек
      //   alert(response.data.message_right);
      //   return navigate('/MainPage');
      // }
      else {
        setFlights(response.data.data); // данные уже реально из БД
        setToken({
          username: response.data.username,
          role: response.data.role,
          right: response.data.right,
        });
        console.log(response.data);
      };
    }
    fetchFlights();
  }, []);

  const cities: string[] = [
    'Астана', 'Алматы', 'Актау', 'Шымкент', 'Актобе', 'Корея', 'Казань', 'Сочи', 
    'Москва', 'Екатеринбург', 'Новосибирск', 'Санкт-Петербург', 'Воронеж', 'Краснодар', 
    'Нижний Новгород', 'Ростов-на-Дону', 'Пермь', 'Уфа', 'Челябинск', 'Тюмень', 
    'Владивосток', 'Иркутск', 'Калининград', 'Самара', 'Саратов', 'Томск', 'Архангельск', 
    'Кострома', 'Ярославль', 'Рим', 'Берлин', 'Лондон', 'Париж', 'Нью-Йорк', 'Барселона', 
    'Мадрид', 'Стамбул', 'Пекин', 'Токио', 'Сидней', 'Дубай', 'Лос-Анджелес', 'Минск', 
    'Киев', 'Баку', 'Ереван', 'Алма-Ата', 'Ташкент', 'Душанбе', 'Ашхабад', 'Бишкек', 
    'Абу-Даби', 'Куала-Лумпур', 'Манила', 'Гонконг', 'Сингапур', 'Джакарта', 'Киото', 
    'Пусан', 'Гамбург', 'Милан', 'Генуя', 'Мюнхен', 'Цюрих', 'Штутгарт', 'Лиссабон', 
    'Осло', 'Амстердам', 'Мехико', 'Богота', 'Картахена', 'Лима', 'Сантьяго', 'Монреаль', 
    'Ванкувер', 'Калгари', 'Торонто', 'Квебек', 'Виннипег', 'Дели', 'Мумбаи', 'Кочин', 
    'Ченнаи', 'Бенгалуру', 'Гоа', 'Джидда', 'Рияд', 'Абиджан', 'Дакка', 'Кейптаун', 
    'Лагос', 'Найроби', 'Мапуту', 'Абуджа', 'Сеул', 'Мельбурн', 'Аделаида', 'Брисбен', 
    'Тасмания', 'Перт', 'Тайбэй', 'Карачи', 'Лахор', 'Исламабад', 'Дахка', 'Бухарест', 
    'Белград', 'Прага', 'Варшава', 'Будапешт', 'Афины', 'Брюссель', 'Хельсинки', 'Вильнюс', 
    'Рига', 'Таллинн', 'Женева', 'Ницца', 'Копенгаген', 'Белфаст', 'Бирмингем', 'Манчестер', 
    'Глазго'
  ];  

  /* ----- Логика отправки введенных данных на сервер ----- */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
      // Преобразуем числовые значения в число
    if (name === 'economy' || name === 'business' || name === 'firstClass') {
      setAddFlight({
        ...addFlight,
        [name]: value ? parseInt(value) : 0,  // если значение пустое, установим 0
      });
    } else {
      setAddFlight({ ...addFlight, [name]: value });
    }
  }
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
        const response = await axios.post("http://localhost:5000/addFlight", addFlight, {
            withCredentials: true,
        });
        if (response.data.message) { // проверка на наличие токена либо его валидность
          alert(response.data.message);
          return navigate('/login');
        }
        else {
          if (response.data.success) {
            alert(response.data.success);
            closeModal();
            addFlight.isDelete = false;
            window.location.reload();
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
  const openModal = () => {
    setIsUpdate(false);
    const flight = flights.find(flight => flight.id === addFlight.id);
    if (flight) {
      addFlight.departure = flight.departure || '';
      addFlight.arrival = flight.arrival || '';
      addFlight.date = flight.date || '';
      addFlight.time = flight.time || '';
      addFlight.flightNumber = flight.flightNumber || '';
      addFlight.economy = flight.economy ?? 0;
      addFlight.business = flight.business ?? 0;
      addFlight.firstClass = flight.firstClass ?? 0;
      setIsUpdate(true);
    }
    console.log('true selectedFlightId: ' + selectedFlightId);
    console.log('true addFlight.id: ' + addFlight.id);
    console.log('true: ' + addFlight.departure);
    setModalOpen(true);
  }
  const closeModal = () => {
    setModalOpen(false);
    setTimeout(() => {
      setIsUpdate(false);
      addFlight.id = 0;
      addFlight.departure = '';
      addFlight.arrival = '';
      addFlight.date = '';
      addFlight.time = '';
      addFlight.flightNumber = '';
      addFlight.economy = 0;
      addFlight.business = 0;
      addFlight.firstClass = 0;
      console.log('false: ' + addFlight.id);
      console.log('false: ' + addFlight.departure); 
    }, 120); // Задержка 120 мс во время закрытия анимации
  }
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
    <Header username='oleg' role='admin'/>
      <div className='mt-[60px]'>
        <ContentTop tab={'TabSettings'} />
        <div className="pl-[100px] pr-[100px] text-center flex flex-col items-center justify-between space-y-4"> {/* начало */}
        <select id="point_of_departure" onChange={handleChangeDeparture} className="h-[60px] mt-[20px] w-350 font-bold text-center sm:-translate-x-4 sm:-translate-y-4 bg-white border border-gray-300 rounded-16 p-2">
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
          </div>
          <div className='mt-6 mb-6 flex items-center justify-center'>
            <button className='transform transition duration-300 hover:scale-105 h-[60px] w-350 ml-2 p-2 font-bold sm:-translate-x-4 sm:-translate-y-4 text-xl text-white bg-[#3e5bb7] rounded-16' onClick={openModal}>Добавить рейс</button>
          </div>
          <div className='mt-6 mb-6 flex items-center justify-center'>
            {selectDeparture || selectArrival || selectDate ? (
              <h1 className='font-bold text-3xl text-customBlue'>Список найденных рейсов для редактирования</h1>
            ) : (
              <h1 className='font-bold text-3xl text-customBlue'>Список всех доступных рейсов для редактирования</h1>
            )
          }
            
          </div>
          {(selectDeparture || selectArrival || selectDate ? resultSelects : flights).map((flight) => (
            <div key={flight.id} className='flex items-center justify-center' onClick={() => handleFlightClick(flight.id)}>
              <FlightCardSettings {...flight} />
            </div>
          ))}
              {/* модальное окно */}
    <div>
      <SettingsModal isOpen={isModalOpen} onClose={closeModal}>
        <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
        <label className="block text-sm font-medium text-gray-700">*Откуда</label>
        <select value={addFlight.departure} name="departure" onChange={handleChange} className="h-10 mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50">
          <option value="">Откуда</option>
          {cities.map((city, index) => (
            <option key={index} value={city}>{city}</option>
          ))}
        </select>
      </div>
  
      <div>
        <label className="block text-sm font-medium text-gray-700">Куда</label>
        <select value={addFlight.arrival} name="arrival" onChange={handleChange} className="h-10 mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50">
          <option value="">Куда</option>
          {cities.map((city, index) => (
            <option key={index} value={city}>{city}</option>
          ))}
        </select>
      </div>
  
          <div>
            <label className="block text-sm font-medium text-gray-700">Дата вылета</label>
            <input
              value={addFlight.date}
              type="date"
              name="date"
              onChange={handleChange}
              className="h-10 mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
            />
          </div>
  
          <div>
            <label className="block text-sm font-medium text-gray-700">Время вылета</label>
            <input
              value={addFlight.time}
              type="time"
              name="time"
              onChange={handleChange}
              className="h-10 mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
            />
          </div>
  
          <div>
            <label className="block text-sm font-medium text-gray-700">Номер рейса</label>
            <input
              value={addFlight.flightNumber}
              type="text"
              name="flightNumber"
              onChange={handleChange}
              placeholder='Введите на английском языке'
              className="h-10 mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
            />
          </div>
  
          <div>
            <label className="block text-sm font-medium text-gray-700">Номер места в эконом классе</label>
            <input
              value={addFlight.economy}
              type="number"
              name="economy"
              onChange={handleChange}
              className="h-10 mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
            />
          </div>
  
          <div>
            <label className="block text-sm font-medium text-gray-700">Номер места в бизнес классе</label>
            <input
              value={addFlight.business}
              type="number"
              name="business"
              onChange={handleChange}
              className="h-10 mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
            />
          </div>
  
          <div>
            <label className="block text-sm font-medium text-gray-700">Номер места в первом классе</label>
            <input
              value={addFlight.firstClass}
              type="number"
              name="firstClass"
              onChange={handleChange}
              className="h-10 mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
            />
          </div>
            <button type="submit" className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-semibold py-2 px-6 rounded-lg shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-indigo-300">{isUpdate ? "Обновить рейс" : "Создать рейс"}</button>
            {isUpdate? 
            <button onClick={deleteFlightClick} className="mt-4 w-full bg-gradient-to-r from-red-500 to-indigo-500 text-white font-semibold py-2 px-6 rounded-lg shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-indigo-300">Удалить рейс</button>
            :
            <div></div>
            }
        </form>
      </SettingsModal>
    </div>
      </div>
    </>
  );
}

export default TabSettings;