// main.js o index.js
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import axios from "axios";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// Importación de componentes
import Home from "./Home.jsx";
import Dashboard from "./admin/Dashboard.jsx";
import IceCreamTastesIndex from "./admin/tastes/Index.jsx";
import CategoriesIndex from "./admin/categories/Index.jsx";
import LayoutAdmin from "./admin/LayoutAdmin.jsx";
import FormTaste from "./admin/tastes/Form.jsx";
import FormCategorie from "./admin/categories/Form.jsx";
import ProductTypesIndex from "./admin/productTypes/Index.jsx";
import FormProductTypes from "./admin/productTypes/Form.jsx";
import Header from "./components/Header.jsx";
import Pie from "./components/Pie.jsx";
import ProductDetail from "./components/ProductDetail.jsx";
import Login from "./admin/Login";
import Register from "./admin/Register";
import ProtectedPage from "./admin/ProtectedPage";
import App from "./App";
import FormCupon from "./admin/cupons/Form.jsx";
import CuponsIndex from "./admin/cupons/Index.jsx";
import ComentariosIndex from "./admin/comentarios/Index.jsx";

import "./index.css";

axios.defaults.baseURL = "http://localhost:3000";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "register",
    element: <Register />,
  },
  {
    path: "protected",
    element: <ProtectedPage />,
  },
  {
    path: "/home",
    element: <Home />,
  },
  {
    path: "products/:id",
    element: <ProductDetail />,
  },
  {
    path: "/admin",
    element: <LayoutAdmin />,
    children: [
      {
        path: "",
        element: <Dashboard />,
      },
      {
        path: "tastes",
        element: <IceCreamTastesIndex />,
      },
      {
        path: "tastes/:id",
        element: <FormTaste />,
      },
      {
        path: "categories",
        element: <CategoriesIndex />,
      },
      {
        path: "categories/:id",
        element: <FormCategorie />,
      },
      {
        path: "productTypes",
        element: <ProductTypesIndex />,
      },
      {
        path: "productTypes/:id",
        element: <FormProductTypes />,
      },
      {
        path: "cupons",
        element: <CuponsIndex />,
      },
      {
        path: "cupons/:id",
        element: <FormCupon />,
      },
      {
        path: "comentarios",
        element: <ComentariosIndex />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Header />
    <RouterProvider router={router} />
    <Pie />
  </StrictMode>
);
