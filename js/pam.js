// parallax_home

const home_y = 0;
function parallax_home() {
    let h = window.pageYOffset;
    console.log("fun");
    if(h >= home_y && h<=1000){
        console.log(true);
        $(".home .container").css({top: `${parseInt(h)}px`})
        $(".home video").css({top: `${parseInt(h)}px`})
    }
}

// /parallax_home


$(window).on("scroll", parallax_home);