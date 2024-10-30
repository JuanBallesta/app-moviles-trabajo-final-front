import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom";
import axios from 'axios';

function FormProductTypes() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');

  const chargeProductTypes = (id) => {
    axios.get('/productTypes/' + id).then((respuesta) => {
      console.log("***", respuesta)

      // setLoading(false);
      if (respuesta.status === 200) {
        console.log("respuesta correcta", respuesta.data.data)
        setDescription(respuesta.data.data.description)
        setPrice(respuesta.data.data.price)
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
      setPrice('');
    } else {
      chargeProductTypes(id);
    }
  }, [id])

  const saveProductTypes = (objetProductTypes) => {
    axios.post('/productTypes/', objetProductTypes).then((respuesta) => {
      console.log("*", respuesta)

      // setLoading(false);
      if (respuesta.status === 201) {
        console.log("respuesta correcta", respuesta.data.data)
        navigate("/admin/productTypes");
        // setData(respuesta.data.data)
      } else {
        console.log("error")
      }
    }).catch((error) => {
      console.log("error", error)
    });
  }

  const updateProductTypes = (objetProductTypes, id) => {
    axios.put('/productTypes/' + id, objetProductTypes).then((respuesta) => {
      console.log("***", respuesta)

      // setLoading(false);
      if (respuesta.status === 200) {
        console.log("respuesta correcta", respuesta.data.data)
        navigate("/admin/productTypes");
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
      price: price
    }
    console.log(objData)

    if (id === "new") {
      saveProductTypes(objData);
    } else {
      console.log("es editar")
      updateProductTypes(objData, id);
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    save();
  };

  return (
    <div className="bg-cyan-200 p-24">
      <div className="p-6 text-xl border border-black font-bold bg-white rounded-md shadow-lg">
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="m-3">
            <label className="block mb-1">Tipo de envasado</label>
            <input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              type="text"
              placeholder="Tipo de envasado"
              className="p-3 bg-gray-200 rounded-md w-full font-medium border-gray-200 shadow-sm sm:text-sm focus:ring-2 focus:ring-cyan-400 focus:border-transparent" />
          </div>
          <div className="m-3">
            <label className="block mb-1">Precio</label>
            <input
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              type="text"
              placeholder="Precio"
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
              onClick={() => navigate("/admin/productTypes")}>
              CANCELAR
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default FormProductTypes