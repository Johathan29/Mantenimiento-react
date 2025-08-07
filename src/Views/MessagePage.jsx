import { NavLink } from 'react-router-dom'
import data from '../Data/dataMensaje.json'
import { useEffect, useState } from 'react'
import TitlePage from '../Controllers/TitlePage'
import  insertDataMenssage from '../Hooks/miInsertion'
export default function MessagePage(){
    insertDataMenssage ()
    TitlePage()
    const [readed,setRead]=useState(false)
console.log(data)
/*const read=(item)=>{
   
document.getElementById('msgId-1').classNameList.add('read');

}*/
return(
    <>
    
<dl className="max-w-md text-gray-900 divide-y divide-gray-200 !text-white dark:divide-gray-700">
{data.map((item)=>
    <NavLink  to={'./:'+item.id} key={item.id} className="flex flex-col pb-3" id={'msgId-'+item.id}>
        <dt className="mb-1 text-gray-600 md:text-lg leading-[0rem]">{item.first_last_name}</dt>
        <dd className="text-[14px] font-semibold !text-white">{item.email}</dd>
        <dd className="text-sm font-semibold !text-gray-200 truncate w-1/2">{item.message}</dd>
    </NavLink>
    )}
</dl>

    </>
)
}