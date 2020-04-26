//menu
let click = false;
$(".menu_button").on("click", function(even){
    console.log();
    if(!click){
        $(".menu_button").addClass("isFlip");
        $(".menu_button").delay(1000).addClass("isFlip_right",1000);
        $(".menu").addClass("menu_open");
        $("header").delay(1000).addClass("menu_open", 1000);
        $(".menu ul, .menu a, .licens").delay(2000).removeClass("hide", 1000);
        setTimeout(function(){click = true;}, 3000);
    }else{
        $(".menu ul, .menu a, .licens").addClass("hide", 1000);
        $(".menu_button").delay(1000).removeClass("isFlip_right",1000);
        $(".menu_button").delay(1000).removeClass("isFlip", 1000);
        $("header").delay(2000).removeClass("menu_open", 1000);
        $(".menu").delay(3000).removeClass("menu_open", 1000);
        setTimeout(function(){click = false;}, 3000);
    };
});
//menu/