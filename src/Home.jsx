import { useEffect, useState } from 'react';
import axios from 'axios';
import Container from './Container.jsx';
import { Banner } from './components/Banner.jsx';
import { Pagination } from "flowbite-react";
import './Home.css';

function Home() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [cantidadItems, setCantidadItems] = useState(0);
  const [pagina, setPagina] = useState(1);
  const [filtro, setFiltro] = useState('');
  const [categorieSelected, setCategorieSelected] = useState([]);
  const [productTypesSelected, setProductTypesSelected] = useState([]);

  const chargeTastes = () => {
    setLoading(true);

    let categorias = [];
    categorias.push(categorieSelected);
    console.log("categorias", categorias)

    axios.get(`/tastes/list?pagina=${pagina}&cantidad=5&filtro=${filtro}&categorias=${categorias}`)
      .then((respuesta) => {
        console.log(respuesta.data)
        if (respuesta.status === 200) {
          setData(respuesta.data.data.rows);
          setCantidadItems(respuesta.data.data.count);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    chargeTastes();
  }, [pagina]);

  const onPageChange = (page) => setPagina(page);

  const totalPages = Math.ceil(cantidadItems / 5) || 1;

  return (
    <>
      <Banner />
      <div className='p-5 bg-cyan-200'>
        <div className="content-center">
          {loading ? (
            <div className="text-center text-xl">Cargando...</div>
          ) : (
            <Container tastes={data} categorieSetter={setCategorieSelected} />
          )}
          <Container tastes={data} />
          <div className="flex justify-center mt-5">
            <Pagination currentPage={pagina} totalPages={totalPages} onPageChange={onPageChange} />
          </div>
        </div>
      </div>
    </>
  );

}

export default Home;
