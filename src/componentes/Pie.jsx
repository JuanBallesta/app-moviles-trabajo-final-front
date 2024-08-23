import React from 'react';

export const Pie = () => {
  return (
    <div className='bg-cyan-400 p-4 text-center font-bold'>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2'>
        <button className='w-full border-solid border-2 hover:bg-white border-black py-2 rounded font-bold italic'>
          ¿QUIÉNES SOMOS?
        </button>
        <button className='w-full border-solid border-2 hover:bg-white border-black py-2 rounded font-bold italic'>
          CÓMO COMPRAR
        </button>
        <button className='w-full border-solid border-2 hover:bg-white border-black py-2 rounded font-bold italic'>
          POLÍTICAS DE PRIVACIDAD
        </button>
        <button className='w-full border-solid border-2 hover:bg-white border-black py-2 rounded font-bold italic'>
          TÉRMINOS Y CONDICIONES
        </button>
        <button className='w-full border-solid border-2 hover:bg-white border-black py-2 rounded font-bold italic'>
          RECLAMOS Y DEVOLUCIONES
        </button>
      </div>
    </div>
  );
};

export default Pie
