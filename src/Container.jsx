// import { Button } from '@mui/material';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Button } from "flowbite-react";
import BtWhatsapp from './components/BtWhatsapp'

function Container(props) {
  const { tastes, categorieSetter } = props;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filtro, setFiltro] = useState('');
  const [categories, setCategories] = useState([]);
  const [productTypes, setProductTypes] = useState([]);
  const [categorieSelected, setCategorieSelected] = useState([]);
  const [productTypesSelected, setProductTypesSelected] = useState([]);

  const getCategories = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/categories/');
      setCategories(response.data.data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const getProductTypes = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/productTypes/');
      setProductTypes(response.data.data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCategories();
    getProductTypes();
  }, []);

  const handleCategoryChange = (e) => {
    const value = e.target.value;
    setCategorieSelected((prev) =>
      prev.includes(value) ? prev.filter(id => id !== value) : [...prev, value]
    );
    categorieSetter(categorieSelected)
  };

  const handleProductTypeChange = (e) => {
    const value = e.target.value;
    setProductTypesSelected((prev) =>
      prev.includes(value) ? prev.filter(id => id !== value) : [...prev, value]
    );
  };

  const filteredTastes = tastes.filter(taste =>
    taste.taste.toLowerCase().includes(filtro.toLowerCase()) &&
    (categorieSelected.length ? categorieSelected.includes(String(taste.categoryId)) : true) &&
    (productTypesSelected.length ? productTypesSelected.includes(String(taste.productTypeId)) : true)
  );

  return (
    <div className='flex justify-between gap-36 max-w-7xl'>
      <div className="items-left ">
        {/* Input de busqueda */}
        <div className="relative mt-6 mb-4">
          <label htmlFor="Search" className="sr-only"> </label>
          <input
            type="text"
            placeholder="Buscar por gusto de helado"
            className="w-full rounded-md border-gray-200 p-2 shadow-sm sm:text-sm focus:ring-2 focus:ring-cyan-400 focus:border-transparent"
            value={filtro}
            onChange={(e) => setFiltro(e.target.value)} />
          <span className="absolute inset-y-0 end-0 grid w-10 place-content-center">
            <button type="button" className="text-gray-600 hover:text-gray-700">
              <span className="sr-only"></span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-4">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
              </svg>
            </button>
          </span>
        </div>

        {/* Busqueda por categoria y tipo */}
        <div className='bg-white h-64 p-2'>
          <fieldset>
            <legend className="text-lg font-medium text-gray-900 underline underline-offset-4">Categoría</legend>
            <p className="mt-1 text-pretty text-sm text-gray-700">
              Seleccione la categoria de helado que desea buscar.
            </p>
            <div className="my-4 space-y-2">
              <label className="cursor-pointer items-start font-bold gap-4 mb-1 ">
                {categories.map((categorie) => (
                  <div key={categorie.id}>
                    <label className="flex items-center">
                      <input type="checkbox"
                        className="size-4 rounded border-gray-300 mr-2"
                        value={categorie.id}
                        onChange={handleCategoryChange} />
                      <strong className="font-medium text-gray-900"> {categorie.description} </strong>
                    </label>
                  </div>
                ))}
              </label>
            </div>
          </fieldset>
        </div>
        <div className='bg-white h-64 p-2'>
          <fieldset>
            <legend className="text-lg font-medium text-gray-900 underline underline-offset-4">Tipo de envasado</legend>
            <p className="mt-1 text-pretty text-sm text-gray-700">
              Seleccione el tipo de envasado que desea buscar.
            </p>
            <div className="mt-4 space-y-2">
              <label className="cursor-pointer items-start font-bold gap-4 mb-1 ">
                {productTypes.map((product) => (
                  <div key={product.id}>
                    <label className="flex items-center">
                      <input type="checkbox"
                        className="size-4 rounded border-gray-300 mr-2"
                        value={product.id}
                        onChange={handleProductTypeChange} />
                      <strong className="font-medium text-gray-900"> {product.description} </strong>
                    </label>
                  </div>
                ))}
              </label>
            </div>
          </fieldset>
        </div>
      </div>
      {/* <div className="flex max-w-md overflow-hidden bg-white rounded-lg shadow-lg">
        <div cNaclassNamelass="w-1/3 bg-cover bg-landscape">
        </div>
        <div className="w-2/3 p-4">
          <h1 className="text-2xl font-bold text-gray-900">
            Tomorow
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            You can&#x27;t buy your future, but you can do it. Money is nothing, you&#x27;r everything.
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
          <div className="flex justify-between mt-3 item-center">
            <h1 clNaclassNameass="text-xl font-bold text-gray-700">
              $220
            </h1>
            <button className="px-3 py-2 text-xs font-bold text-white uppercase bg-gray-800 rounded">
              Add to Card
            </button>
          </div>
        </div>
      </div> */}

      {/* Mostrar resultados de búsqueda */}
      <div className='flex-1 p-5 flex flex-col items-center'>
        {loading && <div>Cargando...</div>}
        {error && <div>Error: {error}</div>}
        <div className="w-full grid grid-cols-1 gap-4">
          {filteredTastes.length === 0 ? (
            <div className='font-bold text-center'>No se encontró ningún producto.</div>
          ) : (
            filteredTastes.map((taste) => (
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
