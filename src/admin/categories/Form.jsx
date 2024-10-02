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

  return (
    <div>
      <div className="p-6 mx-24 mt-24 text-xl border border-black font-bold bg-white rounded-md shadow-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="m-3">
            <label className="block mb-1">Categoría</label>
            <input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              type="text"
              placeholder="Categoría"
              className="p-3 text-black bg-gray-200 rounded-md w-full" />
          </div>
          <div className="flex justify-between mt-4 col-span-2">
            <button
              onClick={() => save()}
              className="bg-cyan-500 text-white w-1/3 p-2 rounded-xl cursor-pointer hover:bg-cyan-800">
              GUARDAR
            </button>
            <button
              className="bg-cyan-500 text-white w-1/3 p-2 rounded-xl cursor-pointer hover:bg-cyan-800"
              onClick={() => navigate("/admin/categories")}>
              CANCELAR
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FormCategorie