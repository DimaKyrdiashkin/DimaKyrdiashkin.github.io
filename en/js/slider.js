const sl= [
    {
        id:0,
        img: "img/about/slider_1.png",
        text: "В 2017 году Марат Мынбаев впервые инвестировал в криптовалюты."
    },
    {
        id:1,
        img: "img/about/slider_2.png",
        text: "В 2017 году Марат Мынбаев впервые инвестировал в криптовалюты."
    },
    {
        id:2,
        img: "img/about/slider_3.png",
        text: "В 2017 году Марат Мынбаев впервые инвестировал в криптовалюты."
    }
];

class SliderMass extends Array{
    constructor() {
        super();



    }
    setSlider(x){
        if(typeof x == "object"){
            for(let i of x){
                this.push(i)
            }
        }
        else this.push(x)
    }

    indicatorsLi() {
        for (let i of sliderMass){
            let li = document.createElement('li');
            if(i.id === 0){
                li.classList = "active"
            }
            li.setAttribute("data-id-slider",i.id);
            ulSlider.append(li)
        }
    }
    activeLi(e){
        document.querySelector(".slider_carousel_inner_nav .active").classList.remove("active");
        e.target.classList.add("active")
    }
    aciveSlider(x){
        document.querySelector(".sliderActive p").innerHTML = this[x].text;
        document.querySelector(".sliderActive img").src = this[x].img;
    }
    sliderToLeft(){
        let finish = document.querySelector(".slider_carousel_inner .sliderActive");
        let sliderLeft = document.querySelector(".slider_carousel_inner .sliderLeft");
        let sliderRight = document.querySelector(".slider_carousel_inner .sliderRight");
        finish.classList.remove("sliderActive");
        finish.classList.add("sliderLeft");
        sliderLeft.classList.add("sliderRight");
        sliderLeft.classList.remove("sliderLeft");
        sliderRight.classList.add("sliderActive");
        sliderRight.classList.remove("sliderRight");
    }
    sliderToRight(){
        let finish = document.querySelector(".slider_carousel_inner .sliderActive");
        let sliderLeft = document.querySelector(".slider_carousel_inner .sliderLeft");
        let sliderRight = document.querySelector(".slider_carousel_inner .sliderRight");
        finish.classList.remove("sliderActive");
        finish.classList.add("sliderRight");
        sliderLeft.classList.add("sliderActive");
        sliderLeft.classList.remove("sliderLeft");
        sliderRight.classList.add("sliderLeft");
        sliderRight.classList.remove("sliderRight");
    }

}
const sliderMass = new SliderMass();

sliderMass.setSlider(sl);

let activeID= 0;

document.querySelector('.sliderActive p').innerHTML = sliderMass[activeID].text;
document.querySelector('.sliderActive img').src= sliderMass[activeID].img;

sliderMass.indicatorsLi();

document.querySelector(".slider_carousel_inner_nav").addEventListener("click",(e)=>{

    if(e.target.nodeName === "LI" && !e.target.classList.contains('active') ){
        let n = parseInt(e.target.getAttribute("data-id-slider"));
        if(n > parseInt(document.querySelector(".slider_carousel_inner_nav .active").getAttribute("data-id-slider")))sliderMass.sliderToLeft();
        else if(n < parseInt(document.querySelector(".slider_carousel_inner_nav .active").getAttribute("data-id-slider"))) sliderMass.sliderToRight();
        sliderMass.activeLi(e);
        sliderMass.aciveSlider(n);

        sliderAuto()
    }
});
function leftRight(x) {
    let liActive =  document.querySelector(".slider_carousel_inner_nav .active"),
        lenghtSlider = sliderMass.length,
        n = parseInt(liActive.getAttribute("data-id-slider"));

    if(x === 'left') {
        n--;
        sliderMass.sliderToRight();
    }
    else if(x === 'right') {
        n++;
        sliderMass.sliderToLeft();
    }
    liActive.classList.remove("active");
    if (n < 0) n = lenghtSlider -1;
    else if (n >= lenghtSlider) n = 0;
    document.querySelector(`li[data-id-slider='${n}']`).classList.add("active");
    sliderAuto();
    sliderMass.aciveSlider(n)
}



let sliderAutoSt;
function sliderAuto() {
    clearInterval(sliderAutoSt);
    sliderAutoSt = setInterval(function() {
        let liActive =  document.querySelector(".slider_carousel_inner_nav .active"),
            lenghtSlider = sliderMass.length,
            n = parseInt(liActive.getAttribute("data-id-slider"));
        n++;
        sliderMass.sliderToLeft();
        liActive.classList.remove("active");
        if (n >= lenghtSlider) n = 0;
        document.querySelector(`li[data-id-slider='${n}']`).classList.add("active");
        sliderMass.aciveSlider(n)
    }, 5000);
}
sliderAuto();


//
let wMouse;
document.querySelector(".slider_carousel").addEventListener("touchstart",(e)=>{
    wMouse = e.changedTouches[0].pageX;
});
document.querySelector(".slider_carousel").addEventListener("touchend", function(e) {
    if (wMouse > e.changedTouches[0].pageX + 50) leftRight("right");
    else if(wMouse < e.changedTouches[0].pageX - 50) leftRight("left");
});