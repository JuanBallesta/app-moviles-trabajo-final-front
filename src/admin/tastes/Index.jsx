import { useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom"
import axios from 'axios';

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
    <div>
      {loading && <div className='p-2 mt-10 text-center text-white bg-cyan-500'>Cargando ...</div>}
      <div className='flex m-8'>
        <div className='w-1/4'>
          <Link to="new">
            <button className='p-2 w-full bg-cyan-500 rounded-md hover:bg-cyan-800 text-white'>NUEVO PRODUCTO</button>
          </Link>
          <input
            type='text'
            className='w-full mt-4 mb-4 p-2 border border-gray-600 rounded'
            placeholder='Buscar producto'
            value={filtro}
            onChange={(e) => setFiltro(e.target.value)} />
        </div>
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
                <td className="px-6 py-4 border border-black text-black">{taste.stock}</td>
                <td className="px-6 py-4 border border-black text-black">{taste.category?.description}</td>
                <td className="px-6 py-4 border border-black text-black">{taste.productType?.description}</td>
                <td className='whitespace-nowrap border-r border-b border-black text-black'>
                  <div className='grid grid-cols-2 text-center'>
                    <div>
                      <button onClick={() => navigate("/admin/tastes/" + taste.id)} className="text-white bg-cyan-500 rounded-md hover:bg-cyan-800">
                        <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 24 24">
                          <path fill="currentColor" d="M5.616 20q-.691 0-1.153-.462T4 18.384V5.616q0-.691.463-1.153T5.616 4h8.386l-1 1H5.616q-.231 0-.424.192T5 5.616v12.769q0 .23.192.423t.423.192h12.77q.23 0 .423-.192t.192-.423v-7.489l1-1v8.489q0 .69-.462 1.153T18.384 20zM10 14v-2.615l8.944-8.944q.166-.166.348-.23t.385-.063q.189 0 .368.064t.326.21L21.483 3.5q.16.166.242.365t.083.4t-.061.382q-.06.18-.226.345L12.52 14zm10.814-9.715l-1.112-1.17zM11 13h1.092l6.666-6.666l-.546-.546l-.61-.584L11 11.806zm7.212-7.211l-.61-.585zl.546.546z" />
                        </svg>
                      </button>
                    </div>
                    <div>
                      <button className="text-white bg-cyan-500 rounded-md hover:bg-cyan-800" onClick={() => deleteTaste(taste.id)}>
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
      </div>
      <div className='flex justify-center mt-8'>
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
                className={`mx-2 py-2 px-4 rounded ${paginaActual === i + 1 ? 'bg-cyan-500 text-white' : 'bg-gray-200'}`}
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