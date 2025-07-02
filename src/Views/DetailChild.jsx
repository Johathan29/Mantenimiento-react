import PropTypes from 'prop-types';
import { Link,useParams } from 'react-router-dom';
import ControllerChild from '../Controllers/ControllerChild';
function DetailChild() {
  let id = useParams();
  let userid=id
  const data=ControllerChild();
  let user=data.filter((item)=>  item.id ==userid.id)
  console.log(user.map(item=> item.firstName))
  console.log(userid.id)
  return (
    <>
  
{
  user.map(item=>(
<div key={item.id}>
      <h1 className='text-[#151fd2aa]'> {item.firstName}</h1>
    </div>
  ))
}
    
      

      
    
    
    </>
  );

}


export default DetailChild;
