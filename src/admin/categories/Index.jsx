import { useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom"
import axios from 'axios';

function CategoriesIndex() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(10);

  const chargeCategories = () => {
    axios.get('/categories/').then((respuesta) => {
      console.log("***", respuesta)

      setLoading(false);
      if (respuesta.status === 200) {
        console.log("respuesta correcta", respuesta.data.data)
        setData(respuesta.data.data)
      } else {
        console.log("error")
      }
    }).catch((error) => {
      console.log("error", error)
    });
  }

  useEffect(() => {
    setLoading(true);
    chargeCategories();
  }, [])

  const deleteCategorieDB = (id) => {
    axios.delete('/categories/' + id).then((respuesta) => {
      chargeCategories();
    }).catch((error) => {
      console.log("error", error)
    });
  }

  const deleteCategorie = (id) => {
    if (window.confirm("¿Desea borrar la categoria de helado?")) {
      deleteCategorieDB(id);
    }
  }

  return (
    <div>
      <div className='flex m-8'>
        <div className='w-1/4'>
          <Link to="new">
            <button className='p-2 w-full bg-cyan-500 rounded-md hover:bg-cyan-800 text-white'>
              NUEVA CATEGORÍA
            </button>
          </Link>
        </div>
        {loading && <div className='p-2 mt-10 text-center text-white bg-green-500'>Cargando ...</div>}
        <div className='w-full ml-12'>
          <table className='w-full'>
            <thead className="bg-gray-300">
              <tr>
                <th className="px-6 py-3 border border-black text-s font-medium text-black">Descripción</th>
                <th className="px-6 py-3 border border-black text-s font-medium text-black">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {data && data.length > 0 && data.map((categorie, index) => (
                <tr key={index} className={`hover:bg-gray-200 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-100'}`}>
                  <td className="px-6 py-4 border border-black text-black">{categorie.description}</td>
                  <td className='whitespace-nowrap border-r border-b border-black text-black'>
                    <div className='grid grid-cols-2 text-center gap-2'>
                      <div>
                        <button onClick={() => navigate("/admin/categories/" + categorie.id)} className="p-1  bg-cyan-500 rounded-md hover:bg-cyan-800 text-white">
                          <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 24 24">
                            <path fill="currentColor" d="M5.616 20q-.691 0-1.153-.462T4 18.384V5.616q0-.691.463-1.153T5.616 4h8.386l-1 1H5.616q-.231 0-.424.192T5 5.616v12.769q0 .23.192.423t.423.192h12.77q.23 0 .423-.192t.192-.423v-7.489l1-1v8.489q0 .69-.462 1.153T18.384 20zM10 14v-2.615l8.944-8.944q.166-.166.348-.23t.385-.063q.189 0 .368.064t.326.21L21.483 3.5q.16.166.242.365t.083.4t-.061.382q-.06.18-.226.345L12.52 14zm10.814-9.715l-1.112-1.17zM11 13h1.092l6.666-6.666l-.546-.546l-.61-.584L11 11.806zm7.212-7.211l-.61-.585zl.546.546z" />
                          </svg>
                        </button>
                      </div>
                      <div>
                        <button className="p-1 bg-cyan-500 rounded-md hover:bg-cyan-800 text-white" onClick={() => deleteCategorie(categorie.id)}>
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
      </div>
    </div>
  )
}

export default CategoriesIndex

