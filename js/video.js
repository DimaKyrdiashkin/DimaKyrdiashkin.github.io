let time;
let flag = true;

$(function(){
        play();
    }
);

function play() {
    $(".second_video").trigger('play');
    if(flag){
        clearTimeout(time);
        flag = false;
        time = setTimeout(function() {
            $(".second_video").css("z-index", "-1");
            $('.first_video').trigger('play');
        }, 2000);
    }
};

$(window).on('scroll', function(){
    if(pageYOffset >= document.documentElement.clientHeight){
        $(".first_video").removeAttr('loop');
        document.querySelector('.first_video').currentTime = 0;
        document.querySelector('.second_video').currentTime = 0;
        $(".first_video").trigger('pause');
        $(".second_video").css("z-index", "2");
    }else if(pageYOffset < document.documentElement.clientHeight){
        $(".first_video").attr('loop', true);
        flag = true;
        play();
    };
});