import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await register(username, password);
      navigate('/login');
    } catch (error) {
      console.error('Error de registro:', error);
    }
  };

  return (
    <form onSubmit={handleRegister}>
      <input type="text" placeholder="Usuario" value={username} onChange={(e) => setUsername(e.target.value)} />
      <input type="password" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button type="submit">Registrarse</button>
    </form>
  //   <section className="bg-white dark:bg-gray-900">
  //   <div className="flex justify-center min-h-screen">
  //     <div
  //       className="hidden bg-cover lg:block lg:w-2/5"
  //       style={{
  //         backgroundImage: "url('https://images.unsplash.com/photo-1494621930069-4fd4b2e24a11?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=715&q=80')"
  //       }}
  //     ></div>

  //     <div className="flex items-center w-full max-w-3xl p-8 mx-auto lg:px-12 lg:w-3/5">
  //       <div className="w-full">
  //         <h1 className="text-2xl font-semibold tracking-wider text-gray-800 capitalize dark:text-white">
  //           Registrate gratis ahora.
  //         </h1>

  //         {/* <div className="mt-6">
  //           <h1 className="text-gray-500 dark:text-gray-300">Select type of account</h1>

  //           <div className="mt-3 md:flex md:items-center md:-mx-2">
  //             <button className="flex justify-center w-full px-6 py-3 text-white bg-blue-500 rounded-lg md:w-auto md:mx-2 focus:outline-none">
  //               <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
  //                 <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  //               </svg>

  //               <span className="mx-2">
  //                 Cliente
  //               </span>
  //             </button>

  //             <button className="flex justify-center w-full px-6 py-3 mt-4 text-blue-500 border border-blue-500 rounded-lg md:mt-0 md:w-auto md:mx-2 dark:border-blue-400 dark:text-blue-400 focus:outline-none">
  //               <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
  //                 <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  //               </svg>

  //               <span className="mx-2">
  //                 worker
  //               </span>
  //             </button>
  //           </div>
  //         </div> */}

  //         <form className="grid grid-cols-1 gap-6 mt-8 md:grid-cols-2">
  //           <div>
  //             <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">Nombre</label>
  //             <input
  //               type="text"
  //               placeholder="Nombre"
  //               className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
  //             />
  //           </div>

  //           <div>
  //             <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">Apellido</label>
  //             <input
  //               type="text"
  //               placeholder="Apellido"
  //               className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
  //             />
  //           </div>
  //           <div>
  //             <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">Nombre de usuario</label>
  //             <input
  //               type="text"
  //               placeholder="Nombre de usuario"
  //               className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
  //             />
  //           </div>

  //           <div>
  //             <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">Email</label>
  //             <input
  //               type="email"
  //               placeholder="xxx@example.com"
  //               className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
  //             />
  //           </div>

  //           <div>
  //             <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">Contraseña</label>
  //             <input
  //               type="password"
  //               placeholder="Contraseña"
  //               className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
  //             />
  //           </div>

  //           <div>
  //             <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">Confirm password</label>
  //             <input
  //               type="password"
  //               placeholder="Confirma la contraseña"
  //               className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
  //             />
  //           </div>

  //           <button className="flex items-center justify-between w-full px-6 py-3 text-sm tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50">
  //             <span>Registrarse</span>

  //             <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 rtl:-scale-x-100" viewBox="0 0 20 20" fill="currentColor">
  //               <path
  //                 fillRule="evenodd"
  //                 d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
  //                 clipRule="evenodd"
  //               />
  //             </svg>
  //           </button>
  //         </form>
  //       </div>
  //     </div>
  //   </div>
  // </section>
  );
};

export default Register;
