let studyPosition = $('.study').offset();
let count = 400;
let scaleCount = 4;

$(window).on('scroll', function(){
    if(window.pageYOffset >= studyPosition.top - 300 && scaleCount > 1 && document.documentElement.clientWidth > 768){
        if(count > 0){
            count-=20;
        };
        $(".cloudL").css('left', count);
        $(".cloudR").css('right', count);
        scaleCount-=0.1;
        $(".cloudL, .cloudR").css('transform', 'scale('+scaleCount+')');
    }else if(window.pageYOffset <= studyPosition.top && scaleCount < 4 && document.documentElement.clientWidth > 768){
        count+=20;
        $(".cloudL").css('left', count);
        $(".cloudR").css('right', count);
        scaleCount+=0.1;
        $(".cloudL, .cloudR").css('transform', 'scale('+scaleCount+')');
    }
    else if(document.documentElement.clientWidth <= 768){
        $(".cloudL").css('left', 0);
        $(".cloudR").css('right', 0);
        $(".cloudL, .cloudR").css('transform', 'scale(1)');
    };
});
$(window).on('load', function(){
    if(document.documentElement.clientWidth <= 1200){
        $('.study_first__column').attr('data-wow-delay', '0s');
        $('.study_first__column').attr('data-wow-offset', '200');
    };
});