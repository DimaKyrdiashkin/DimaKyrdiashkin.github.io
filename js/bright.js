let studyPosition = $('.study').offset();

$(window).on('scroll', function(){
    if($(document).scrollTop() > studyPosition.top-400){
        $(".cloudL, .cloudR").css('transform', 'scale(1)');
        $(".cloudL").css('left', '0');
        $(".cloudR").css('right', '0');
        console.log(1);
    }
});