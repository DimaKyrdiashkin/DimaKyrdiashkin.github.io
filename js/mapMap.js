var mousePosition;
var offset = [0,0];
var div;
var isDown = false;
let scaleVal2 = 1;
let scaleVal = 0;
let sityW = $(".city").width()/200;
let sityH = $(".city").height()/200;

div = document.querySelector(".city");

div.addEventListener('mousedown', function(e) {
    div.style.transition = "0s";
    div.style.cursor = "grabbing";
    isDown = true;
    offset = [
        div.offsetLeft - e.clientX,
        div.offsetTop - e.clientY
    ];
}, true);

document.addEventListener('mousemove', function(event) {
    event.preventDefault();
    if (isDown) {
        mousePosition = {
            x : event.clientX,
            y : event.clientY

        };
        div.style.left = (mousePosition.x + offset[0]) + 'px';
        div.style.top  = (mousePosition.y + offset[1]) + 'px';
    }
}, true);

document.addEventListener('mouseup', function() {
    isDown = false;
    div.style.transition = "1s";
    if(document.querySelector(".city").offsetTop > sityH*parseInt(scaleVal*100)){
        div.style.top = sityH*parseInt(scaleVal*100)+"px";
    };
    if (document.querySelector(".city").offsetLeft > sityW*parseInt(scaleVal*100)+64){
        div.style.left = sityW*parseInt(scaleVal*100)+64+"px";
    };
    if(document.querySelector(".city").offsetTop < (-1898+document.documentElement.clientHeight)-sityH*parseInt(scaleVal*100)){
        div.style.top = (-1898+document.documentElement.clientHeight)-sityH*parseInt(scaleVal*100)+"px";
    };
    if (document.querySelector(".city").offsetLeft < (-3000+document.documentElement.clientWidth)-sityW*parseInt(scaleVal*100)) {
        div.style.left = (-3000+document.documentElement.clientWidth)-sityW*parseInt(scaleVal*100)+"px";
    };
    div.style.cursor = "grab";
}, true);

$(window).bind('mousewheel', function(event) {
    if (event.originalEvent.wheelDelta >= 0) {
        if (scaleVal2 <= 2) {
            scaleVal+=0.01;
            scaleVal2+=0.01;
            $(".city").css('transform', 'scale('+scaleVal2+')');
        }else{
            window.addEventListener('touchstart', e => e.preventDefault(), { passive: false });
        };
    } else{
        if (scaleVal2 >= 1.01) {
            scaleVal-=0.01;
            scaleVal2-=0.01;
            $(".city").css('transform', 'scale('+scaleVal2+')');
            if(document.querySelector(".city").offsetTop > sityH*parseInt(scaleVal*100)){
                div.style.top = sityH*parseInt(scaleVal*100)+"px";
            };
            if (document.querySelector(".city").offsetLeft > sityW*parseInt(scaleVal*100)+64){
                div.style.left = sityW*parseInt(scaleVal*100)+64+"px";
            };
            if(document.querySelector(".city").offsetTop < (-1898+document.documentElement.clientHeight)-sityH*parseInt(scaleVal*100)){
                div.style.top = (-1898+document.documentElement.clientHeight)-sityH*parseInt(scaleVal*100)+"px";
            };
            if (document.querySelector(".city").offsetLeft < (-2800+document.documentElement.clientWidth)-sityW*parseInt(scaleVal*100)) {
                div.style.left = (-2800+document.documentElement.clientWidth)-sityW*parseInt(scaleVal*100)+"px";
            };
        }else{
            window.addEventListener('touchstart', e => e.preventDefault(), { passive: false });
            scaleVal = 0;
            if(document.querySelector(".city").offsetTop > sityH*parseInt(scaleVal*100)){
                div.style.top = sityH*parseInt(scaleVal*100)+"px";
            };
            if (document.querySelector(".city").offsetLeft > sityW*parseInt(scaleVal*100)+64){
                div.style.left = sityW*parseInt(scaleVal*100)+64+"px";
            };
            if(document.querySelector(".city").offsetTop < (-1898+document.documentElement.clientHeight)-sityH*parseInt(scaleVal*100)){
                div.style.top = (-1898+document.documentElement.clientHeight)-sityH*parseInt(scaleVal*100)+"px";
            };
            if (document.querySelector(".city").offsetLeft < (-2800+document.documentElement.clientWidth)-sityW*parseInt(scaleVal*100)) {
                div.style.left = (-2800+document.documentElement.clientWidth)-sityW*parseInt(scaleVal*100)+"px";
            };
        };
    };
});

$(".point, svg.close").on("click", function(){
    $(".content-left").toggleClass("open_content-left", 1000);
    $(".content-right").toggleClass("open_content-right", 1000);
});