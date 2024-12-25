import React, { useEffect } from 'react';
import ContentCenter from "../ContentCenter";
import Header from "../Header";
import ContentTop from "../ContentTop";

const TabMain: React.FC = () => {

  return (
    <>
    <Header username='oleg' role='admin'/>
    <div className='mt-[60px]'>
    <ContentTop tab={'TabMain'} />
      <ContentCenter />
      <div className="pl-[100px] pr-[100px] flex items-center justify-between">
        {/* <div>
          <span className="text-[#3e5bb7]">Main</span>
          <h1 className="text-[#3e5bb7]">Услуги</h1>
          <span className="text-[#3e5bb7]">Наш сайт предоставляет невероятные услуги по перелетам из одного города в другой путем бронирования нужных рейсов. Выберите нужный рейс под Ваши требования и бронируйте! Что может быть лучше?</span>
        </div> */}
      </div>
    </div>
    </>
  );
}

export default TabMain;