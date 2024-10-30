import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom";
import axios from 'axios';

function FormCategorie() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [description, setDescription] = useState('');

  const chargeCategorie = (id) => {
    axios.get('/categories/' + id).then((respuesta) => {
      console.log("***", respuesta)

      // setLoading(false);
      if (respuesta.status === 200) {
        console.log("respuesta correcta", respuesta.data.data)
        setDescription(respuesta.data.data.description)
        setData(respuesta.data.data)
      } else {
        console.log("error")
      }
    }).catch((error) => {
      console.log("error", error)
    });
  }

  useEffect(() => {
    console.log("id", id)

    if (id === "new") {
      setDescription('');
    } else {
      chargeCategorie(id);
    }
  }, [id])

  const saveCategorie = (objetCategorie) => {
    axios.post('/categories/', objetCategorie).then((respuesta) => {
      console.log("*", respuesta)

      // setLoading(false);
      if (respuesta.status === 201) {
        console.log("respuesta correcta", respuesta.data.data)
        navigate("/admin/categories");
        // setData(respuesta.data.data)
      } else {
        console.log("error")
      }
    }).catch((error) => {
      console.log("error", error)
    });
  }

  const updateCategorie = (objetCategorie, id) => {
    axios.put('/categories/' + id, objetCategorie).then((respuesta) => {
      console.log("***", respuesta)

      // setLoading(false);
      if (respuesta.status === 200) {
        console.log("respuesta correcta", respuesta.data.data)
        navigate("/admin/categories");
        // setData(respuesta.data.data)
      } else {
        console.log("error")
      }
    }).catch((error) => {
      console.log("error", error)
    });
  }

  const save = () => {
    const objData = {
      description: description,
    }
    console.log(objData)

    if (id === "new") {
      saveCategorie(objData);
    } else {
      console.log("es editar")
      updateCategorie(objData, id);
    }
  }
  const handleSubmit = (event) => {
    event.preventDefault();
    save();
  };

  return (
    <div className="bg-cyan-200 p-24">
      <form onSubmit={handleSubmit}>
        <div className="p-6 bg-cyan-200 text-xl border border-black font-bold rounded-md shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="m-3">
              <label className="block mb-1">Categoría</label>
              <input
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                type="text"
                placeholder="Categoría"
                className="p-3 bg-gray-200 rounded-md w-full font-medium border-gray-200 shadow-sm sm:text-sm focus:ring-2 focus:ring-cyan-400 focus:border-transparent" />
            </div>
            <div className="flex justify-between mt-4 col-span-2">
              <button
                type="submit"
                className="text-white w-full mx-8 p-2 rounded-xl cursor-pointer bg-cyan-400 font-bold transition hover:scale-105 hover:shadow-xl focus:outline-none focus:ring">
                GUARDAR
              </button>
              <button
                className="text-white w-full mx-8 p-2 rounded-xl cursor-pointer bg-cyan-400 font-bold transition hover:scale-105 hover:shadow-xl focus:outline-none focus:ring"
                onClick={() => navigate("/admin/categories")}>
                CANCELAR
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}

export default FormCategorie