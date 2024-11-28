import React, { useEffect, useState } from "react";
import { Card } from "flowbite-react";
import axios from "axios";

const ProductComments = ({ iceCreamTasteId }) => {
  const [comentario, setComentario] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
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

    chargeComentarios();
  }, [iceCreamTasteId]);

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
