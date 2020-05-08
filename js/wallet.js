$(function() {
    $(".second_video").trigger('play');
    setTimeout(() => {
        $(".second_video").css("display", "none");
        $('.first_video').trigger('play');
    }, 2200);
});


// parallax_home

const home_y = 0;
function parallax_home() {
    let h = window.pageYOffset;
    if(h >= home_y && h<=500){
        $(".home .container").css({top: `${parseInt(h)}px`});
        $(".home video").css({top: `${parseInt(h)}px`});
    }
    if(h === home_y){
        $(".home video").css({top: 0})
    }
}

// /parallax_home


$(window).on("scroll", parallax_home);