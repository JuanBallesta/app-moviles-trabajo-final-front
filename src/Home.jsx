import { useEffect, useState } from 'react';

import axios from 'axios';
import Listado from './Listado.jsx';

import './Home.css'

function Home() {

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  const chargeTastes = () => {
    axios.get('/tastes/').then((respuesta) => {
      console.log("***", respuesta)

      setLoading(false);
      if (respuesta.status === 200) {
        console.log("respuesta correcta", respuesta.data.data)
        setData(respuesta.data.data)
      } else {
        console.log("error")
      }
    }).catch((error) => {
      console.log("error", error)
    });
  }

  useEffect(() => {
    setLoading(true);
    chargeTastes();
  }, [])

  return (
    <>
      <div className='bg-cyan-400 p-4 text-center font-bold italic text-5xl'>
        HELADERIA LA DELICIA
      </div>
      {(loading == true) ?
        <div>Cargando...</div>
        :
        <div> <Listado tastes={data} /> </div>
      }
    </>
  )
}

export default Home
