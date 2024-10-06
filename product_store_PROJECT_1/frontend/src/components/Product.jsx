import { useProducts } from "../context/useProducts";

const Product = ({ idx }) => {
  const { products, deleteProduct } = useProducts();

  const handleDeletion = async () => {
    try {
      await deleteProduct(products[idx]._id);
      console.log("delete successfully");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="border border-white flex flex-col gap-5 w-[150px]">
      <img
        src={products[idx].productImage}
        className="h-[100px] w-full object-cover"
      />
      <div className="flex flex-row justify-between m-1">
        <h1 className="m-1 font-bold font-sans">{products[idx].name}</h1>
        <button
          onClick={handleDeletion}
          className="m-1 border border-red-400 text-red-700"
        >
          Delete
        </button>
      </div>
      <h1 className="p-2 text-green-500">$ {products[idx].price}</h1>
    </div>
  );
};

export default Product;
