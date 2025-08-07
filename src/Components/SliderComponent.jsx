import hero from '../assets/hero.jpeg'
export default function SliderShow(){
    return(
    <>
    

<div id="animation-carousel" class="relative w-full" data-carousel="static">
  
    <div class="relative h-96 overflow-hidden  md:h-[35rem]">
        
        <div class="hidden duration-200 ease-linear" data-carousel-item>
            <img src={hero} class="absolute block w-auto -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="..."/>
        </div>
        
        <div class="hidden duration-200 ease-linear" data-carousel-item>
            <img src={hero}  class="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="..."/>
        </div>
    
        <div class="hidden duration-200 ease-linear" data-carousel-item="active">
            <img src={hero}  class="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="..."/>
        </div>

        <div class="hidden duration-200 ease-linear" data-carousel-item>
            <img src={hero}  class="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="..."/>
        </div>
      
        <div class="hidden duration-200 ease-linear" data-carousel-item>
            <img src={hero}  class="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="..."/>
        </div>
    </div>
    
    <button type="button" class="absolute top-0 start-0 z-30 !bg-transparent hover:!border-[0px]  flex items-center justify-center h-full px-4 cursor-pointer group focus:!outline-none " data-carousel-prev>
        <span class="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50">
            <svg class="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 1 1 5l4 4"/>
            </svg>
            <span class="sr-only">Previous</span>
        </span>
    </button>
    <button type="button" class="absolute top-0 end-0 z-30 !bg-transparent hover:!border-[0px]  flex items-center justify-center h-full px-4 cursor-pointer group focus:!outline-none" data-carousel-next>
        <span class="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30  group-hover:bg-white/50">
            <svg class="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4"/>
            </svg>
            <span class="sr-only">Next</span>
        </span>
    </button>
</div>

    </>)
}