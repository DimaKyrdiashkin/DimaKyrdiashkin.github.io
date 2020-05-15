"user script"

//
// $(".say_slider").slick({
//     dots: true,
//     infinite: true,
//     slidesToShow: 3,
//     slidesToScroll: 3,
//     adaptiveHeight: true,
//     // autoplay:true,
//     autoplaySpeed:5000,
//     prevArrow: "<img src='img/home/slider_slick_next.svg' class='prev' alt='1'>",
//     nextArrow: "<img src='img/home/slider_slick_next.svg' class='next' alt='2'>",
// });
if(window.innerWidth <= 991){
    saySlider(1)
}
else{
    saySlider(3)
}
$(window).on('resize', () =>{
    if(window.innerWidth <= 991){
        saySlider(1)
    }
    else{
        saySlider(3)
    }
})


function saySlider(x) {
    $(".say_slider").slick({
        dots: true,
        infinite: true,
        slidesToShow: x,
        slidesToScroll: x,
        adaptiveHeight: true,
        // autoplay:true,
        autoplaySpeed:5000,
        prevArrow: "<img src='img/home/slider_slick_next.svg' class='prev' alt='1'>",
        nextArrow: "<img src='img/home/slider_slick_next.svg' class='next' alt='2'>",
    });
}