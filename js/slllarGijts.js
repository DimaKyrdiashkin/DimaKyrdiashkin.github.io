"user script"
const  massSvg = document.querySelectorAll('.promoContent_right svg')
randXY = () =>{
    return Math.floor(Math.random() * 101) - 50
}
setInterval(()=>{
    for(let i of massSvg){
        i.style.transform = `translateX(${randXY()}px) translateY(${randXY()}px)`
    }
    },1500)