import { useEffect, useState } from 'react';


function Listado(props) {
  const { tastes } = props;

  const elementosPorPagina = 5;

  const [data, setData] = useState([]);
  const [paginaActual, setPaginaActual] = useState(1);
  const [filtro, setFiltro] = useState('');

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
    <>

      <div className="p-5 flex">
        <div className="w-1/6 h-96 border border-black text-center ">
          <button className="m-8 font-bold text-blue-800">CATEGORIA</button>
          <button className="m-8 font-bold text-blue-800">TIPO DE ENVASADO</button>
        </div>
        <div>
          <input
            type='text'
            className='w-96 ml-20 my-4 border border-black rounded text-xl'
            placeholder='Buscar por gusto de helado 🔍'
            value={filtro}
            onChange={(e) => setFiltro(e.target.value)}
          />
          <div className="w-2/3 ml-12 grid grid-cols-2">
            {tastes.map((taste) => (
              <div key={taste.id} className="relative group mb-8">
                <div className="border border-black overflow-hidden shadow-lg grid grid-cols-2 mx-8" >
                  <img className="p-2 w-40 h-40" src={taste.photos} alt="Foto del helado"></img>
                  <div className="py-4 w-full">
                    <div className="font-bold text-xl mb-2">{taste.taste}</div>
                    <p className="text-gray-700 text-base">{taste.shortDescription}</p>
                    <p className="text-gray-700 text-base">INGREDIENTES: {taste.ingredients}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className='flex justify-center mt-8 ml-96'>
            {filtrarElementosSegunPagina().filter((taste) =>
              taste.taste.toLowerCase().includes(filtro.toLowerCase())
            ).length === 0 ? (
              <tr>
                <td colSpan={5} className='px-4 py-2 text-center border border-gray-400'>
                  No se encontraron gustos que coincidan con su búsqueda.
                </td>
              </tr>
            ) :
              <div  >
                {Array.from({ length: calcularCantidadPaginas() }, (_, i) => (
                  <button
                    key={i + 1}
                    className={`mx-2 py-2 px-4 rounded ${paginaActual === i + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200'
                      }`}
                    onClick={() => cambiarPagina(i + 1)}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
            }
          </div>
        </div>
      </div>
    </>
  );
}

export default Listado;
