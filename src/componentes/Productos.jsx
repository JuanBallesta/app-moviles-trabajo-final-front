import React from 'react';

const gustosHelado = [
  {
    nombre: "Chocolate",
    precioUnitario: 2500,
    stock: 59,
    imagen: "https://argentina.gridohelado.com/wp-content/uploads/2016/06/chocolate.jpg",
  },
  {
    nombre: "Vainilla",
    precioUnitario: 2000,
    stock: 7,
    imagen: "https://argentina.gridohelado.com/wp-content/uploads/2016/06/dulcedeleche.jpg",
  },
  {
    nombre: "Frutilla",
    precioUnitario: 1800,
    stock: 8,
    imagen: "https://argentina.gridohelado.com/wp-content/uploads/2016/06/frutilla-crema.jpg",
  },
  {
    nombre: "Banana split",
    precioUnitario: 2700,
    stock: 3,
    imagen: "https://argentina.gridohelado.com/wp-content/uploads/2016/06/banana-dulcedeleche.jpg",
  },
  {
    nombre: "Crema cookie",
    precioUnitario: 2200,
    stock: 0,
    imagen: "https://argentina.gridohelado.com/wp-content/uploads/2016/06/crema-cookie.jpg",
  },
  {
    nombre: "Dulce de leche",
    precioUnitario: 2900,
    stock: 6,
    imagen: "https://argentina.gridohelado.com/wp-content/uploads/2016/06/dulcedeleche.jpg",
  },
  {
    nombre: "Menta granizada",
    precioUnitario: 1500,
    stock: 0,
    imagen: "https://argentina.gridohelado.com/wp-content/uploads/2016/06/menta-granizada.jpg",
  },
];

const ProductoIndividual = ({ nombre, precioUnitario, stock, imagen }) => {
  return (
    <div className='m-4'>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4 font-bold italic border-solid border-2 border-black rounded-lg'>
        <div className='flex justify-center items-center p-4'>
          <img src={imagen} alt={nombre} className='w-32 h-32 object-cover rounded-md' />
        </div>
        <div className='px-4 py-2 flex flex-col justify-between'>
          <div>
            <div className="text-xl mb-2">{nombre}</div>
            <p className="text-gray-700 mt-2">${precioUnitario}</p>
            <p className={stock === 0 ? "text-red-600 font-semibold" : "text-gray-700"}>
              {stock === 0 ? "NO HAY UNIDADES DISPONIBLES" : `Stock: ${stock}`}
            </p>
          </div>
          <button
            className={`flex items-center justify-center text-xs px-4 py-2 mt-2 rounded font-bold ${stock === 0
                ? "bg-gray-400 cursor-not-allowed text-white"
                : "bg-green-400 text-white hover:bg-green-500"
              }`}
            disabled={stock === 0}
          >
            <i className="fas fa-shopping-cart mr-2"></i> Agregar al carrito
          </button>
        </div>
      </div>
    </div>
  );
};

export const Productos = () => {
  return (
    <div className='grid grid-cols-3'>
      {gustosHelado.map((gusto, id) => (
        <ProductoIndividual key={id} {...gusto} />
      ))}
    </div>
  );
};

export default Productos;
