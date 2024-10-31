import { useState, useEffect } from "react";
import axios from "axios";

function Filters(props) {
  const {
    filtro,
    categorieSelected,
    productTypesSelected,
    onFiltroChange,
    onCategorieChange,
    onProductTypesChange,
  } = props;
  const [categories, setCategories] = useState([]);
  const [productTypes, setProductTypes] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getCategories = async () => {
      try {
        const response = await axios.get('/categories/');
        setCategories(response.data.data);
      } catch (error) {
        setError(error.message);
      }
    };

    const getProductTypes = async () => {
      try {
        const response = await axios.get('/productTypes/');
        setProductTypes(response.data.data);
      } catch (error) {
        setError(error.message);
      }
    };

    getCategories();
    getProductTypes();
  }, []);

  const handleCategoryChange = (e) => {
    const value = e.target.value;
    const updatedCategories = categorieSelected.includes(value)
      ? categorieSelected.filter(id => id !== value)
      : [...categorieSelected, value];
    console.log("update", updatedCategories)
    onCategorieChange(updatedCategories);
  };

  const handleProductTypeChange = (e) => {
    const value = e.target.value;
    const updatedProductTypes = productTypesSelected.includes(value)
      ? productTypesSelected.filter(id => id !== value)
      : [...productTypesSelected, value];

    onProductTypesChange(updatedProductTypes);
  };

  return (
    <div className="items-left ">
      <div className="relative mt-6 mb-4">
        {/* Input de busqueda */}
        <label htmlFor="Search" className="sr-only"> </label>
        <input
          type="text"
          placeholder="Buscar por gusto de helado"
          className="w-full rounded-md border-gray-200 p-2 shadow-sm sm:text-sm focus:ring-2 focus:ring-cyan-400 focus:border-transparent"
          value={filtro}
          onChange={(e) => onFiltroChange(e.target.value)} />
        <span className="absolute inset-y-0 end-0 grid w-10 place-content-center">
          <button type="button" className="text-gray-600 hover:text-gray-700">
            <span className="sr-only"></span>
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
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
          </button>
        </span>
      </div>

      {/* Busqueda por categoria y tipo */}
      <div className="bg-white h-64 p-2">
        <fieldset>
          <legend className="text-lg font-medium text-gray-900 underline underline-offset-4">Categoría</legend>
          <p className="mt-1 text-pretty text-sm text-gray-700">
            Seleccione la categoria de helado que desea buscar.
          </p>
          <div className="my-4 space-y-2">
            <label className="cursor-pointer items-start font-bold gap-4 mb-1 ">
              {categories.map((categorie) => (
                <div key={categorie.id}>
                  <label className="flex items-center">
                    <input type="checkbox"
                      className="size-4 rounded border-gray-300 mr-2"
                      value={categorie.id}
                      checked={categorieSelected.includes(String(categorie.id))}
                      onChange={handleCategoryChange}
                    />
                    <strong className="font-medium text-gray-900">{categorie.description}</strong>
                  </label>
                </div>
              ))}
            </label>
          </div>
        </fieldset>
      </div>

      <div className="bg-white h-64 p-2">
        <fieldset>
          <legend className="text-lg font-medium text-gray-900 underline underline-offset-4">Tipo de envasado</legend>
          <p className="mt-1 text-pretty text-sm text-gray-700">
            Seleccione el tipo de envasado que desea buscar.
          </p>
          <div className="mt-4 space-y-2">
            <label className="cursor-pointer items-start font-bold gap-4 mb-1 ">
              {productTypes.map((product) => (
                <div key={product.id}>
                  <label className="flex items-center">
                    <input type="checkbox"
                      className="size-4 rounded border-gray-300 mr-2"
                      value={product.id}
                      checked={productTypesSelected.includes(String(product.id))}
                      onChange={handleProductTypeChange} />
                    <strong className="font-medium text-gray-900">{product.description}</strong>
                  </label>
                </div>
              ))}
            </label>
          </div>
        </fieldset>
      </div>
    </div>
  );
}

export default Filters;
