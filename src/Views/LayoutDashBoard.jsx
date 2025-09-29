import { Outlet, Link, useParams } from 'react-router-dom';
import DashboardComponent from '../Components/DashBoardComponent';
import FooterComponent from '../Components/FooterComponent';
import   '../Appdashboard.css';
import PathLocation from '../Hooks/Location';
export default function Layoutdashboard() {
  const path=PathLocation();
  return (
    <>
      <DashboardComponent></DashboardComponent>
     
      {//  bg-gradient-to-bl from-[#245479] from-[#00779e] via-[#009cb0] via-10% to-[#06e095] to-90% == background-image:linear-gradient(to left bottom, #245479, #00779e, #009cb0, #00bfad, #06e095);'
}


<section className='bg-white '>
     
        <div className="h-full min-h-[28rem] " >
          <Outlet />
        
      </div>
      </section>
      
    </>
    
  );
}
