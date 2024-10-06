import { useContext, createContext, useState, useEffect } from "react";
import {
  fetchAllProducts as fetchProductsAPI,
  deleteProduct as deleteProductAPI,
} from "../api/productsAPI";

const ProductsContext = createContext();

export const useProducts = () => {
  return useContext(ProductsContext);
};

export const ProductsContextProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refresh, setRefresh] = useState(false); // State variable to trigger refetch
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const data = await fetchProductsAPI();
      setProducts(data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    
    fetchProducts(); // Call the fetch function
  }, [refresh]); // Add refresh to the dependency array

  const deleteProduct = async (id) => {
    await deleteProductAPI(id);
    setRefresh((prev) => !prev); // Toggle refresh to trigger useEffect
  };

  return (
    <ProductsContext.Provider value={{ products, loading, deleteProduct, error, fetchProducts }}>
      {children}
    </ProductsContext.Provider>
  );
};
