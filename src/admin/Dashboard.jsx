import { Link } from "react-router-dom";

function Dashboard() {
  return (
    <div className="bg-cyan-200 p-4 max-h-full">
      <div className="container mx-auto p-4 ">
        <h1 className="text-center text-xl font-bold">PANEL DE CONTROL</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex flex-col m-4 items-center justify-center p-4 my-20 border rounded-lg shadow-md hover:scale-105 bg-white">
            <Link className="font-semibold text-gray-800" to="tastes">
              PRODUCTOS
            </Link>
          </div>

          <div className="flex flex-col m-4 items-center justify-center p-4 my-20 border rounded-lg shadow-md hover:scale-105 bg-white">
            <Link className="font-semibold text-gray-800" to="categories">
              CATEGORIAS DE GUSTOS DE HELADOS
            </Link>
          </div>

          <div className="flex flex-col m-4 items-center justify-center p-4 my-20 border rounded-lg shadow-md hover:scale-105 bg-white">
            <Link className="font-semibold text-gray-800" to="productTypes">
              TIPOS DE ENVASADOS
            </Link>
          </div>

          <div className="flex flex-col m-4 items-center justify-center p-4 my-20 border rounded-lg shadow-md hover:scale-105 bg-white">
            <Link className="font-semibold text-gray-800" to="cupons">
              CUPONES
            </Link>
          </div>

          <div className="flex flex-col m-4 items-center justify-center p-4 my-20 border rounded-lg shadow-md hover:scale-105 bg-white">
            <Link className="font-semibold text-gray-800" to="comentarios">
              COMENTARIOS
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
