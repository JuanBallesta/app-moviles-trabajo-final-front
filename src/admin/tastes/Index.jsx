import { useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom"
import axios from 'axios';
import { Button } from "flowbite-react";

function IceCreamTastes() {
  const navigate = useNavigate();
  const elementosPorPagina = 5;

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [paginaActual, setPaginaActual] = useState(1);
  const [filtro, setFiltro] = useState('');

  const chargeTastes = async () => {
    try {
      const respuesta = await axios.get('/tastes/');
      console.log("soy respuesta", respuesta)
      if (respuesta.status === 200) {
        setData(respuesta.data.data);
        setLoading(false);
      }
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    chargeTastes();
  }, [])

  const deleteTasteDB = (id) => {
    axios.delete('/tastes/' + id).then((respuesta) => {
      chargeTastes();
    }).catch((error) => {
      console.log("error", error)
    });
  }

  const deleteTaste = (id) => {
    if (window.confirm("¿Desea borrar el gusto de helado?")) {
      deleteTasteDB(id);
    }
  }

  const cambiarPagina = (pagina) => {
    setPaginaActual(pagina);
  };

  const calcularCantidadPaginas = () => {
    return Math.ceil(data.length / elementosPorPagina);
  };

  const filtrarElementosSegunPagina = () => {
    const inicio = (paginaActual - 1) * elementosPorPagina;
    const fin = inicio + elementosPorPagina;
    const _data = data.slice(inicio, fin);
    console.log("data:", _data);
    return _data
  };

  return (
    <div className='p-5 bg-cyan-200'>
      {loading && <div className='p-2 mt-10 text-center text-white bg-cyan-400'>Cargando ...</div>}
      <div className='flex m-8'>
        <div className='w-1/4 font-bold'>
          <Link to="new">
            <Button
              className="w-full rounded bg-cyan-400 text-sm font-bold text-white transition hover:scale-110 hover:shadow-xl focus:outline-none focus:ring active:bg-cyan-500"
              href="#">
              NUEVO PRODUCTO
            </Button>
          </Link>
          <div className="relative mt-6 mb-4">
            <label htmlFor="Search" className="sr-only"> </label>
            <input
              type="text"
              placeholder="Buscar por gusto de helado"
              className="w-full rounded-md border-gray-200 p-2 shadow-sm sm:text-sm focus:ring-2 focus:ring-cyan-400 focus:border-transparent font-medium"
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
        </div>

        {/* tabla nueva */}
        {/* <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Product name
                </th>
                <th scope="col" className="px-6 py-3">
                  <div className="flex items-center">
                    Color
                    <a href="#">
                      <svg className="w-3 h-3 ms-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
                      </svg>
                    </a>
                  </div>
                </th>
                <th scope="col" className="px-6 py-3">
                  <div className="flex items-center">
                    Category
                    <a href="#">
                      <svg className="w-3 h-3 ms-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
                      </svg>
                    </a>
                  </div>
                </th>
                <th scope="col" className="px-6 py-3">
                  <div className="flex items-center">
                    Price
                    <a href="#">
                      <svg className="w-3 h-3 ms-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
                      </svg>
                    </a>
                  </div>
                </th>
                <th scope="col" className="px-6 py-3">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  Apple MacBook Pro 17"
                </th>
                <td className="px-6 py-4">
                  Silver
                </td>
                <td className="px-6 py-4">
                  Laptop
                </td>
                <td className="px-6 py-4">
                  $2999
                </td>
                <td className="px-6 py-4 text-right">
                  <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                </td>
              </tr>
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  Microsoft Surface Pro
                </th>
                <td className="px-6 py-4">
                  White
                </td>
                <td className="px-6 py-4">
                  Laptop PC
                </td>
                <td className="px-6 py-4">
                  $1999
                </td>
                <td className="px-6 py-4 text-right">
                  <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                </td>
              </tr>
              <tr className="bg-white dark:bg-gray-800">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  Magic Mouse 2
                </th>
                <td className="px-6 py-4">
                  Black
                </td>
                <td className="px-6 py-4">
                  Accessories
                </td>
                <td className="px-6 py-4">
                  $99
                </td>
                <td className="px-6 py-4 text-right">
                  <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                </td>
              </tr>
            </tbody>
          </table>
        </div> */}


        {/* <div class="relative flex flex-col w-full h-full overflow-scroll bg-white shadow-md rounded-lg bg-clip-border">
          <table class="w-full text-left table-auto min-w-max">
            <thead>
              <tr>
                <th
                  class="p-4 transition-colors cursor-pointer border-b border-slate-300 bg-slate-50 hover:bg-slate-100">
                  <p
                    class="flex items-center justify-between gap-2 text-sm font-normal leading-none text-slate-800">
                    Producto
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
                      stroke="currentColor" aria-hidden="true" class="w-4 h-4">
                      <path stroke-linecap="round" stroke-linejoin="round"
                        d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"></path>
                    </svg>
                  </p>
                </th>

                <th
                  class="p-4 transition-colors cursor-pointer border-b border-slate-300 bg-slate-50 hover:bg-slate-100">
                  <p
                    class="flex items-center justify-between gap-2 text-sm font-normal leading-none text-slate-800">
                    Descripción
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
                      stroke="currentColor" aria-hidden="true" class="w-4 h-4">
                      <path stroke-linecap="round" stroke-linejoin="round"
                        d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"></path>
                    </svg>
                  </p>
                </th>
                <th
                  class="p-4 transition-colors cursor-pointer border-b border-slate-300 bg-slate-50 hover:bg-slate-100">
                  <p
                    class="flex items-center justify-between gap-2 text-sm font-normal leading-none text-slate-800">
                    Stock
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
                      stroke="currentColor" aria-hidden="true" class="w-4 h-4">
                      <path stroke-linecap="round" stroke-linejoin="round"
                        d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"></path>
                    </svg>
                  </p>
                </th>
                <th
                  class="p-4 transition-colors cursor-pointer border-b border-slate-300 bg-slate-50 hover:bg-slate-100">
                  <p
                    class="flex items-center justify-between gap-2 text-sm font-normal leading-none text-slate-800">
                    Categoría
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
                      stroke="currentColor" aria-hidden="true" class="w-4 h-4">
                      <path stroke-linecap="round" stroke-linejoin="round"
                        d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"></path>
                    </svg>
                  </p>
                </th>
              </tr>
            </thead>
            <tbody>
              {filtrarElementosSegunPagina().filter((taste) =>
                taste?.taste?.toLowerCase().includes(filtro.toLowerCase()) || taste?.ingredients?.toLowerCase().includes(filtro.toLowerCase())
              ).map((taste, index) => (
                <tr key={index} className={`hover:bg-gray-200 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-100'}`}>
                  <td className="px-6 py-4 border border-black text-black">{taste.taste}</td>
                  <td className="px-6 py-4 border border-black text-black">{taste.shortDescription}</td>
                  <td className="px-6 py-4 border border-black text-black text-right">{taste.stock}</td>
                  <td className="px-6 py-4 border border-black text-black">{taste.category?.description}</td>
                  <td className="px-6 py-4 border border-black text-black">{taste.productType?.description}</td>
                  <td className='whitespace-nowrap border-r border-b border-black text-black'>
                    <div className='grid grid-cols-2 text-center'>
                      <div>
                        <button onClick={() => navigate("/admin/tastes/" + taste.id)} className="text-white bg-cyan-400 rounded-md transition hover:scale-110 hover:shadow-xl focus:outline-none focus:ring active:bg-cyan-500">
                          <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 24 24">
                            <path fill="currentColor" d="M5.616 20q-.691 0-1.153-.462T4 18.384V5.616q0-.691.463-1.153T5.616 4h8.386l-1 1H5.616q-.231 0-.424.192T5 5.616v12.769q0 .23.192.423t.423.192h12.77q.23 0 .423-.192t.192-.423v-7.489l1-1v8.489q0 .69-.462 1.153T18.384 20zM10 14v-2.615l8.944-8.944q.166-.166.348-.23t.385-.063q.189 0 .368.064t.326.21L21.483 3.5q.16.166.242.365t.083.4t-.061.382q-.06.18-.226.345L12.52 14zm10.814-9.715l-1.112-1.17zM11 13h1.092l6.666-6.666l-.546-.546l-.61-.584L11 11.806zm7.212-7.211l-.61-.585zl.546.546z" />
                          </svg>
                        </button>
                      </div>
                      <div>
                        <button className="text-white bg-cyan-400 rounded-md transition hover:scale-110 hover:shadow-xl focus:outline-none focus:ring active:bg-cyan-500" onClick={() => deleteTaste(taste.id)}>
                          <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 24 24">
                            <path fill="currentColor" d="M7.616 20q-.672 0-1.144-.472T6 18.385V6H5V5h4v-.77h6V5h4v1h-1v12.385q0 .69-.462 1.153T16.384 20zM17 6H7v12.385q0 .269.173.442t.443.173h8.769q.23 0 .423-.192t.192-.424zM9.808 17h1V8h-1zm3.384 0h1V8h-1zM7 6v13z" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div> */}


        {/* Mi tabla */}
        <table className='ml-12 w-full'>
          <thead className="bg-gray-300">
            <tr>
              <th className="w-72 px-6 py-3 border border-black text-s font-medium text-black">Producto</th>
              <th className="w-72 px-6 py-3 border border-black text-s font-medium text-black">Descripción</th>
              <th className="px-6 py-3 border border-black text-s font-medium text-black">Stock</th>
              <th className="px-6 py-3 border border-black text-s font-medium text-black">Categoría</th>
              <th className="px-6 py-3 border border-black text-s font-medium text-black">Tipo de producto</th>
              <th className="w-48 px-6 py-3 border border-black text-s font-medium text-black">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filtrarElementosSegunPagina().filter((taste) =>
              taste?.taste?.toLowerCase().includes(filtro.toLowerCase()) || taste?.ingredients?.toLowerCase().includes(filtro.toLowerCase())
            ).map((taste, index) => (
              <tr key={index} className={`hover:bg-gray-200 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-100'}`}>
                <td className="px-6 py-4 border border-black text-black">{taste.taste}</td>
                <td className="px-6 py-4 border border-black text-black">{taste.shortDescription}</td>
                <td className="px-6 py-4 border border-black text-black text-right">{taste.stock}</td>
                <td className="px-6 py-4 border border-black text-black">{taste.category?.description}</td>
                <td className="px-6 py-4 border border-black text-black">{taste.productType?.description}</td>
                <td className='whitespace-nowrap border-r border-b border-black text-black'>
                  <div className='grid grid-cols-2 text-center'>
                    <div>
                      <button onClick={() => navigate("/admin/tastes/" + taste.id)} className="text-white bg-cyan-400 rounded-md transition hover:scale-110 hover:shadow-xl focus:outline-none focus:ring active:bg-cyan-500">
                        <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 24 24">
                          <path fill="currentColor" d="M5.616 20q-.691 0-1.153-.462T4 18.384V5.616q0-.691.463-1.153T5.616 4h8.386l-1 1H5.616q-.231 0-.424.192T5 5.616v12.769q0 .23.192.423t.423.192h12.77q.23 0 .423-.192t.192-.423v-7.489l1-1v8.489q0 .69-.462 1.153T18.384 20zM10 14v-2.615l8.944-8.944q.166-.166.348-.23t.385-.063q.189 0 .368.064t.326.21L21.483 3.5q.16.166.242.365t.083.4t-.061.382q-.06.18-.226.345L12.52 14zm10.814-9.715l-1.112-1.17zM11 13h1.092l6.666-6.666l-.546-.546l-.61-.584L11 11.806zm7.212-7.211l-.61-.585zl.546.546z" />
                        </svg>
                      </button>
                    </div>
                    <div>
                      <button className="text-white bg-cyan-400 rounded-md transition hover:scale-110 hover:shadow-xl focus:outline-none focus:ring active:bg-cyan-500" onClick={() => deleteTaste(taste.id)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 24 24">
                          <path fill="currentColor" d="M7.616 20q-.672 0-1.144-.472T6 18.385V6H5V5h4v-.77h6V5h4v1h-1v12.385q0 .69-.462 1.153T16.384 20zM17 6H7v12.385q0 .269.173.442t.443.173h8.769q.23 0 .423-.192t.192-.424zM9.808 17h1V8h-1zm3.384 0h1V8h-1zM7 6v13z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Paginacion  */}
      </div>
      <div className='flex justify-center my-8'>
        {filtrarElementosSegunPagina().filter((taste) =>
          taste.taste.toLowerCase().includes(filtro.toLowerCase())
        ).length === 0 ? (
          <div className='px-4 py-2 text-center border border-gray-600 bg-red-100'>
            No se encontraron gustos que coincidan con su búsqueda.
          </div>
        ) : (
          <div>
            {Array.from({ length: calcularCantidadPaginas() }, (_, i) => (
              <button
                key={i + 1}
                className={`mx-2 py-2 px-4 rounded ${paginaActual === i + 1 ? 'bg-cyan-400 hover:bg-cyan-800 rounded-md text-white' : 'bg-gray-200'}`}
                onClick={() => cambiarPagina(i + 1)}
              >
                {i + 1}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default IceCreamTastes;