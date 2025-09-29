import { Link } from 'react-router-dom';
import { useEffect, useMemo } from 'react';
import useControllerChild from '../Controllers/ControllerChild';
import PathLocation from '../Hooks/Location';

function Child() {
  const path = PathLocation();
  const { users, loading } = useControllerChild();

  // Slice solo si no estás en "/users_all"
  const visibleUsers = useMemo(() => {
    return path === '/users_all' ? users : users.slice(0, 5);
  }, [path, users]);

  useEffect(() => {
    // Si necesitas efectos secundarios al cambiar de ruta, colócalos aquí
    console.log(`Path changed to ${path}`);
  }, [path]);

  if (loading) {
    return <h1 className=" uppercase bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 inline-block text-transparent bg-clip-text ">Loading<span className='text-red-500'>...</span></h1>;
  }

  return (
    <>
      <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8 mb-4">
        {visibleUsers.map((item) => (
          <Link to={`/users_all/${item.id}`} className="group  hover:shadow-xl p-[1rem] border-[1px] rounded-xl border-gray-500 w-[15rem]" key={item.id}>
        <img src={item.image} alt={item.firstName} className="aspect-square w-[6rem] h-[6rem] rounded-full bg-gray-200 object-cover group-hover:opacity-75 xl:aspect-7/8"/>
        <h3 className="mt-4 text-[1.5rem] text-white">{item.firstName}</h3>
        <div className='flex gap-1 items-center leading-2'>
             <p className=" text-sm font-bold text-gray-900 ">Age: </p>
             <span className='text-[12px] font-medium text-gray-900 mr-2'>{item.age}</span>
             <p className=" text-sm font-bold text-gray-900 ">State: </p>
             <span className='text-[12px] font-medium text-gray-900'>{item.address.state}</span>
        </div>
        
     
          </Link>
        ))}
      </div>

      {path !== '/users_all' && (
        <Link
          to="/users_all"
          className="!text-white hover:bg-white hover:!text-[#00718d] hover:border-[#00718d] hover:border-[1px] border-[1px] flex items-center w-max gap-2 uppercase !text-[12px] md:!text-[14px] md:!p-[0.5rem] !p-[0.2rem] top-[3px] right-[4px] bg-[#00718d] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-[5px] text-[12px] px-4 py-[2px]"
        >
          All views <i className="fa-duotone fa-solid fa-arrow-right"></i>
        </Link>
      )}
    </>
  );
}

export default Child;
