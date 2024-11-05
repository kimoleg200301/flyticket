// FlightDetailsPage.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { PDFDocument } from 'pdf-lib';
import '../css/LoginForm.css';

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
  },
  username: string,
}

const FlightDetailsPage: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string | undefined}>();
  const [flights, setFlights] = useState<Flights []>([]); // сохраняем все полеты
  const [flight, setFlight] = useState<Flights | null>(null); // сохраняем только один полет

  useEffect(() => {
    const fetchFlights = async () => {
      const response = await axios.post('http://localhost:5000/flightDetailPage', '', {
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
    //setFlights(flightsData); // данные якобы берутся из сервера
    //console.log(flights);
    }
    fetchFlights();
  }, []);

  useEffect(() => {
    if (flights.length > 0 && id) {
      const foundflight = flights.find((f: Flights) => f.id === parseInt(id));
      setFlight(foundflight || null);
    }
  }, [flights, id]);

/* ------ Генерация pdf ------ */
  const handleDownloadPdf = async () => {
    if (!flight) return; // Если данные о рейсе не загружены, ничего не делать

    // Здесь должен быть ваш PDF-шаблон, замените на путь к вашему PDF
    const existingPdfBytes = await fetch('/pdf/ticket.pdf').then(res => {
      if (!res.ok) {
        throw new Error('Failed to fetch PDF: ' + res.statusText);
      }
      return res.arrayBuffer();
    });
    const pdfDoc = await PDFDocument.load(existingPdfBytes);
    
    // Создание PDF-документа
    const form = pdfDoc.getForm();

    // Получение полей формы и заполнение их данными рейса
    const nameField = form.getTextField('name');
    const nameField_ = form.getTextField('name_');
    const departureField = form.getTextField('departure');
    const arrivalField = form.getTextField('arrival');
    const dateField = form.getTextField('date');
    const flightNumberField = form.getTextField('flightNumber');
    const flightNumberField_ = form.getTextField('flightNumber_');
    const timeField = form.getTextField('time');
    const placeField = form.getTextField('place');
    const placeField_ = form.getTextField('place_');
/* -------- */ // перевод на английский
    const translationMap: { [key: string]: string } = { 
      'Астана': 'Astana',
      'Алматы': 'Almaty',
      'Актау': 'Aktau',
      'Шымкент': 'Shymkent',
      'Актобе': 'Aktobe',
      'Корея': 'Korea',
      'Казань': 'Kazan',
      'Сочи': 'Sochi',
      'Москва': 'Moscow',
      'Екатеринбург': 'Yekaterinburg',
      'Новосибирск': 'Novosibirsk',
      'Санкт-Петербург': 'Saint-Petersburg',
      // Добавьте сюда другие переводы
    };
/* -------- */ // перевод каждой буквы c кириллицы на англ
    const translateCyrillicToLatin = (text: string): string => {
      const transliterationMap: { [key: string]: string } = {
        'а': 'a', 'б': 'b', 'в': 'v', 'г': 'g', 'д': 'd',
        'е': 'e', 'ё': 'yo', 'ж': 'zh', 'з': 'z', 'и': 'i',
        'й': 'y', 'к': 'k', 'л': 'l', 'м': 'm', 'н': 'n',
        'о': 'o', 'п': 'p', 'р': 'r', 'с': 's', 'т': 't',
        'у': 'u', 'ф': 'f', 'х': 'kh', 'ц': 'ts', 'ч': 'ch',
        'ш': 'sh', 'щ': 'shch', 'ъ': '', 'ы': 'y', 'ь': '',
        'э': 'e', 'ю': 'yu', 'я': 'ya',
        'А': 'A', 'Б': 'B', 'В': 'V', 'Г': 'G', 'Д': 'D',
        'Е': 'E', 'Ё': 'Yo', 'Ж': 'Zh', 'З': 'Z', 'И': 'I',
        'Й': 'Y', 'К': 'K', 'Л': 'L', 'М': 'M', 'Н': 'N',
        'О': 'O', 'П': 'P', 'Р': 'R', 'С': 'S', 'Т': 'T',
        'У': 'U', 'Ф': 'F', 'Х': 'Kh', 'Ц': 'Ts', 'Ч': 'Ch',
        'Ш': 'Sh', 'Щ': 'Shch', 'Ъ': '', 'Ы': 'Y', 'Ь': '',
        'Э': 'E', 'Ю': 'Yu', 'Я': 'Ya'
      };
      return text.split('').map(char => transliterationMap[char] || char).join('');
    };
/* -------- */
    const translateToEnglish = (text: string) => {
      // Разбиваем текст на слова и переводим каждое
      return text.split(' ').map(word => translationMap[word] || word).join(' ');
    };
    console.log(translateCyrillicToLatin(flight.username));
    nameField.setText(translateCyrillicToLatin(flight.username));
    nameField_.setText(translateCyrillicToLatin(flight.username));
    departureField.setText(translateToEnglish(flight.departure));
    arrivalField.setText(translateToEnglish(flight.arrival));
    dateField.setText(flight.date);
    flightNumberField.setText(flight.flightNumber);
    flightNumberField_.setText(flight.flightNumber);
    timeField.setText(flight.time);
    placeField.setText(flight.seats.business.toString());
    placeField_.setText(flight.seats.business.toString());

    // Сохранение изменённого PDF-документа
    const pdfBytes = await pdfDoc.save();

    // Создание ссылки для скачивания
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ticket_${flight.username}.pdf`;
    a.click();
    URL.revokeObjectURL(url);
  };

/* ---------------------------- */

  if (!id) {
    return <div>Error: Flight is not found!</div>
  }

  console.log(flight);

  return (
    <div style={styles.pageContainer}>
      <div style={styles.detailsContainer}>
        {flight ? (
          <>
            <h2 style={styles.route}>{flight.departure} - {flight.arrival}</h2>
            <p>Имя пользователя: {flight.username}</p>
            <p>Дата рейса: {flight.date}</p>
            <p>Время рейса: {flight.time}</p>
            <p>Номер рейса: {flight.flightNumber}</p>
            <div style={styles.seats}>
              <p>Места (Эконом): {flight.seats.economy}</p>
              <p>Места (Бизнес): {flight.seats.business}</p>
              <p>Места (Первый класс): {flight.seats.firstClass}</p>
            </div>
            <button style={styles.button} onClick={handleDownloadPdf}>Забронировать рейс</button>
          </>
        ) : (
          <h2 style={styles.route}>Рейс не найден!</h2>
        )}
      </div>
    </div>
  );
};

const styles = {
  pageContainer: {
    display: 'flex',
    justifyContent: 'flex-start' as 'flex-start',
    padding: '2rem',
    minHeight: '100vh',
  },
  detailsContainer: {
    maxWidth: '400px',
    padding: '1.5rem',
    borderRadius: '8px',
    backgroundColor: '#ffffff',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  route: {
    color: '#00796b',
    fontSize: '1.5rem',
    marginBottom: '1rem',
  },
  seats: {
    marginTop: '1rem',
    marginBottom: '1.5rem',
  },
  button: {
    width: '100%',
    padding: '0.8rem',
    borderRadius: '4px',
    backgroundColor: '#357ABD',
    color: '#ffffff',
    border: 'none',
    cursor: 'pointer',
    fontWeight: 'bold' as 'bold',
  },
};

export default FlightDetailsPage;
