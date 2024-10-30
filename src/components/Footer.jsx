import React from 'react';

export const Footer = () => {
  return (
    <div className='bg-cyan-400 p-4 text-center text-white font-bold italic'>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2'>
        <button className='w-full border-solid border-2 hover:bg-cyan-800 border-white py-2 rounded-md font-bold italic'>
          ¿QUIÉNES SOMOS?
        </button>
        <button className='w-full border-solid border-2 hover:bg-cyan-800 border-white py-2 rounded-md font-bold italic'>
          CÓMO COMPRAR
        </button>
        <button className='w-full border-solid border-2 hover:bg-cyan-800 border-white py-2 rounded-md font-bold italic'>
          POLÍTICAS DE PRIVACIDAD
        </button>
        <button className='w-full border-solid border-2 hover:bg-cyan-800 border-white py-2 rounded-md font-bold italic'>
          TÉRMINOS Y CONDICIONES
        </button>
        <button className='w-full border-solid border-2 hover:bg-cyan-800 border-white py-2 rounded-md font-bold italic'>
          RECLAMOS Y DEVOLUCIONES
        </button>
      </div>
    </div>
  );
};

export default Footer
