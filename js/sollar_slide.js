// footer_slider
$("#footer_slider").slick({
    dots: true,
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 4,
    prevArrow: "<img src='img/slider_slick_next.svg' class='prev' alt='1'>",
    nextArrow: "<img src='img/slider_slick_next.svg' class='next' alt='2'>",
    responsive: [
        {
            breakpoint: 1200,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
            }
        },
        {
            breakpoint: 992,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
            }
        },
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

// /footer_slider
