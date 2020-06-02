//menu;
let click = false;
$('.mainSubmenu').on('click', function(){
    $('.mainSubmenu ul').toggleClass('mainSubmenu_open');
});

$(".menu_button").on("click", function(even){
    console.log();
    if(!click){
        $(".menu_button").addClass("isFlip");
        // $(".menu_button").delay(500).addClass("isFlip_right",1000);
        $(".menu").addClass("menu_open");
        $("header").delay(500).addClass("menu_open", 500);
        $(".menu ul, .menu a, .licens").delay(1000).removeClass("hide", 500);
        setTimeout(function(){click = true;}, 1200);
    }else{
        $(".menu ul, .menu a, .licens").addClass("hide", 500);
        $(".menu_button").delay(500).removeClass("isFlip_right",800);
        $(".menu_button").delay(500).removeClass("isFlip", 500);
        $("header").delay(1000).removeClass("menu_open", 500);
        $(".menu").delay(1500).removeClass("menu_open", 500);
        setTimeout(function(){click = false;}, 1200);
    };
});
// //menu/
