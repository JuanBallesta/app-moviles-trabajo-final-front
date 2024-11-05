import React, { useState, useRef, useEffect } from 'react';
import Logo from './../assets/tastes-img/logo.png';

export const Header = () => {
  const [menu, setMenu] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleClickAway = (e) => {
    if (isOpen && dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickAway);
    return () => {
      document.removeEventListener('mousedown', handleClickAway);
    };
  }, [isOpen]);

  return (
    <header className="bg-cyan-400 text-white font-bold">
      <div className="px-4 sm:px-6 lg:px-8 flex h-16">
        {/* Div home */}
        <div className="flex-1 md:flex md:items-center">
          <a className="block text-teal-600" href="/">
            <span className="sr-only">Home</span>
            <img className="w-10 h-10 md:w-12 md:h-12" src={Logo} alt='Logo de La Delicia' />
          </a>
        </div>

        {/* Div botones */}
        <div className="md:flex md:items-center">
          <nav aria-label="Global" className="hidden md:block">
            <ul className="flex items-center gap-6 text-sm">
              <li className='p-2 mx-4 bg-cyan-400 rounded-md hover:bg-cyan-800 text-white border-solid border-white'>
                <button >OFERTAS</button>
              </li>
              <li className='p-2 mx-4 bg-cyan-400 rounded-md hover:bg-cyan-800 text-white border-solid border-white'>
                <button>¿Cómo comprar?</button>
              </li>
              <li className='p-2 mx-4 bg-cyan-400 rounded-md hover:bg-cyan-800 text-white border-solid border-white'>
                <button>Mi carrito 🛒</button>
              </li>
            </ul>
          </nav>
        </div>

        {/* DIV notificaciones */}
        <div className="relative inline-block" ref={dropdownRef}>
          {/* Botón del dropdown */}
          <button
            onClick={toggleDropdown}
            className="relative z-10 block p-2 text-white bg-cyan-400 rounded-md focus:border-cyan-400 focus:ring-opacity-40 focus:ring-cyan-400 focus:ring focus:outline-none"
            aria-haspopup="true"
            aria-expanded={isOpen}
          >
            <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 22C10.8954 22 10 21.1046 10 20H14C14 21.1046 13.1046 22 12 22ZM20 19H4V17L6 16V10.5C6 7.038 7.421 4.793 10 4.18V2H13C12.3479 2.86394 11.9967 3.91762 12 5C12 5.25138 12.0187 5.50241 12.056 5.751H12C10.7799 5.67197 9.60301 6.21765 8.875 7.2C8.25255 8.18456 7.94714 9.33638 8 10.5V17H16V10.5C16 10.289 15.993 10.086 15.979 9.9C16.6405 10.0366 17.3226 10.039 17.985 9.907C17.996 10.118 18 10.319 18 10.507V16L20 17V19ZM17 8C16.3958 8.00073 15.8055 7.81839 15.307 7.477C14.1288 6.67158 13.6811 5.14761 14.2365 3.8329C14.7919 2.5182 16.1966 1.77678 17.5954 2.06004C18.9942 2.34329 19.9998 3.5728 20 5C20 6.65685 18.6569 8 17 8Z" fill="currentColor"></path>
            </svg>
          </button>

          {/* Menú del dropdown */}
          {isOpen && (
            <div className="absolute right-0 z-20 w-64 mt-2 overflow-hidden origin-top-right bg-white rounded-md shadow-lg sm:w-80 dark:bg-gray-800">
              <div className="py-2">
                {/* Muestra tus notificaciones aquí */}
                {/* Reemplaza el contenido de las notificaciones como necesites */}
                <a href="#" className="flex items-center px-4 py-3 -mx-2 transition-colors duration-300 transform border-b border-gray-100 hover:bg-gray-50 dark:hover:bg-gray-700 dark:border-gray-700">
                  <img className="flex-shrink-0 object-cover w-8 h-8 mx-1 rounded-full" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80" alt="avatar" />
                  <p className="mx-2 text-sm text-gray-600">
                    <span className="font-bold">Sara Salah</span> replied on the <span className="text-blue-500 hover:underline">Upload Image</span> article . 2m
                  </p>
                </a>
                {/* Agrega más elementos como sea necesario */}
              </div>
              <a href="#" className="block py-2 font-bold text-center text-white bg-gray-800 dark:bg-gray-700 hover:underline">See all notifications</a>
            </div>
          )}
        </div>

        {/* Div usuario */}
        <div className='ml-12'>
          <div className="hidden md:relative md:block">
            <button
              type="button"
              className="overflow-hidden rounded-full border border-gray-300 shadow-inner"
              onClick={() => setMenu(!menu)}>
              <span className="sr-only">Toggle dashboard menu</span>
              <img
                src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt=""
                className="size-10 object-cover" />
            </button>
            <div
              className={`${menu ? "hidden" : ""} absolute end-0 z-10 mt-0.5 w-56 divide-y divide-gray-100 rounded-md border border-gray-100 bg-white shadow-lg`}
              role="menu">
              <div className="p-2">
                <a href="#"
                  className="block rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                  role="menuitem">
                  Perfil
                </a>
                <a href="#"
                  className="block rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                  role="menuitem">
                  Mis compras
                </a>
              </div>
              <div className="p-2">
                <form method="POST" action="#">
                  <button
                    type="submit"
                    className="flex w-full items-center gap-2 rounded-lg px-4 py-2 text-sm text-red-700 hover:bg-red-50"
                    role="menuitem">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="size-4">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
                    </svg>
                    Cerrar sesión
                  </button>
                </form>
              </div>
            </div>
          </div>
          <div className="block md:hidden">
            <button className="rounded bg-gray-100 p-2 text-gray-600 transition hover:text-gray-600/75">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="size-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

      </div>
    </header>
  );
};

export default Header;
