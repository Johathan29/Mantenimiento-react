import { Outlet, Link, useParams } from 'react-router-dom';
import HeaderComponent from '../Components/HeaderComponent';
import FooterComponent from '../Components/FooterComponent';
import SliderShow from '../Components/SliderComponent';
import PathLocation from '../Hooks/Location';
export default function Layout() {
  const path=PathLocation();
  return (
    <>
      <HeaderComponent></HeaderComponent>
     
      {//  bg-gradient-to-bl from-[#245479] from-[#00779e] via-[#009cb0] via-10% to-[#06e095] to-90% == background-image:linear-gradient(to left bottom, #245479, #00779e, #009cb0, #00bfad, #06e095);'
}
<div className={path==='/' ? 'flex' : 'hidden' }>
<SliderShow />
</div>

<section className='bg-gradient-to-tr from-[#00779e] '>
      <div className="max-w-screen-xl md:mx-auto py-[2rem] px-[2rem] md:min-h-[45rem] h-auto" >
        <div className="h-full min-h-[28rem] " >
          <Outlet />
        </div>
      </div>
      </section>
      <FooterComponent></FooterComponent>
    </>
  );
}
