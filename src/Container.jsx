// import { Button } from '@mui/material';
import { useState } from 'react';
import { Button } from "flowbite-react";
import BtWhatsapp from './components/BtWhatsapp'
import Filter from './components/Filters'

function Container(props) {
  const { tastes,
    filtro,
    setFiltro,
    categorieSelected,
    setCategorieSelected,
    productTypesSelected,
    setProductTypesSelected } = props;

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  return (
    <div className='flex justify-between gap-36 max-w-7xl'>
      <Filter
        filtro={filtro}
        categorieSelected={categorieSelected}
        productTypesSelected={productTypesSelected}
        onFiltroChange={setFiltro}
        onCategorieChange={setCategorieSelected}
        onProductTypesChange={setProductTypesSelected} />

      {/* Mostrar resultados de búsqueda */}
      <div className='flex-1 p-5 flex flex-col items-center'>
        {loading && <div>Cargando...</div>}
        {error && <div>Error: {error}</div>}
        <div className="w-full grid grid-cols-1 gap-4">
          {tastes.length === 0 ? (
            <div className='font-bold text-center'>No se encontró ningún producto.</div>
          ) : (
            tastes.map((taste) => (
              // Crear card de producto 
              <div key={taste.id} className="flex w-full overflow-hidden bg-white rounded-lg shadow-md hover:shadow-2xl hover:border-bg-black hover:scale-105">
                <div className="w-1/3 bg-cover bg-landscape">
                  <img className="p-2 w-48 h-48" src={taste.photos} alt="Foto del helado" />
                </div>
                <div className="w-2/3 p-4">
                  <h1 className="text-2xl font-bold text-gray-900">
                    {taste.taste}
                  </h1>
                  <p className="mt-2 text-sm text-gray-600">
                    {taste.shortDescription}
                  </p>
                  <div className="flex mt-2 item-center">
                    <svg className="w-5 h-5 text-gray-700 fill-current" viewBox="0 0 24 24">
                      <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z">
                      </path>
                    </svg>
                    <svg className="w-5 h-5 text-gray-700 fill-current" viewBox="0 0 24 24">
                      <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z">
                      </path>
                    </svg>
                    <svg className="w-5 h-5 text-gray-700 fill-current" viewBox="0 0 24 24">
                      <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z">
                      </path>
                    </svg>
                    <svg className="w-5 h-5 text-gray-500 fill-current" viewBox="0 0 24 24">
                      <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z">
                      </path>
                    </svg>
                    <svg className="w-5 h-5 text-gray-500 fill-current" viewBox="0 0 24 24">
                      <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z">
                      </path>
                    </svg>
                  </div>
                  <div className="flex justify-between mt-8 items-center ">
                    <h1 className="text-xl font-bold text-gray-700">
                      ${taste.productType?.price}
                    </h1>
                    <Button
                      className="w-48 inline-block rounded bg-cyan-400 text-sm font-bold text-white transition hover:scale-110 hover:shadow-xl focus:outline-none focus:ring active:bg-cyan-500"
                      href="#">
                      AGREGAR AL CARRITO
                    </Button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      <BtWhatsapp />
    </div >
  );
}

export default Container;
