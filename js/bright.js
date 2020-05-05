let studyPosition = $('.study').offset();
let count = 400;
let scaleCount = 4;

$(window).on('scroll', function(){
    if(window.pageYOffset >= studyPosition.top - 400 && scaleCount > 1){
        if(count > 0){
            count-=20;
        };
        $(".cloudL").css('left', count);
        $(".cloudR").css('right', count);
        scaleCount-=0.1;
        $(".cloudL, .cloudR").css('transform', 'scale('+scaleCount+')');
    }else if(window.pageYOffset <= studyPosition.top && scaleCount < 4){
        count+=20;
        $(".cloudL").css('left', count);
        $(".cloudR").css('right', count);
        scaleCount+=0.1;
        $(".cloudL, .cloudR").css('transform', 'scale('+scaleCount+')');
    }
});