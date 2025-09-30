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
      <section className='bg-white  sm:ml-64'>
        <div className="h-full min-h-[28rem] " >
                <Outlet />
        
      </div>
      </section>
      
    </>
    
  );
}
