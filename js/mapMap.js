let mousePosition,
    offset = [0,0],
    isDown = false,
    scaleVal2 = 1,
    scaleVal = 0,
    sityW = $(".city").width()/200,
    sityH = $(".city").height()/200,
    div = document.querySelector(".city"),
    widthImg = -4096,
    heightImg = -2304;

let city = document.querySelector(".city");

div.addEventListener('mousedown', (e) =>{
    div.style.transition = "0s";
    div.style.cursor = "grabbing";
    isDown = true;
    offset = [
        div.offsetLeft - e.clientX,
        div.offsetTop - e.clientY
    ];
}, true);

document.addEventListener('mousemove', (e) =>{
    e.preventDefault();
    if (isDown) {
        mousePosition = {
            x : e.clientX,
            y : e.clientY

        };
        div.style.left = (mousePosition.x + offset[0]) + 'px';
        div.style.top  = (mousePosition.y + offset[1]) + 'px';
    }
}, true);

document.addEventListener('mouseup', ()=> {
    isDown = false;
    div.style.transition = "1s";
    if(city.offsetTop > sityH*parseInt(scaleVal*100)){
        div.style.top = sityH*parseInt(scaleVal*100)+"px";
    }
    if (city.offsetLeft > sityW*parseInt(scaleVal*100)+64){
        div.style.left = sityW*parseInt(scaleVal*100)+64+"px";
    }
    if(city.offsetTop < (heightImg+document.documentElement.clientHeight)-sityH*parseInt(scaleVal*100)){
        div.style.top = (heightImg+document.documentElement.clientHeight)-sityH*parseInt(scaleVal*100)+"px";
    };
    if(city.offsetLeft < (widthImg+document.documentElement.clientWidth)-sityW*parseInt(scaleVal*100)) {
        div.style.left = (widthImg+document.documentElement.clientWidth)-sityW*parseInt(scaleVal*100)+"px";
    };
    div.style.cursor = "grab";
}, true);

// $(window).bind('mousewheel', (e) => {
//     if (e.originalEvent.wheelDelta >= 0) {
//         if (scaleVal2 <= 2) {
//             scaleVal += 0.01;
//             scaleVal2 += 0.01;
//             city.style.transform = `scale(${scaleVal2})`
//         }else{
//             window.addEventListener('touchstart', e => e.preventDefault(), { passive: false });
//         };
//     } else{
//         if (scaleVal2 >= 1.01) {
//             scaleVal-=0.01;
//             scaleVal2-=0.01;
//             city.style.transform = `scale(${scaleVal2})`
//             if(city.offsetTop > sityH*parseInt(scaleVal*100)){
//                 div.style.top = sityH*parseInt(scaleVal*100)+"px";
//             }
//             if (city.offsetLeft > sityW * parseInt(scaleVal * 100) + 64){
//                 div.style.left = sityW * parseInt(scaleVal * 100) + 64 + "px";
//             }
//             if(city.offsetTop < (heightImg+document.documentElement.clientHeight) - sityH * parseInt(scaleVal * 100)){
//                 div.style.top = (heightImg+document.documentElement.clientHeight) - sityH * parseInt(scaleVal * 100) + "px";
//             }
//             if(city.offsetLeft < (widthImg+document.documentElement.clientWidth) - sityW * parseInt(scaleVal * 100)) {
//                 div.style.left = (widthImg+document.documentElement.clientWidth) - sityW * parseInt(scaleVal * 100) + "px";
//             }
//         }else{
//             window.addEventListener('touchstart', e => e.preventDefault(), { passive: false });
//             scaleVal = 0;
//             if(city.offsetTop > sityH * parseInt(scaleVal * 100)){
//                 div.style.top = sityH * parseInt(scaleVal * 100) + "px";
//             }
//             if(city.offsetLeft > sityW * parseInt(scaleVal * 100) + 64){
//                 div.style.left = sityW * parseInt(scaleVal * 100) + 64 + "px";
//             }
//             if(city.offsetTop < (-1898+document.documentElement.clientHeight) - sityH * parseInt(scaleVal * 100)){
//                 div.style.top = (heightImg+document.documentElement.clientHeight) - sityH * parseInt(scaleVal * 100)+"px";
//             }
//             if(city.offsetLeft < (widthImg+document.documentElement.clientWidth) - sityW * parseInt(scaleVal * 100)) {
//                 div.style.left = (widthImg+document.documentElement.clientWidth) - sityW * parseInt(scaleVal * 100)+"px";
//             };
//         };
//     };
// });

$(".point, svg.close").on("click",  () => {
    $(".content-left").toggleClass("open_content-left", 1000);
    $(".content-right").toggleClass("open_content-right", 1000);
});

// point clicl
let mapBD,
    numberPointActive = 1;
$.ajax({
    url: "./js/mapBd.json"
}).done(function(data) {
    mapBD=data;
})
const  fatherBlock = document.getElementById("father"),
    titlePointBlock = document.getElementById('titlePoint'),
    textHomePointBlock = document.getElementById('textHomePoint'),
    logoPointerBlock = document.getElementById('logoPointer')

$(".point").on("click",(e)=>{
    const numberPoint = parseInt(e.target.closest('.point').children[0].children[0].innerHTML);
    openPoint(numberPoint)
});

openPoint = (numberPoint) => {
    let father ='';
    numberPointActive = numberPoint;
    if(28 < numberPoint) numberPoint=1
    const BdName = `p${numberPoint}`;
    if(numberPoint<21){
        father = "Экосистема Amir Capital";
    }
    else if(numberPoint<23){
        father = "Cообщество Amir Partners (AmirID)";
    }
    else if(numberPoint<29){
        father = "Social Evolution Company";
    }
    fatherBlock.innerHTML = father;
    titlePointBlock.innerHTML = mapBD[BdName].title;
    textHomePointBlock.innerHTML = mapBD[BdName].text;
    logoPointerBlock.src = "img/map/logoPoint/"+mapBD[BdName].imgUrl;
}

document.getElementById('nextPoint').addEventListener('click', ()=>{
    const textActive = titlePointBlock.innerHTML
    for(let i in mapBD){
        if(mapBD[i].title == textActive)openPoint(parseInt(i.split('p')[1])+1)
    }
})

// pointSvg random

w_content_right_top = document.getElementById('content_right_top').clientWidth;
h_content_right_top = document.getElementById('content_right_top').clientHeight;
const  svg= document.querySelectorAll('.content-right_top_svg')

setInterval(
    ()=>{
        for(let i of svg){
            i.style.top = `${(Math.random()*h_content_right_top)}px`;
            i.style.left = `${(Math.random()*h_content_right_top)}px`;
        }
    },2000
)