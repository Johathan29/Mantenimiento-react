import PropTypes from 'prop-types';
import { Link,useParams } from 'react-router-dom';
import ControllerChild from '../Controllers/ControllerChild';
import { useEffect } from 'react';

function DetailChild() {
  useEffect(() => {
    document.title = 'Users Page';
  }, []);
  let id = useParams();
  let userid=id
  const data = ControllerChild();
  let user=data.users.filter((item)=>  item.id ==userid.id)
  console.log(user.map(item=> item.firstName))
  console.log(userid.id)
  return (
    <>
  
{
  user.map(item=>(
    <div key={item.id} className='bg-transparent'>
      <h1 className='text-white !bg-transparent border-b-[1px] border-white w-full'> {item.firstName} {item.lastName}</h1>
    </div>
  ))

}

      

      
    
    
    </>
  );

}


export default DetailChild;
