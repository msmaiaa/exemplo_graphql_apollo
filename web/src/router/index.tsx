import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../pages/Login";
import Product from "../pages/Product";
import Products from "../pages/Products";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Products />} />
        <Route path="/login" element={<Login />} />
        <Route path="/product/:productId" element={<Product />} />
        <Route path="*" element={<Products />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
