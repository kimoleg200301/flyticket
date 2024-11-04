// MainPage.tsx
import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import FlightCard from '../components/FlightCard';
import flightsData from '../data/flights.json';
import Logo from '../icons/logo.svg';

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

const MainPage: React.FC = () => {
  const [flights, setFlights] = useState<Flight []>([]);
  const [resultSelects, setResultSelects] = useState<Flight [] | null>(null);

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

  useEffect(() => {
    console.log('selectDeparture: ' + selectDeparture);
    setResultSelects([]);
    if (flights.length > 0 && selectDeparture) {
      const foundDeparture = flights.find((f: Flight) => f.departure === selectDeparture);
      setResultSelects(foundDeparture ? [foundDeparture] : null);
      console.log(resultSelects);
    }
  }, [flights, selectDeparture]);

  useEffect(() => {
    setFlights(flightsData); // данные якобы берутся из сервера
    console.log(flights);
  }, []);
  

  // return (
  //   <>
  //   <div style={styles.pageContainer}>
  //     <Header />
  //     <div style={styles.flightsContainer}>
  //       {flights.map((FlightDetailsPage) => (
  //         <FlightCard key={FlightDetailsPage.id} {...FlightDetailsPage} />
  //       ))}
  //     </div>
  //   </div>
  //   </>
  // );

  // return (
  //   <div className="max-w-sm rounded overflow-hidden shadow-lg p-4 md:flex md:items-center bg-white">
  //     <img className="w-full md:w-1/3" src={Logo} alt="Sample Image" />
  //     <div className="px-4 py-2 md:w-2/3">
  //       <h2 className="font-bold text-xl mb-2">Заголовок</h2>
  //       <p className="text-gray-700 text-base">
  //         Это пример адаптивной карточки, которая изменяет макет на больших экранах.
  //       </p>
  //     </div>
  //   </div>
  // );
  return (
    <>
    <div className="h-550 sm:h-300 p-16 bg-blue-500 shadow-md flex flex-wrap sm:flex-nowrap items-center justify-center">
      <h1 className='mb-2 font-bold text-3xl text-white sm:-translate-x-4 sm:-translate-y-4'>Выбирайте нужный рейс под Ваш вкус</h1>
      <select id="point_of_departure" onChange={handleChangeDeparture} className="h-70 w-350 font-bold sm:-translate-x-4 sm:-translate-y-4 bg-white border border-gray-300 rounded-16 sm:rounded-tr-none sm:rounded-br-none p-2">
        <option value="">Откуда</option>
        {flights.map((departure_) => (
          <>
          <option value={departure_.departure}>{departure_.departure}</option>
          </>
        )
        )}
      </select>
      <select id="point_of_arrival" onChange={handleChangeArrival} className="h-70 w-350 font-bold sm:-translate-x-4 sm:-translate-y-4 bg-white border border-gray-300 rounded-16 sm:rounded-tl-none sm:rounded-bl-none p-2">
        <option value="">Куда</option>
        {flights.map((arrival_) => (
          <>
          <option value={arrival_.arrival}>{arrival_.arrival}</option>
          </>
        )
        )}
      </select>
      <select id="date_of_dispatch" onChange={handleChangeDate} className="h-70 w-350 font-bold sm:-translate-x-4 sm:-translate-y-4 bg-white border border-gray-300 rounded-16 sm:rounded-tr-none sm:rounded-br-none p-2">
        <option value="">Когда</option>
        {flights.map((date_) => (
          <>
          <option value={date_.date}>{date_.date}</option>
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
      <button className='h-70 w-350 ml-2 p-2 font-bold sm:-translate-x-4 sm:-translate-y-4 text-xl text-white bg-orange-500 rounded-16'>Найти рейс</button>
    </div>
    <div className='mt-6 mb-6 flex items-center justify-center'>
      {selectDeparture || selectArrival || selectDate ? (
        <h1 className='font-bold text-3xl'>Список найденных рейсов</h1>
      ) : (
        <h1 className='font-bold text-3xl'>Список всех доступных рейсов</h1>
      )
    }
      
    </div>
    {selectDeparture || selectArrival || selectDate ? (
        flights.map((resultSelects) => (
          <>
          <div className='flex items-center justify-center'>
            <FlightCard key={resultSelects.id} {...resultSelects} />
          </div>
          </>
        ))
      ) : (
        flights.map((FlightDetailsPage) => (
          <>
          <div className='flex items-center justify-center'>
            <FlightCard key={FlightDetailsPage.id} {...FlightDetailsPage} />
          </div>
          </>
        ))
      )
    }
    </>
  );
};

// const styles = {
//   pageContainer: {
//     backgroundColor: '#e0f7fa',
//   },
//   flightsContainer: {
//     display: 'grid',
//     gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
//     gap: '1rem',
//     padding: '2rem',
//   },
// };

export default MainPage;
