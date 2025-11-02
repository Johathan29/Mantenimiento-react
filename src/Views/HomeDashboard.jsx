
import Child from './Child.jsx';
import { useEffect } from 'react';
import App from '../App.jsx';
import ChartDashboard from '../Components/chartDashboard.jsx';
function Homedashboard() {
  useEffect(() => {
    document.title = 'Dashboard';
  }, []);
  
  return (<>
    
    
    <section className='bg-gradient-to-br from-[#000a3c] to-[#04156a] '>
      <div className='py-4 md:mb-[3rem] max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
       <div className='max-w-screen-xl block flex-wrap items-center justify-between mx-auto  '>
         <h2 className='text-[#9f9999] text-5xl border-b-2 border-b-white/20' style={{textShadow:'3px 0px 0px #fffefe'}}>Dashboard</h2>
       </div>
      </div>
      <div className=''>
      
       <ChartDashboard/>
      </div>
    </section>

    </>);
}


export default Homedashboard;
