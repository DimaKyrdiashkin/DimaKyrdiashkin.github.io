'user script'
const monthTabl = {
    displayPc:[
        "Январь",
        "Февраль",
        "Март",
        "Апрель",
        "Май",
        "Июнь",
        "Июль",
        "Август",
        "Сентябрь",
        "Октябрь",
        "Ноябрь",
        "Декабрь"
    ],
    displayMob:[
        "Янв.",
        "Фев.",
        "Март",
        "Апр.",
        "Май",
        "Июнь",
        "Июль",
        "Авг.",
        "Сен.",
        "Окт.",
        "Нояб.",
        "Дек."
    ],

}

const profitability ={
    y2018:{

        usdt:{
            January : 0,
            February : 0,
            March  : 0,
            April : 10.89,
            May : 29.22,
            June : 5.69,
            July: 2.31,
            August : 6.76,
            September : 7,
            October : 7.13,
            November : 3.78,
            December : 3.41,
        },
        btc:{
            January : 0,
            February : 0,
            March  : 0,
            April : 6.58,
            May : 8.37,
            June : 4.65,
            July: 2.67,
            August : 5.35,
            September : 5.15,
            October : 5.73,
            November : 3.74,
            December : 3,
        },
        etc:{
            January : 0,
            February : 0,
            March  : 0,
            April : 15.21,
            May : 29.22,
            June : 5.69,
            July: 2.31,
            August : 6.76,
            September : 7,
            October : 7.13,
            November : 3.78,
            December : 3.41,
        }
    },
    y2019:{
        usdt:{
            January : 3.65,
            February : 3.01,
            March  : 3.9,
            April : 10.89,
            May : 29.22,
            June : 5.69,
            July: 2.31,
            August : 6.76,
            September : 7,
            October : 7.13,
            November : 3.78,
            December : 3.41,
        },
        btc:{
            January : 2.86,
            February : 1.99,
            March  : 2.36,
            April : 6.58,
            May : 8.37,
            June : 4.65,
            July: 2.67,
            August : 5.35,
            September : 5.15,
            October : 5.73,
            November : 3.74,
            December : 3,
        },
        etc:{
            January : 5.17,
            February : 4.2,
            March  : 4.3,
            April : 7.69,
            May : 11.44,
            June : 4.48,
            July: 2.56,
            August : 6.2,
            September : 9.05,
            October : 6.48,
            November : 5.48,
            December : 2.75,
        },

    },
    y2020:{

        usdt:{
            January : 5.17,
            February : 6.13,
            March  : 6.75,
            April : 0,
            May : 0,
            June : 0,
            July: 0,
            August : 0,
            September : 0,
            October : 0,
            November : 0,
            December : 0,
        },
        btc:{
            January : 5.25,
            February : 2.6,
            March  : 4.85,
            April : 0,
            May : 0,
            June : 0,
            July: 0,
            August : 0,
            September : 0,
            October : 0,
            November : 0,
            December : 0,
        },
        etc:{
            January : 7.25,
            February : 4.27,
            March  : 4.1,
            April : 0,
            May : 0,
            June : 0,
            July: 0,
            August : 0,
            September : 0,
            October : 0,
            November : 0,
            December : 0,
        }
    },


};
const static_btc = document.getElementById("static_btc"),
    static_usdt = document.getElementById("static_usdt"),
    static_eth = document.getElementById("static_eth");
