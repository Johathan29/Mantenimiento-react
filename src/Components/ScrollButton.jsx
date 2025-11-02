import { useRef } from "react";

export default function ScrollButton({ onScroll }) {
    const sectionRef = useRef("scroll");
   const handleScroll = () => {
    const section = document.getElementById("products"); // 👈 ID del destino
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
       <div class="w-full text-center absolute bottom-0 py-8 ">
        <div class="flex justify-center">
          <div class="h-12 w-12 animate-bounce rounded-full bg-blue-500/40 p-1 cursor-pointer">
            <a onClick={handleScroll} class="size-6 !text-[1.7rem] !text-white !text-center">
              <i class="fa-solid fa-arrow-down a"></i>
            </a>
          </div>
        </div>
      </div>
  );
}
