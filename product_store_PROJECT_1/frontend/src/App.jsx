import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import NewProduct from "./pages/NewProduct";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { ProductsContextProvider } from './context/useProducts';

function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <div className="flex-grow">
          <ProductsContextProvider>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/new" element={<NewProduct />} />
              <Route
                path="*"
                element={
                  <h1 className="text-xl text-center">
                    404 Route Doesn't Exist
                  </h1>
                }
              />
            </Routes>
          </ProductsContextProvider>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
