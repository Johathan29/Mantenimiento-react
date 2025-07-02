
import Child from './Child.jsx';
import PropTypes from 'prop-types';
import ControllerChild from '../Controllers/ControllerChild.jsx';
function Home() {
  const data = ControllerChild();
  return (
    <section className='relative  bg-[#ffffffa3] '>
      <div className='max-w-screen-xl flex flex-wrap items-center justify-between mx-auto'>
        <Child  />
      </div>
    </section>
  
  );
}


export default Home;
