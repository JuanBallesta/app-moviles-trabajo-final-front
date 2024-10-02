import { Outlet, Link } from 'react-router-dom'

function LayoutAdmin() {
  return (
    <div>
      <div className='bg-cyan-500 font-bold text-white p-6 flex justify-center'>
        <div className='m-4 hover:text-black'>
          <Link to="tastes">PRODUCTOS</Link>
        </div>
        <div className='m-4 hover:text-black'>
          <Link to="categories">CATEGORIAS DE GUSTOS DE HELADOS</Link>
        </div>
        <div className='m-4 hover:text-black'>
          <Link to="productTypes">TIPOS DE ENVASADOS</Link>
        </div>
      </div>
      <Outlet />
    </div>
  )
}

export default LayoutAdmin