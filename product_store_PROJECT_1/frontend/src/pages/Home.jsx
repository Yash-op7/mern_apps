import Product from '../components/Product';
import { useProducts } from '../context/useProducts';

function Home() {
  const {products, loading, error} = useProducts();

  if(loading) {
    return (
      <div> Loading...</div>
    )
  }

  if(error) {
    console.log('error occurred', error)
    return <div> Error...</div>
  }

  return (
    <div className="flex flex-col">
      <div className='relative mt-4 flex-grow flex flex-row flex-wrap gap-[10px]'>
      {products.map((_, idx) => {
        return <Product key={idx} idx={idx}/>
      })}
      </div>
    </div>
  );
}

export default Home;
