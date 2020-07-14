//say_slider
$(".say_slider").slick({
    // dots: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 3,
    adaptiveHeight: true,
    // autoplay:true,
    focusOnSelect:true,
    autoplaySpeed:5000,
    arrows: true,
    prevArrow: "<img src='../../img/slider_slick_next.svg' class='prev' alt='1'>",
    nextArrow: "<img src='../../img/slider_slick_next.svg' class='next' alt='2'>",
    responsive: [
        {
            breakpoint: 1200,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
            }
        },
        {
            breakpoint: 992,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                arrows: false,
                dots: true,
            }
        }
    ]
})
// /say_slider

// footer_slider
$("#footer_slider").slick({
    dots: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: "<img src='../../img/slider_slick_next2.svg' class='prev' alt='1'>",
    nextArrow: "<img src='../../img/slider_slick_next2.svg' class='next' alt='2'>",
});

// /footer_slider
