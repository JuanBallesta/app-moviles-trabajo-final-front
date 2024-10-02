import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from 'axios';

function FormTaste() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [error, setError] = useState(null);
  const [taste, setTaste] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [shortDescription, setShortDescription] = useState('');
  const [nutritionalValue, setNutritionalValue] = useState('');
  const [photos, setPhotos] = useState('');
  const [stock, setStock] = useState('');
  const [categories, setCategories] = useState([]);
  const [productTypes, setProductTypes] = useState([]);

  const [categorieSeletected, setCategorieSeletected] = useState('');
  const [productTypesSeletected, setProductTypesSeletected] = useState('');
  const [loading, setLoading] = useState(false);

  const getCategories = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/categories/');
      setCategories(response.data.data);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  const getProductTypes = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/productTypes/');
      setProductTypes(response.data.data);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  const chargeTaste = async (id) => {
    try {
      const response = await axios.get('/tastes/' + id);
      if (response.status === 200) {
        const data = response.data.data;
        setTaste(data.taste);
        setIngredients(data.ingredients);
        setShortDescription(data.shortDescription);
        setNutritionalValue(data.nutritionalValue);
        setPhotos(data.photos);
        setStock(data.stock);
        setCategorieSeletected(data.categoryId || '');
        setProductTypesSeletected(data.productTypeId || '');
      }
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    getCategories();
    getProductTypes();
    if (id !== "new") {
      chargeTaste(id);
    } else {
      setTaste('');
      setIngredients('');
      setShortDescription('');
      setNutritionalValue('');
      setPhotos('');
      setStock('');
      setCategorieSeletected('');
      setProductTypesSeletected('');
    }
  }, [id]);

  const saveTaste = async (objTaste) => {
    try {
      const response = await axios.post('/tastes/', objTaste);
      if (response.status === 201) {
        navigate("/admin/tastes");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const updateTaste = async (objTaste, id) => {
    try {
      const response = await axios.put('/tastes/' + id, objTaste);
      if (response.status === 200) {
        navigate("/admin/tastes");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const save = () => {
    const objData = {
      taste,
      ingredients,
      shortDescription,
      nutritionalValue,
      photos,
      stock,
      categorie: categorieSeletected,
      productType: productTypesSeletected
    };
    console.log("soy oobDtata", objData);

    if (id === "new") {
      saveTaste(objData);
    } else {
      updateTaste(objData, id);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    save();
  };

  return (
    <div>
      <div className="p-6 mx-24 mt-24 text-xl border border-black font-bold bg-white rounded-md shadow-lg">
        {loading ? (
          <p>Cargando...</p>
        ) : (
          <div>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="m-3">
                <label className="block mb-1">Producto</label>
                <input
                  value={taste}
                  onChange={(e) => setTaste(e.target.value)}
                  type="text"
                  placeholder="Gusto de helado"
                  className="p-3 bg-gray-200 rounded-md w-full font-normal" />
              </div>
              <div className="m-3">
                <label className="block mb-1">Ingredientes</label>
                <input
                  value={ingredients}
                  onChange={(e) => setIngredients(e.target.value)}
                  type="text"
                  placeholder="Ingredientes"
                  className="p-3 bg-gray-200 rounded-md w-full font-normal" />
              </div>
              <div className="m-3">
                <label className="block mb-1">Descripción</label>
                <input
                  value={shortDescription}
                  onChange={(e) => setShortDescription(e.target.value)}
                  type="text"
                  placeholder="Descripción"
                  className="p-3 bg-gray-200 rounded-md w-full font-normal" />
              </div>
              <div className="m-3">
                <label className="block mb-1">Valor nutricional</label>
                <input
                  value={nutritionalValue}
                  onChange={(e) => setNutritionalValue(e.target.value)}
                  type="text"
                  placeholder="Valor nutricional"
                  className="p-3 bg-gray-200 rounded-md w-full font-normal" />
              </div>
              <div className="m-3">
                <label className="block mb-1">Fotos</label>
                <input
                  value={photos}
                  onChange={(e) => setPhotos(e.target.value)}
                  type="text"
                  placeholder="Fotos"
                  className="p-3 bg-gray-200 rounded-md w-full font-normal" />
              </div>
              <div className="m-3">
                <label className="block mb-1">Stock</label>
                <input
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                  type="text"
                  placeholder="Stock"
                  className="p-3 bg-gray-200 rounded-md w-full font-normal" />
              </div>
              <div className="m-3">
                <label className="block mb-1">Categoría</label>
                <select
                  className="p-3 bg-gray-200 rounded-md w-full font-normal"
                  onChange={(e) => setCategorieSeletected(e.target.value)}
                  value={categorieSeletected}>
                  <option value="">Selecciona una categoría</option>
                  {categories.map((categorie) => (
                    <option key={categorie.id} value={categorie.id}>
                      {categorie.description}
                    </option>
                  ))}
                </select>
              </div>
              <div className="m-3">
                <label className="block mb-1">Tipo de producto</label>
                <select
                  className="p-3 bg-gray-200 rounded-md w-full font-normal"
                  onChange={(e) => setProductTypesSeletected(e.target.value)}
                  value={productTypesSeletected}>
                  <option value="">Selecciona un tipo de producto</option>
                  {productTypes.map((product) => (
                    <option key={product.id} value={product.id}>
                      {product.description}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex justify-between mt-4 col-span-2">
                <button type="submit" className="bg-cyan-500 text-white w-1/3 p-2 rounded-xl cursor-pointer hover:bg-cyan-800">
                  GUARDAR
                </button>
                <button type="button" onClick={() => navigate("/admin/tastes")} className="bg-cyan-500 text-white w-1/3 p-2 rounded-xl cursor-pointer hover:bg-cyan-800">
                  CANCELAR
                </button>
              </div>
            </form>
          </div>
        )}
        {error && <p className="text-red-500">{error}</p>}
      </div>
    </div>
  );
}

export default FormTaste;
