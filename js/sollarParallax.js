
let centerW =  window.innerWidth /2,
    centeH = sollar.offsetHeight/4;
sollar.addEventListener("mousemove", (e)=>{
    if(e.pageX > centerW){
        sollar.style.backgroundPositionX = `-${(e.pageX-centerW)/5}px`
    }
    else if(e.pageX < centerW){
        sollar.style.backgroundPositionX = `${(centerW - e.pageX)/5}px`
    }
    else sollar.style.backgroundPositionX ="0";
    if(e.clientY > centeH){
        sollar.style.backgroundPositionY = `calc(50% - ${(e.clientY - centeH)/5}px)`
    }
    else if(e.clientY < centeH){
        sollar.style.backgroundPositionY = `calc(50% + ${(centeH - e.clientY)/5}px)`
    }
    else sollar.style.backgroundPositionY ="center"

});