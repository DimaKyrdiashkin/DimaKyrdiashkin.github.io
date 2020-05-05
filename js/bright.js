let studyPosition = $('.study').offset();
let count = 400;
let scaleCount = 4;

// $(window).bind('mousewheel', function(event){
//     if(event.originalEvent.wheelDelta >= 0 && $(document).scrollTop() <= studyPosition.top && scaleCount < 4){
//         console.log('up');
//         count+=50;
//         $(".cloudL").css('left', count);
//         $(".cloudR").css('right', count);
//         scaleCount+=0.4;
//         $(".cloudL, .cloudR").css('transform', 'scale('+scaleCount+')');
//     }
//     else if(event.originalEvent.wheelDelta <= 0 && $(document).scrollTop() >= studyPosition.top-800 && scaleCount > 1.6){
//         console.log('down');
//         count-=50;
//         $(".cloudL").css('left', count);
//         $(".cloudR").css('right', count);
//         scaleCount-=0.4;
//         $(".cloudL, .cloudR").css('transform', 'scale('+scaleCount+')');
//     };
// });
$(window).on('scroll', function(){
    if(window.pageYOffset >= studyPosition.top - 400 && scaleCount < 4 && window.pageYOffset <= $('.study_second_mob').offset().top){
        console.log('up');
        count+=50;
        $(".cloudL").css('left', count);
        $(".cloudR").css('right', count);
        scaleCount+=0.4;
        $(".cloudL, .cloudR").css('transform', 'scale('+scaleCount+')');
    }
    else if(window.pageYOffset <= $('.study_second_mob').offset().top + 400 && scaleCount > 1.6){
        console.log('down');
        count-=50;
        $(".cloudL").css('left', count);
        $(".cloudR").css('right', count);
        scaleCount-=0.4;
        $(".cloudL, .cloudR").css('transform', 'scale('+scaleCount+')');
    };
});