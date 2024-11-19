import { Outlet, Link } from "react-router-dom";

function LayoutAdmin() {
  return (
    <div>
      <div className="bg-cyan-400  font-bold text-white p-6 flex justify-center">
        <div className="p-2 mx-4 bg-cyan-400 rounded-md text-white border-solid border-white">
          <Link to="/admin">
            <img
              className="w-6 h-6 font-bold"
              src="https://img.icons8.com/?size=100&id=NzaHJt0XKIWl&format=png&color=FFFFFF"
            />
          </Link>
        </div>
        <div className="p-2 mx-4 bg-cyan-400 rounded-md text-white border-solid border-white">
          <Link to="tastes">PRODUCTOS</Link>
        </div>
        <div className="p-2 mx-4 bg-cyan-400 rounded-md text-white border-solid border-white">
          <Link to="categories">CATEGORIAS DE GUSTOS DE HELADOS</Link>
        </div>
        <div className="p-2 mx-4 bg-cyan-400 rounded-md text-white border-solid border-white">
          <Link to="productTypes">TIPOS DE ENVASADOS</Link>
        </div>
        <div className="p-2 mx-4 bg-cyan-400 rounded-md text-white border-solid border-white">
          <Link to="cupons">CUPONES DE DESCUENTO</Link>
        </div>
      </div>
      <Outlet />
    </div>
  );
}

export default LayoutAdmin;
