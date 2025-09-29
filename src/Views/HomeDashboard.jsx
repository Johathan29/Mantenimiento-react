
import Child from './Child.jsx';
import { useEffect } from 'react';
import App from '../App.jsx';
import ChartDashboard from '../Components/chartDashboard.jsx';
function Homedashboard() {
  useEffect(() => {
    document.title = 'Dashboard';
  }, []);
  
  return (<>
    
    
    <section className=' bg-[#b9d7f15e] '>
      <div className='bg-[#1f2937e3] p-8 md:mb-[3rem]'>
       <div className='max-w-screen-xl block flex-wrap items-center justify-between mx-auto px-[4rem]'>
         <h2 className='text-[#dde0e5] text-[2.5rem]'>Dashboard</h2>
       </div>
      </div>
      <div className='max-w-screen-xl block flex-wrap items-center justify-between mx-auto md:px-[4rem]'>
      
       <ChartDashboard/>
      </div>
    </section>

    </>);
}


export default Homedashboard;
