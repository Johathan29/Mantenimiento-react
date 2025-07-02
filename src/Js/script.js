const body= document.getElementsByName("body");
body.addEventListener("click",function(){
    const header = document.getElementById('header')
    console.log(header.offsetTop)
})