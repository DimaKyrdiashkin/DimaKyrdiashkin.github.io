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