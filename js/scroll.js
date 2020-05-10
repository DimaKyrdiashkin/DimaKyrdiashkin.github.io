"user script";
let sect = document.querySelectorAll(".wrapper section");
let n = 0;




let windowHeight = window.innerHeight;

function scrollDownUp(topBlock){

    window.scrollTo(0,topBlock);
    for( let i of sect){
        i.classList.remove("scrollActive")
    }
    sect[n].classList.add('scrollActive');
}


var elem = document;


// миш клеса
if (elem.addEventListener) {
    if ('onwheel' in document) {
        // IE9+, FF17+, Ch31+
        elem.addEventListener("wheel", onWheel);
    } else if ('onmousewheel' in document) {
        // устаревший вариант события
        elem.addEventListener("mousewheel", onWheel);
    } else {
        // Firefox < 17
        elem.addEventListener("MozMousePixelScroll", onWheel);
    }
}
else elem.attachEvent("onmousewheel", onWheel);
function onWheel(e) {
    e = e || window.event;
    let delta = e.deltaY || e.detail || e.wheelDelta;


    let scrollActive = document.getElementsByClassName("scrollActive");
    let offsetTopSect = [];
    for( let i in sect){
        offsetTopSect.push(sect[i].offsetTop);
    }
    if(n< sect.length && n >=0) {

        if (windowHeight + pageYOffset >= scrollActive[0].offsetHeight + scrollActive[0].offsetTop + 100) {
            if (delta > 50 && n !== sect.length-1) {
                n++;
                scrollDownUp(offsetTopSect[n]);
            }
        } else if (pageYOffset <= scrollActive[0].offsetTop + 100) {
            if (delta < -50 && n!== 0) {
                n--;
                scrollDownUp(offsetTopSect[n]);
            }
        }
    }
}

// /миш клеса



// клава
document.addEventListener('keydown', function(event) {
    if (event.code === 'ArrowDown') {
        return false
    }
});


// /клава