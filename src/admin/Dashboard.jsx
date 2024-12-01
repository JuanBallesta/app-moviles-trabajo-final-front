import { Link } from "react-router-dom";

function Dashboard() {
  return (
    <>
      <div className="m-10">
        <h1 className="text-center text-xl font-bold">PANEL DE CONTROL</h1>
        <div className="grid grid-cols-1 sm:grid-cols-3 mt-12 mx-24">
          <div className="px-8 py-12 w-96 h-36 my-4 shadow-lg shadow-gray-600 text-center hover:scale-105">
            <Link className="font-semibold text-gray-800" to="tastes">
              PRODUCTOS
            </Link>
          </div>

          <div className="px-8 py-12 w-96 h-36 my-4 shadow-lg shadow-gray-600 text-center hover:scale-105">
            <Link className="font-semibold text-gray-800" to="categories">
              CATEGORIAS DE GUSTOS DE HELADOS
            </Link>
          </div>

          <div className="px-8 py-12 w-96 h-36 my-4 shadow-lg shadow-gray-600 text-center hover:scale-105">
            <Link className="font-semibold text-gray-800" to="productTypes">
              TIPOS DE ENVASADOS
            </Link>
          </div>

          <div className="px-8 py-12 w-96 h-36 my-4 shadow-lg shadow-gray-600 text-center hover:scale-105">
            <Link className="font-semibold text-gray-800" to="cupons">
              CUPONES
            </Link>
          </div>

          <div className="px-8 py-12 w-96 h-36 my-4 shadow-lg shadow-gray-600 text-center hover:scale-105">
            <Link className="font-semibold text-gray-800" to="comentarios">
              COMENTARIOS
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
