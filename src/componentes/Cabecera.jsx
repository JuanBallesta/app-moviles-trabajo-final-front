import React from 'react'

export const Cabecera = () => {
  return (
    <div className='bg-cyan-400 p-4 text-center font-bold italic'>
      <div className='flex flex-col sm:flex-row sm:justify-center sm:space-x-4'>
        <button
          id="btnMostrarGustos"
          className='w-full sm:w-48 bg-cyan-400 mx-0 sm:mx-2 my-2 sm:my-0 py-2 rounded border-solid border-2 hover:bg-white border-black font-bold italic'
        >
          GUSTOS DE HELADO
        </button>
        <button
          className='w-full sm:w-48 bg-cyan-400 mx-0 sm:mx-2 my-2 sm:my-0 py-2 rounded border-solid border-2 hover:bg-white border-black font-bold italic'
        >
          OFERTAS
        </button>
        <button
          className='w-full sm:w-48 bg-cyan-400 mx-0 sm:mx-2 my-2 sm:my-0 py-2 rounded border-solid border-2 hover:bg-white border-black font-bold italic'
        >
          VER CARRITO 🛒
        </button>
        <button
          className='w-full sm:w-48 bg-cyan-400 mx-0 sm:mx-2 my-2 sm:my-0 py-2 rounded border-solid border-2 hover:bg-white border-black font-bold italic'
        >
          INICIAR SESIÓN
        </button>
      </div>
    </div>
  );
};

export default Cabecera