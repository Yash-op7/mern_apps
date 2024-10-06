import { Link } from 'react-router-dom';

const Navbar = () => {
return(
    <div className='flex flex-row justify-between' >
        <Link className="border p-2 m-2" to='/'>Home</Link>
        <Link className="border p-2 m-2" to='/new'>New Product</Link>
      </div>
);
}
export default Navbar;