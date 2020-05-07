let videoFlag = false;
let time;

$(function(){
        play();
    }
);

function play() {
    $(".second_video").trigger('play');
    time = setTimeout(function() {
        $(".second_video").css("z-index", "-1");
        $('.first_video').trigger('play');
    }, 2000);
};

$(window).on('scroll', function(){
    if(pageYOffset >= $('.calc_head').offset().top){
        videoFlag = true;
        clearTimeout(time);
        $(".second_video").css("z-index", "2");
    }else if(pageYOffset < $('.calc_head').offset().top-400){
        play();
    };
});