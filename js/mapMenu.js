$(".menu_button").on("click", openMunu = () => {
    $(".menu_h1").toggleClass("menu_h1_open");
    if($(".menu").hasClass("opacity")){
        $('.subM').removeClass('subMenu1_open subMenu2_open subMenu3_open subMenu4_open menuUlActive');
        $(".side_bar").delay(1000).toggleClass("menu_open", 1000);
        $(".menu").delay(500).toggleClass("opacity", 500);
        if(document.documentElement.clientWidth <=480){
            $("span").css("margin", "2px");
        }else{
            $("span").css("margin", "3px");
        };
        $(".span_bot").css("transform", "rotate(0deg)");
        $(".span_top").css("transform", "rotate(0deg)");
        $(".span_mid").css("opacity", 1);
    }else{
        $(".side_bar").toggleClass("menu_open");
        if(document.documentElement.clientWidth <=480){
            $("span").css("margin", "1px");
        }else{
            $("span").css("margin", "2px");
        };
        $(".span_bot").css("transform", "rotate(32deg)");
        $(".span_top").css("transform", "rotate(-32deg)");
        $(".span_mid").css("opacity", 0);
        $(".menu").delay(1000).toggleClass("opacity", 1200);
    };
});
$(".menu_h1").on("click", openMunu = () => {
    $(".menu_h1").toggleClass("menu_h1_open");
    if($(".menu").hasClass("opacity")){
        $('.subM').removeClass('subMenu1_open subMenu2_open subMenu3_open subMenu4_open menuUlActive');
        $(".side_bar").delay(1000).toggleClass("menu_open", 1000);
        $(".menu").delay(500).toggleClass("opacity", 500);   
        $("span").css("margin", "3px");
        $(".span_bot").css("transform", "rotate(0deg)");
        $(".span_top").css("transform", "rotate(0deg)");
        $(".span_mid").css("opacity", 1);
    }else{
        $(".side_bar").toggleClass("menu_open");
        $("span").css("margin", "2px");
        $(".span_bot").css("transform", "rotate(32deg)");
        $(".span_top").css("transform", "rotate(-32deg)");
        $(".span_mid").css("opacity", 0);
        $(".menu").delay(1000).toggleClass("opacity", 1200);
    };
});

$('.menu a').on('click', (e) => {
    if(document.documentElement.clientWidth <=480){
        setTimeout(function(){
            $('.content').css('opacity', 1);
        }, 1200);
    };
    const active = e.target.closest('li');

    if(!! active.querySelector('ul.menuUlActive')){
        $('.menu_a_span_active').removeClass('menu_a_span_active');
        $('.subM').removeClass('subMenu1_open subMenu2_open subMenu3_open subMenu4_open menuUlActive');
        return;
    }
    $('.menu_a_span_active').removeClass('menu_a_span_active');
    $('.subM').removeClass('subMenu1_open subMenu2_open subMenu3_open subMenu4_open menuUlActive');
    if(e.target.hasAttribute('data-point')) {
        openPoint(e.target.getAttribute('data-point'));
        openMunu()
        $(".content-left").addClass("open_content-left", 1000);
        $(".content-right").addClass("open_content-right", 1000);
        return
    }
    const ulMenu = document.querySelectorAll('.menu>ul>li');
    let num;
    for(let i in ulMenu){
        if(active == ulMenu[i]){
            num = parseInt(i);
            break;
        }
    }
    if(!! active.querySelector('a span')){
        active.querySelector('a').classList.add('menu_a_span_active')
    }
    if(num === 0){
        $(active).children('ul').toggleClass('subMenu1_open menuUlActive');
    }else if(num === 1){
        $(active).children('ul').toggleClass('subMenu2_open menuUlActive');
    }else if(num === 2){
        $(active).children('ul').toggleClass('subMenu3_open menuUlActive');
    }
});