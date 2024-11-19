import { useState } from "react";
import axios from "axios";
import { Button } from "flowbite-react";

export function Cupons({ setDiscount }) {
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [discount, setLocalDiscount] = useState(null); // Estado para almacenar el porcentaje de descuento.

  const chargeCupons = () => {
    setLoading(true);
    setError("");
    setLocalDiscount(null); // Reinicia el estado de descuento antes de realizar la solicitud.

    axios
      .get(`/cupons/getDiscount?code=${code}`)
      .then((respuesta) => {
        if (respuesta.status === 200) {
          const cuponData = respuesta.data.data;
          setDiscount(cuponData.discount); // Actualiza el descuento en el estado principal.
          setLocalDiscount(cuponData.discount); // Guarda el descuento localmente para mostrar el mensaje.
        }
      })
      .catch(() => {
        setError("CÓDIGO NO VÁLIDO");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="p-4 mt-8 border-2 border-rounded bg-white">
      <h1 className="text-center font-bold">CÓDIGO PROMOCIONAL</h1>
      <p className="mb-4">
        Si dispones de un código promocional, introdúcelo a continuación para
        acceder a las exclusivas ofertas con el descuento correspondiente.
      </p>
      <label className="mt-8 text-gray-500">CÓDIGO PROMOCIONAL</label>
      <div className="flex">
        <input
          type="text"
          className="w-3/4 rounded-md border-gray-200 p-2 mr-4 shadow-sm sm:text-sm focus:ring-2 focus:ring-cyan-400 focus:border-transparent"
          placeholder="Ingrese su código"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
        <Button
          className="w-48 text-center rounded bg-cyan-400 text-sm font-bold text-white transition hover:scale-110 hover:shadow-xl focus:outline-none focus:ring active:bg-cyan-500"
          onClick={chargeCupons}
          disabled={loading} // Evita múltiples solicitudes.
        >
          {loading ? "APLICANDO..." : "APLICAR"}
        </Button>
      </div>

      {error && <p className="mt-4 text-red-600">{error}</p>}

      {discount !== null && (
        <p className="mt-4 text-green-600 font-semibold">
          CODIGO APLICADO: CORRESPONDE A {discount}%.
        </p>
      )}
    </div>
  );
}

export default Cupons;
