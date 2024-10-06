import axios from "axios";

export async function fetchAllProducts() {
    const response = await axios.get('http://localhost:5000/products');
    return response.data;
}

export const deleteProduct = async (id) => {
    const response = await axios.delete(`http://localhost:5000/products/${id}`);
};
