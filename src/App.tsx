import { Route, Routes } from "react-router-dom";
import Header from "./Components/Header";

import Products from "./Pages/Products";
import CreateProduct from "./Pages/CreateProduct";
import ItemOne from "./Pages/ItemOne";
import Home from "./Pages/Home";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ItemOne />} />
        <Route path="/create-product" element={<CreateProduct />} />
      </Routes>
    </>
  );
}

export default App;
