import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom";
import axios from 'axios';

function FormCupon() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [code, setCode] = useState('');
  const [discount, setDiscount] = useState('');

  const chargeCupons = (id) => {
    axios.get('/cupons/' + id).then((respuesta) => {
      console.log("***", respuesta)
      setLoading(false);
      if (respuesta.status === 200) {
        console.log("respuesta correcta", respuesta.data.data)
        setCode(respuesta.data.data.code)
        setDiscount(respuesta.data.data.discount)
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
      setCode('');
    } else {
      chargeCupons(id);
    }
  }, [id])

  const saveCupon = (objetCupon) => {
    axios.post('/cupons/', objetCupon).then((respuesta) => {
      console.log("*", respuesta)

      setLoading(false);
      if (respuesta.status === 201) {
        console.log("respuesta correcta", respuesta.data.data)
        navigate("/admin/cupons");
        setData(respuesta.data.data)
      } else {
        console.log("error")
      }
    }).catch((error) => {
      console.log("error", error)
    });
  }

  const updateCupon = (objetCupon, id) => {
    axios.put('/cupons/' + id, objetCupon).then((respuesta) => {
      console.log("***", respuesta)

      setLoading(false);
      if (respuesta.status === 200) {
        console.log("respuesta correcta", respuesta.data.data)
        navigate("/admin/cupons");
        setData(respuesta.data.data)
      } else {
        console.log("error")
      }
    }).catch((error) => {
      console.log("error", error)
    });
  }

  const save = () => {
    const objData = {
      code: code,
      discount: discount,
    }
    console.log(objData)

    if (id === "new") {
      saveCupon(objData);
    } else {
      console.log("es editar")
      updateCupon(objData, id);
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
              <label className="block mb-1">Cupon de descuento</label>
              <input
                value={code}
                onChange={(e) => setCode(e.target.value)}
                type="text"
                placeholder="Codigo"
                className="p-3 bg-gray-200 rounded-md w-full font-medium border-gray-200 shadow-sm sm:text-sm focus:ring-2 focus:ring-cyan-400 focus:border-transparent" />
            </div>
            <div className="m-3">
              <label className="block mb-1">Total descuento</label>
              <input
                value={discount}
                onChange={(e) => setDiscount(e.target.value)}
                type="text"
                placeholder="Descuento"
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
                onClick={() => navigate("/admin/cupons")}>
                CANCELAR
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}

export default FormCupon