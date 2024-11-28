import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Button } from "flowbite-react";
import { Link } from "react-router-dom";
import ProductComments from "./ProductComments";

import axios from "axios";

const ProductDetail = ({ iceCreamTasteId }) => {
  const { id } = useParams();
  const [taste, setTaste] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [description, setdescription] = useState("");
  const [data, setData] = useState();
  const [comentario, setComentario] = useState([]);

  const chargeTaste = async (id) => {
    try {
      const response = await axios.get(`/tastes/${id}`);
      if (response.status === 200) {
        console.log("response", response);
        const data = response.data.data;
        setTaste(data);
      }
    } catch (error) {
      setError("ERROR AL OBTENER EL PRODUCTO", error.message);
    }
  };

  const chargeComentarios = async () => {
    try {
      const response = await axios.get(
        `/comentarios?iceCreamTasteId=${iceCreamTasteId}`
      );
      if (response.data.ok) {
        setComentario(response.data.data);
      }
    } catch (error) {
      setError("Hubo un error al cargar los comentarios");
    } finally {
      setLoading(false);
    }
  };
  const saveComentario = async (objComentario) => {
    try {
      const respuesta = await axios.post(`/comentarios/`, objComentario);
      if (respuesta.status === 201) {
        console.log("Comentario enviado correctamente", respuesta.data.data);
        cha();
      } else {
        console.log("Error al guardar el comentario");
      }
    } catch (error) {
      console.log("Error al enviar el comentario", error);
    }
  };

  useEffect(() => {
    chargeTaste(id);
  }, [id, iceCreamTasteId]);

  const save = () => {
    const objData = {
      description: description,
      iceCreamTasteId: taste.id,
    };
    console.log(objData);
    saveComentario(objData);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    save();
  };
  return (
    <>
      <div>
        <section className="py-12 sm:py-16">
          <div className="container mx-auto px-4">
            <nav className="flex">
              <ol role="list" className="flex items-center">
                <li className="text-left">
                  <div className="-m-1">
                    <Link
                      to="/home"
                      className="rounded-md p-1 text-sm font-medium text-gray-600 focus:text-gray-900 focus:shadow hover:text-gray-800"
                    >
                      Home
                    </Link>
                  </div>
                </li>

                <li className="text-left">
                  <div className="flex items-center">
                    <span className="mx-2 text-gray-400">/</span>
                    <div className="-m-1">
                      <Link
                        to="/home"
                        className="rounded-md p-1 text-sm font-medium text-gray-600 focus:text-gray-900 focus:shadow hover:text-gray-800"
                      >
                        Productos
                      </Link>
                    </div>
                  </div>
                </li>

                <li className="text-left">
                  <div className="flex items-center">
                    <span className="mx-2 text-gray-400">/</span>
                    <div className="-m-1">
                      <a
                        href="#"
                        className="rounded-md p-1 text-sm font-medium text-gray-600 focus:text-gray-900 focus:shadow hover:text-gray-800"
                        aria-current="page"
                      >
                        {taste.taste}
                      </a>
                    </div>
                  </div>
                </li>
              </ol>
            </nav>
            <div className="lg:col-gap-4 xl:col-gap-4 mt-8 grid grid-cols-1 gap-4 lg:mt-12 lg:grid-cols-5 lg:gap-4">
              <div className="lg:col-span-3 lg:row-end-1">
                <div className="lg:flex lg:items-start">
                  <div className="lg:order-2 lg:ml-5">
                    <div className="max-w-xl overflow-hidden rounded-lg">
                      <img
                        className="h-full w-full max-w-full object-cover"
                        src={taste.photos}
                        alt=""
                      />
                    </div>
                  </div>

                  <div className="mt-2 w-full lg:order-1 lg:w-32 lg:flex-shrink-0">
                    <div className="flex flex-row items-start lg:flex-col">
                      <button
                        type="button"
                        className="flex-0 aspect-square mb-3 h-20 overflow-hidden rounded-lg border-2 border-gray-900 text-center"
                      >
                        <img
                          className="h-full w-full object-cover"
                          src="/images/JHxMnVrtPMdcNU1s_7g7f.png"
                          alt=""
                        />
                      </button>
                      <button
                        type="button"
                        className="flex-0 aspect-square mb-3 h-20 overflow-hidden rounded-lg border-2 border-transparent text-center"
                      >
                        <img
                          className="h-full w-full object-cover"
                          src="/images/JHxMnVrtPMdcNU1s_7g7f.png"
                          alt=""
                        />
                      </button>
                      <button
                        type="button"
                        className="flex-0 aspect-square mb-3 h-20 overflow-hidden rounded-lg border-2 border-transparent text-center"
                      >
                        <img
                          className="h-full w-full object-cover"
                          src="/images/JHxMnVrtPMdcNU1s_7g7f.png"
                          alt=""
                        />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-2 lg:row-span-2 lg:row-end-2">
                <h1 className="sm: text-2xl font-bold text-gray-900 sm:text-3xl">
                  {taste.taste}
                </h1>
                <h1 className="font-bold text-gray-500">
                  {taste.productType?.description}
                </h1>

                <div className="mt-5 flex items-center">
                  <div className="flex items-center">
                    <svg
                      className="block h-4 w-4 align-middle text-yellow-500"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                        className=""
                      ></path>
                    </svg>
                    <svg
                      className="block h-4 w-4 align-middle text-yellow-500"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                        className=""
                      ></path>
                    </svg>
                    <svg
                      className="block h-4 w-4 align-middle text-yellow-500"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                        className=""
                      ></path>
                    </svg>
                    <svg
                      className="block h-4 w-4 align-middle text-yellow-500"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                        className=""
                      ></path>
                    </svg>
                    <svg
                      className="block h-4 w-4 align-middle text-yellow-500"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                        className=""
                      ></path>
                    </svg>
                  </div>
                  <p className="ml-2 text-sm font-medium text-gray-500">
                    1,209 Reviews
                  </p>
                </div>

                <div className="mt-10 flex flex-col items-center justify-between space-y-4 border-t border-b py-4 sm:flex-row sm:space-y-0">
                  <div className="flex items-end">
                    <h1 className="text-3xl font-bold">
                      ${taste.productType?.price}
                    </h1>
                  </div>

                  <Button
                    className="w-48 inline-block rounded bg-cyan-400 text-sm font-bold text-white transition hover:scale-110 hover:shadow-xl focus:outline-none focus:ring active:bg-cyan-500"
                    href="#"
                  >
                    AGREGAR AL CARRITO
                  </Button>
                </div>

                <ul className="mt-8 space-y-2">
                  <li className="flex items-center text-left text-sm font-medium text-gray-600">
                    <svg
                      className="mr-2 block h-5 w-5 align-middle text-gray-500"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        className=""
                      ></path>
                    </svg>
                    Envío gratuito
                  </li>

                  <li className="flex items-center text-left text-sm font-medium text-gray-600">
                    <svg
                      className="mr-2 block h-5 w-5 align-middle text-gray-500"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                        className=""
                      ></path>
                    </svg>
                    Cancela en cualquier momento
                  </li>
                </ul>

                {/* Características and Especificaciones */}
                <div className="text-left text-xl mt-8">
                  <h1 className="font-bold">Características</h1>
                  <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="py-3.5 px-4 text-sm font-semibold text-left rtl:text-right text-gray-700">
                          Tipo
                        </th>
                        <th className="py-3.5 px-4 text-sm font-semibold text-left rtl:text-right text-gray-500">
                          Descripción
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {taste.caracteristicas?.split("\n").map((item, index) => {
                        const [tipo, descripcion] = item.split("|");
                        return (
                          <tr
                            key={index}
                            className={`hover:bg-gray-200 ${
                              index % 2 === 0 ? "bg-white" : "bg-gray-100"
                            }`}
                          >
                            <td className="px-4 py-4 text-sm font-normal text-gray-500 whitespace-nowrap">
                              {tipo?.trim()}
                            </td>
                            <td className="px-4 py-4 text-sm font-normal text-gray-500 whitespace-nowrap">
                              {descripcion?.trim()}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                  <h1 className="font-bold mt-8">Especificaciones</h1>
                  <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="py-3.5 px-4 text-sm font-semibold text-left rtl:text-right text-gray-700">
                          Tipo
                        </th>
                        <th className="py-3.5 px-4 text-sm font-semibold text-left rtl:text-right text-gray-700">
                          Descripción
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {taste.especificaciones
                        ?.split("\n")
                        .map((item, index) => {
                          const [tipo, descripcion] = item.split("|");
                          return (
                            <tr
                              key={index}
                              className={`hover:bg-gray-200 ${
                                index % 2 === 0 ? "bg-white" : "bg-gray-100"
                              }`}
                            >
                              <td className="px-4 py-4 text-sm font-normal text-gray-500 whitespace-nowrap">
                                {tipo?.trim()}
                              </td>
                              <td className="px-4 py-4 text-sm font-normal text-gray-500 whitespace-nowrap">
                                {descripcion?.trim()}
                              </td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div>
          <h1 className="ml-4 font-bold text-xl">Comentarios del producto</h1>
          <form onSubmit={handleSubmit}>
            <div className="m-4">
              <textarea
                rows="8"
                cols="60"
                value={description}
                onChange={(e) => setdescription(e.target.value)}
                type="text"
                placeholder="Pon aqui tu opinión sobre este producto."
                className="p-3 bg-gray-200 rounded-md font-medium border-gray-200 shadow-sm sm:text-sm focus:ring-2 focus:ring-cyan-400 focus:border-transparent"
              />
              <Button
                type="submit"
                className="w-48 rounded bg-cyan-400 text-sm font-bold text-white transition hover:scale-110 hover:shadow-xl focus:outline-none focus:ring active:bg-cyan-500"
              >
                Enviar comentario
              </Button>
            </div>
          </form>
        </div>
      </div>
      <ProductComments iceCreamTasteId={iceCreamTasteId} />
    </>
  );
};

export default ProductDetail;
