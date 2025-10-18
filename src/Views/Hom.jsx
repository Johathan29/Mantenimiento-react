
import Child from './Child.jsx';
import PropTypes from 'prop-types';
import ControllerChild from '../Controllers/ControllerChild.jsx';
import SliderShow from '../Components/SliderShow.jsx';
import Login from '../Components/FormLogin.jsx';
function Home() {
  useEffect(() => {
    document.title = 'Home Page';
  }, []);
  return (<>
    <SliderShow></SliderShow>
    <Login></Login>
    <section className='relative  bg-[#ffffffa3] '>
      <div className='max-w-screen-xl flex flex-wrap items-center justify-between mx-auto'>
        <Child  />
      </div>
    </section>
  
    </>);
}


export default Home;
