import useControllerChild from '../Controllers/ControllerChild'
export default function BirthDayComponent(){
    const { users, loading ,error} = useControllerChild();
    let month="";
    let year="";
    let orderTodos=[]
    const birthday=()=>{
        
            const options1 = {
                day:'numeric',
                month: "long",
                
              };
            
              const  date = new Date();
              let IntlDateTimeFormat=  new Intl.DateTimeFormat("es-span",options1)
              month=IntlDateTimeFormat.format(date);
              year=date.getFullYear();
              const ordenar=  users.sort((a,b)=> new Date(a.birthDate) - new Date(b.birthDate))
              orderTodos=ordenar.map(item=>  {
                const name=item.firstName +" "+ item.lastName  
                const date= IntlDateTimeFormat.format(new Date(item.birthDate))
                const image=item.image
                const cargo=item.company.title
                const departamento=item.company.department
                
               return {
                date,
                name,
                image,
                cargo,
                departamento
               }
              })
    }
    birthday();
    return(
        <>
         <h1 className="text-left !bg-transparent text-[3rem] text-[#18489b] font-[emoji] capitalize birthday mt-[1rem]"  >Happy birthDay  </h1>
       <span className="text-center text-[2rem] font-[700] text-[#fff]  font-[emoji] block  w-[77%]  ">{month} {year}</span>
       <hr className='border-t-[6px] rounded-[15px] text-[#ffffff66]'/>
       <div className="max-w-screen-xl md:mx-auto md:px-0 px-4 mt-[1rem]"> 
            <ol className=" border-s-[7px] border-[#fff]"> 
                { orderTodos.map(item=>  item.date===month ?    
                <li className="mb-10 ms-6"> 
                    <div  className="flex items-center md:gap-[1rem]">
                    <span className="relative  flex items-center justify-center w-[3.5rem] h-[3.5rem] bg-blue-100 rounded-full start-[-3.4rem] md:start-[-3.2rem] ring-8 ring-white ">
                        <img className="rounded-full shadow-lg" src={item.image} alt="Bonnie image"/>
                    </span>
                    <div className="items-center justify-between w-full p-4 bg-white border border-gray-200 rounded-lg shadow-xs sm:flex  ">
                        <time className="mb-1 text-xs text-gray-400 font-bold text-right sm:order-last w-full sm:mb-0">{item.date}</time>
                        <div className="text-[1.2rem] w-full text-gray-500  w-full font-bold flex items-center gap-4">{item.name}
                        <span className="bg-gray-100 text-gray-800 text-xs font-normal me-2 px-2.5 py-0.5 rounded-sm  h-[-webkit-fill-available] flex items-center">Administrador de Portales</span>
                        <span className="bg-gray-100 text-gray-800 text-xs font-normal me-2 px-2.5 py-0.5 rounded-sm h-[-webkit-fill-available] flex items-center">Portales</span></div>
                    </div>
                </div>         
                </li>
                :"")}
            </ol>
        </div>
</>
    )
}