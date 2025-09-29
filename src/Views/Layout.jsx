import { Outlet, Link } from 'react-router-dom';
import HeaderComponent from '../Components/HeaderComponent';
import FooterComponent from '../Components/FooterComponent';
export default function Layout() {
  return (
    <>
      <HeaderComponent></HeaderComponent>
     
      {//  bg-gradient-to-bl from-[#245479] from-[#00779e] via-[#009cb0] via-10% to-[#06e095] to-90% == background-image:linear-gradient(to left bottom, #245479, #00779e, #009cb0, #00bfad, #06e095);'
}
<section className='bg-gradient-to-tr from-[#00779e] '>
      <div className="max-w-screen-xl md:mx-auto py-[2rem] px-[2rem] " >
        <div className="h-full min-h-[28rem] " >
          <Outlet />
        </div>
      </div>
      </section>
      <FooterComponent></FooterComponent>
    </>
  );
}
