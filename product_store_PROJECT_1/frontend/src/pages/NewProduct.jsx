import axios from "axios";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useProducts } from "../context/useProducts";

function NewProduct() {
  const {fetchProducts} = useProducts();

  const navigate = useNavigate();
  const formRef = useRef();
  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission behavior

    const formDict = new FormData(formRef.current);
    const name = formDict.get("productName");

    const newProduct = {
        name,
        price: formDict.get("productPrice"),
        productImage: formDict.get("productImage")
    }

    try {
        const resp = await axios.post('http://localhost:5000/products', newProduct);
        console.log('form submitted')
    } catch (e) {
        console.log('Error submitting form', e);
    }

    formRef.current.reset();
    const updateProducts = async () => {
      await fetchProducts();
    }
    updateProducts();

    navigate('/')
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen ">
      <form
        ref={formRef}
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg p-6 flex flex-col gap-4 w-80 text-black"
      >
        <h2 className="text-xl font-semibold text-center">Add A New Product</h2>

        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Product Name
          </label>
          <input
            name="productName"
            type="text"
            required
            placeholder="Enter product name"
            className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">Price</label>
          <input
            name="productPrice"
            required
            type="number"
            placeholder="Enter product price"
            className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Image Path
          </label>
          <input
            name="productImage"
            required
            type="text"
            placeholder="Enter product image path"
            className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <input
          type="submit"
          value="Submit"
          className="bg-blue-500 text-white font-semibold py-2 rounded-md hover:bg-blue-600 transition duration-200"
        />
      </form>
    </div>
  );
}

export default NewProduct;
