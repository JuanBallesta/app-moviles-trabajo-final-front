import React, { useEffect, useState } from "react";
import { Card } from "flowbite-react";
import axios from "axios";

const ProductComments = ({ idProduct }) => {
  const [comentario, setComentario] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const chargeComentarios = async () => {
    console.log("id", idProduct);

    try {
      const response = await axios.get(
        `/comentarios/getComment/iceCreamTasteId/${idProduct}`
      );
      if (response.data.ok) {
        const comentariosOrdenados = response.data.data.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setComentario(comentariosOrdenados);
      }
    } catch (error) {
      console.error("Error al cargar los comentarios:", error);
      setError("Hubo un error al cargar los comentarios");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    chargeComentarios(idProduct);
  }, [idProduct]);

  return (
    <div className="mb-4 mt-8 ">
      <h1 className="ml-4 mb-2 font-bold text-xl">Comentarios de clientes</h1>

      {comentario.length === 0 ? (
        <p>No hay comentarios para este producto.</p>
      ) : (
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {comentario.map((comment) => (
            <div key={comment.id} className="w-full">
              <Card className="max-w-sm mx-auto">
                <p className="font-normal text-gray-700">
                  {comment.description}
                </p>
              </Card>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductComments;
