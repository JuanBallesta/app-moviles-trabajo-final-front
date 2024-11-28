import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Pagination } from "flowbite-react";
import axios from "axios";

function ComentariosIndex() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(10);
  const [pagina, setPagina] = useState(1);
  const [paginaActual, setPaginaActual] = useState(1);
  const [cantidadItems, setCantidadItems] = useState(0);
  const [error, setError] = useState(null);
  const elementosPorPagina = 5;

  const chargeComentarios = () => {
    axios
      .get("/comentarios/")
      .then((respuesta) => {
        console.log("***", respuesta);

        setLoading(false);
        if (respuesta.status === 200) {
          console.log("respuesta correcta", respuesta.data.data);
          setData(respuesta.data.data);
        } else {
          console.log("error");
        }
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  const chargeTaste = async (id) => {
    try {
      const response = await axios.get(`/tastes/`);
      if (response.status === 200) {
        console.log("response", response);
        const data = response.data.data;
        setTaste(data);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    setLoading(true);
    chargeComentarios();
    chargeTaste();
  }, []);

  const onPageChange = (page) => setPagina(page);

  const totalPages = Math.ceil(cantidadItems / 5) || 1;

  const deleteComentariosDB = (id) => {
    axios
      .delete("/comentarios/" + id)
      .then((respuesta) => {
        chargeComentarios();
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  const deleteComentarios = (id) => {
    if (window.confirm("¿Desea borrar el comentario?")) {
      deleteComentariosDB(id);
    }
  };
  const filtrarElementosSegunPagina = () => {
    const inicio = (paginaActual - 1) * elementosPorPagina;
    const fin = inicio + elementosPorPagina;
    const _data = data.slice(inicio, fin);
    console.log("data:", _data);
    return _data;
  };

  return (
    <div className="bg-cyan-200 p-5">
      <div className="flex m-8">
        {loading && (
          <div className="p-2 mt-10 text-center text-white bg-green-400">
            Cargando ...
          </div>
        )}
        <section className="container px-4 mx-auto">
          <div className="flex flex-col">
            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
                  <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-gray-50 dark:bg-gray-800">
                      <tr>
                        <th className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                          Comentario
                        </th>
                        <th className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                          Producto
                        </th>
                        <th className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                          Acciones
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {data &&
                        data.length > 0 &&
                        data.map((comentarios, index) => (
                          <tr
                            key={index}
                            className={`hover:bg-gray-200 ${
                              index % 2 === 0 ? "bg-white" : "bg-gray-100"
                            }`}
                          >
                            <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                              <div className="inline-flex items-center gap-x-3">
                                <div className="flex items-center gap-x-2">
                                  <h2 className="font-medium text-gray-800 dark:text-white ">
                                    {comentarios.description}
                                  </h2>
                                </div>
                              </div>
                            </td>
                            <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                              <div className="inline-flex items-center gap-x-3">
                                <div className="flex items-center gap-x-2">
                                  <h2 className="font-medium text-gray-800 dark:text-white ">
                                    {comentarios.iceCreamTaste?.taste}
                                  </h2>
                                </div>
                              </div>
                            </td>

                            <td className="px-4 py-4 text-sm whitespace-nowrap">
                              <div className="flex items-center gap-x-6">
                                <button
                                  className="text-gray-500 transition-colors duration-200 hover:text-cyan-400 focus:outline-none hover:scale-125"
                                  onClick={() =>
                                    deleteComentarios(comentarios.id)
                                  }
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    className="w-5 h-5"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                                    />
                                  </svg>
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center mt-6">
            <div className="flex justify-center mt-5">
              <Pagination
                currentPage={pagina}
                totalPages={totalPages}
                onPageChange={onPageChange}
                previousLabel="← Anterior"
                nextLabel="Siguiente →"
              />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default ComentariosIndex;