function profitability_calendar(year) {
    static_btc.innerHTML = "";
    static_usdt.innerHTML = "";
    static_eth.innerHTML = "";
    for(let key  in  profitability[year].btc ){
        let li = document.createElement("li");
        li.innerHTML= (profitability[year].btc[key] > 0) ? profitability[year].btc[key] +"%": "";
        static_btc.append(li);
    }
    for(let key  in  profitability[year].usdt ){
        let li = document.createElement("li");
        li.innerHTML= (profitability[year].usdt[key] >0) ? profitability[year].usdt[key]+"%": "";
        static_usdt.append(li);
    }
    for(let key  in  profitability[year].usdt ){
        let li = document.createElement("li");
        li.innerHTML= (profitability[year].usdt[key] >0) ? profitability[year].etc[key]+"%": "";
        static_eth.append(li);
    }
}
profitability_calendar("y2019");
window.addEventListener("resize", ()=>{
    static_mounts.innerHTML='';
    if( window.innerWidth > 589){
        for(let key  of  monthTabl.displayPc ){
            let li = document.createElement("li");
            li.innerHTML= key;
            static_mounts.append(li);
        }
    }else{
        for(let key  of  monthTabl.displayMob ){
            let li = document.createElement("li");
            li.innerHTML= key;
            static_mounts.append(li);
        }
    }
});
if( window.innerWidth > 589){
    for(let key  of  monthTabl.displayPc ){
        let li = document.createElement("li");
        li.innerHTML= key;
        static_mounts.append(li);
    }
}else{
    for(let key  of  monthTabl.displayMob ){
        let li = document.createElement("li");
        li.innerHTML= key;
        static_mounts.append(li);
    }
}

//profitability_animation
function profitability_animation(year = 2019){
    $(".profitability_right_static_eth").removeClass("slide_profitability", 300);
    $(".profitability_right_static_btc").delay(300).removeClass("slide_profitability", 300);
    $(".profitability_right_static_usdt").delay(600).removeClass("slide_profitability", 300);
    $(".profitability_right_static_usdt").delay(900).addClass("slide_profitability", 300);
    $(".profitability_right_static_btc").delay(1200).addClass("slide_profitability", 300);
    $(".profitability_right_static_eth").delay(1500).addClass("slide_profitability", 300);
    document.querySelector(".profitability_right_naw h2").innerHTML = year;
}
// /profitability_animation


//profitability

let offset = $(".profitability_right_static").offset();
$(window).on("scroll", () => {
    if($(document).scrollTop() > offset.top - 400){
        if(!$(".profitability_right_static").hasClass("clear_open")){
            $(".profitability_right_static_usdt").addClass("slide_profitability", 500);
            $(".profitability_right_static_btc").delay(500).addClass("slide_profitability", 500);
            $(".profitability_right_static_eth").delay(1000).addClass("slide_profitability", 500);
            $(".profitability_right_static").addClass("clear_open");
        }
    }
});
click = false;

$(".profitability_right_naw a").on("click", (e)=>{

    let year = parseInt(document.querySelector(".profitability_right_naw h2").innerHTML),
        a =e.target.getAttribute("data-profitability-a");
    if(a === "left" && year !== 2018 && !click){
        year--;
        click = true;
        profitability_animation(year);
        setTimeout(()=>{
            profitability_calendar("y"+year);
            document.querySelectorAll(".profitability_right_naw a")[1].style.opacity= "1";
            if (year === 2018) e.target.style.opacity = ".5";
            click = false;
        },1500);
    }
    else if(a === "right" && year !== 2020 && !click){
        year++;
        click = true;
        profitability_animation(year);
        setTimeout(()=> {
            profitability_calendar("y" + year);
            document.querySelectorAll(".profitability_right_naw a")[0].style.opacity = "1";
            if (year === 2020) e.target.style.opacity = ".5";
            click = false;
        },1500)
    }
    else console.log(false)
});

// /profitability




// // parallax_home
//
// const home_y = 0;
// function parallax_home() {
//     let h = window.pageYOffset;
//     console.log("fun");
//     if(h >= home_y && h<=1000){
//         console.log(true);
//         $(".promoContent .promoContent_info").css({top: `${parseInt(h)}px`})
//         $(".promoContent video").css({top: `${parseInt(h-200)}px`})
//     }
//     if(h === home_y){
//         $(".promoContent video").css({top: `${parseInt(0)}px`})
//     }
// }
//
// // /parallax_home
