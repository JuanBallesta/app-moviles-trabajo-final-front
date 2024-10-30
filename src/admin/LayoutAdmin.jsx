import { Outlet, Link } from 'react-router-dom'

function LayoutAdmin() {
  return (
    <div>
      <div className='bg-cyan-400  font-bold text-white p-6 flex justify-center'>
        <div className='p-2 mx-4 bg-cyan-400 rounded-md hover:bg-cyan-800 text-white border-solid border-white'>
          <Link to="tastes">PRODUCTOS</Link>
        </div>
        <div className='p-2 mx-4 bg-cyan-400 rounded-md hover:bg-cyan-800 text-white border-solid border-white'>
          <Link to="categories">CATEGORIAS DE GUSTOS DE HELADOS</Link>
        </div>
        <div className='p-2 mx-4 bg-cyan-400 rounded-md hover:bg-cyan-800 text-white border-solid border-white'>
          <Link to="productTypes">TIPOS DE ENVASADOS</Link>
        </div>
      </div>
      <Outlet />
    </div>
  )
}

export default LayoutAdmin