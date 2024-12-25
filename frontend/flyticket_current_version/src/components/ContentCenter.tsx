import React from "react";

const ContentCenter: React.FC = () => {
  
  return (
    <div className='pl-[100px] pr-[100px] flex flex-col items-center justify-between'>
      <h1 data-aos="zoom-in" className='m-[15px] mt-[10px] w-[750px] text-5xl text-center font-bold leading-[62px]'>Найдите и Забронируйте Отличный Рейс</h1>
      <img data-aos="zoom-in" data-aos-duration="300" src='/plane.png' className='m-[15px]' />
    </div>
  );
}

export default ContentCenter;