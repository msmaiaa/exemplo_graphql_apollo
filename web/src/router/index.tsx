import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProtectedRoute from "../components/ProtectedRoute";
import CreateProduct from "../pages/CreateProduct";
import Login from "../pages/Login";
import Product from "../pages/Product";
import Products from "../pages/Products";
import UpdateProduct from "../pages/UpdateProduct";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<ProtectedRoute />}>
          <Route path="/products" element={<Products />} />
          <Route path="/products/new" element={<CreateProduct />} />
          <Route path="/product/:productId" element={<Product />} />
          <Route
            path="/product/:productId/update"
            element={<UpdateProduct />}
          />
        </Route>
        <Route index element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
