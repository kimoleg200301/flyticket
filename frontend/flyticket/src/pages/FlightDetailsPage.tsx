// FlightDetailsPage.tsx
import React, { useEffect, useState } from 'react';
import flightsData from '../data/flights.json';
import { useParams } from 'react-router-dom';

interface Flights {
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

const FlightDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string | undefined}>();
  const [flights, setFlights] = useState<Flights []>([]); // сохраняем все полеты
  const [flight, setFlight] = useState<Flights | null>(null); // сохраняем только один полет

  useEffect(() => {
    setFlights(flightsData); // данные якобы берутся из сервера
  }, []);

  useEffect(() => {
    if (flights.length > 0 && id) {
      const foundflight = flights.find((f: Flights) => f.id === parseInt(id));
      setFlight(foundflight || null);
    }
  }, [flights, id]);

  if (!id) {
    return <div>Error: Flight is not found!</div>
  }

  console.log(flight);

  return (
    <>
    
    </>
  );

  // return (
  //   <div style={styles.pageContainer}>
  //     <div style={styles.detailsContainer}>
  //       {flight ? (
  //         <>
  //           <h2 style={styles.route}>{flight.departure} - {flight.arrival}</h2>
  //           <p>Имя пользователя: {/*flight.username*/"Тажи Нурдаулет"}</p>
  //           <p>Дата рейса: {flight.date}</p>
  //           <p>Номер рейса: {flight.flightNumber}</p>
  //           <div style={styles.seats}>
  //             <p>Места (Эконом): {flight.seats.economy}</p>
  //             <p>Места (Бизнес): {flight.seats.business}</p>
  //             <p>Места (Первый класс): {flight.seats.firstClass}</p>
  //           </div>
  //           <button style={styles.button}>Забронировать рейс</button>
  //         </>
  //       ) : (
  //         <h2>Рейс не найден!</h2>
  //       )}
  //     </div>
  //   </div>
  // );
};

// const FlightDetailsPage: React.FC<Flights> = ({
//   departure,
//   arrival,
//   username,
//   date,
//   flightNumber,
//   seats,
// }) => {
//   return (
//     <div style={styles.pageContainer}>
//       <div style={styles.detailsContainer}>
//         <h2 style={styles.route}>{departure} - {arrival}</h2>
//         <p>Имя пользователя: {username}</p>
//         <p>Дата рейса: {date}</p>
//         <p>Номер рейса: {flightNumber}</p>
//         <div style={styles.seats}>
//           <p>Места (Эконом): {seats.economy}</p>
//           <p>Места (Бизнес): {seats.business}</p>
//           <p>Места (Первый класс): {seats.firstClass}</p>
//         </div>
//         <button style={styles.button}>Забронировать рейс</button>
//       </div>
//     </div>
//   );
// };

// const styles = {
//   pageContainer: {
//     display: 'flex',
//     justifyContent: 'flex-start' as 'flex-start',
//     padding: '2rem',
//     minHeight: '100vh',
//   },
//   detailsContainer: {
//     maxWidth: '400px',
//     padding: '1.5rem',
//     borderRadius: '8px',
//     backgroundColor: '#ffffff',
//     boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
//   },
//   route: {
//     color: '#00796b',
//     fontSize: '1.5rem',
//     marginBottom: '1rem',
//   },
//   seats: {
//     marginTop: '1rem',
//     marginBottom: '1.5rem',
//   },
//   button: {
//     width: '100%',
//     padding: '0.8rem',
//     borderRadius: '4px',
//     backgroundColor: '#00796b',
//     color: '#ffffff',
//     border: 'none',
//     cursor: 'pointer',
//     fontWeight: 'bold' as 'bold',
//   },
// };

export default FlightDetailsPage;
