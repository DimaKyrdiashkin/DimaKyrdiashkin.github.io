// gift_slider
$("#gift_slider").slick({
    dots: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    prevArrow: "<img src='img/slider_slick_next.svg' class='prev' alt='1'>",
    nextArrow: "<img src='img/slider_slick_next.svg' class='next' alt='2'>",
    responsive: [
        {
            breakpoint: 600,
            settings: {
                centerMode: true,
                dots: false,
                slidesToShow: 1,
                slidesToScroll: 1,
            }
        }
    ]
});
// /gift_slider
// $('.next').on('click', function(){
//     $('.next').addClass('click');
//     setInterval(function(){
//         $('.next').removeClass('click');
//     }, 500);
// });