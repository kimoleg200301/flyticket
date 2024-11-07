import React, { ReactNode, useState, useEffect } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

const SettingsModal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  useEffect(() => {
    // Убираем скроллинг при открытии модального окна
    // if (isOpen) {
    //   document.body.style.overflow = 'hidden';
    // } else {
    //   document.body.style.overflow = 'auto'; // Восстанавливаем скроллинг при закрытии
    // }

    // Очистка эффекта при размонтировании или закрытии модального окна
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 transition-opacity duration-300 ${
        isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
    >
      <div
        className={`p-8 bg-white p-6 rounded-lg shadow-lg w-96 transform transition-all duration-300 ${
          isOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
        }`}
      >
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700 float-right text-3xl p-2 absolute top-0 right-2">
          &times;
        </button>
        <div>{children}</div>
      </div>
    </div>
  );
};

export default SettingsModal;
