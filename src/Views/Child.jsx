import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import ControllerChild from '../Controllers/ControllerChild';

function Child() {
  const data = ControllerChild();

  return (
    <>
    <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
      {data.users.map((item,index) => (
         <Link to={`/${item.id}`} className="group" key={item.id}>
        <img src={item.image} alt={item.firstName} className="aspect-square w-[15rem] rounded-lg bg-gray-200 object-cover group-hover:opacity-75 hover:shadow-xl xl:aspect-7/8"/>
        <h3 className="mt-4 text-sm text-gray-500">{item.firstName}</h3>
        <p className="mt-1 text-lg font-medium text-gray-900">{item.age}</p>
      </Link>
      )).slice(0,5)}
      
    </div>
    <Link to={'/userall'} className=" !text-white flex items-center w-max gap-4 upperca se !text-[12px] md:!text-[14px]  md:!p-[0.5rem] !p-[0.2rem] top-[3px] right-[4px] bg-[#00718d] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium  rounded-lg text-[12px] px-4 py-[2px]">all views<i className="fa-duotone fa-solid fa-arrow-right"></i></Link>
    </>
  );
}
Child.propTypes = {
  array: PropTypes.shape({
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.number.isRequired,
  }),
};

export default Child;
