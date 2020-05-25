$(".menu_button").on("click", () => {
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
$('.menu ul>li').on('click', (event) => {
    const menuUlActive = $('.menuUlActive')[0];
    const li = $(event.target).children('ul')[0];

    $('.subM').removeClass('subMenu1_open subMenu2_open subMenu3_open subMenu4_open menuUlActive');
    let num = $(event.target).children('ul').attr('class')[12];
    if(li != menuUlActive){
        if(num == 1){
            $(event.target).children('ul').toggleClass('subMenu1_open menuUlActive');
        }else if(num == 2){
            $(event.target).children('ul').toggleClass('subMenu2_open menuUlActive');
        }else if(num == 3){
            $(event.target).children('ul').toggleClass('subMenu3_open menuUlActive');
        }else if(num == 4){
            $(event.target).children('ul').toggleClass('subMenu4_open menuUlActive');
        };
    };
});