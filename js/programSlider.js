$('#partner_slider').slick({
    // dots: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    adaptiveHeight: true,
    // autoplay:true,
    focusOnSelect: true,
    autoplaySpeed: 5000,
    arrows: true,
    prevArrow: "<img src='img/home/slider_slick_next.svg' class='prev' alt='1'>",
    nextArrow: "<img src='img/home/slider_slick_next.svg' class='next' alt='2'>",
    responsive: [
        // {
        //     breakpoint: 1200,
        //     settings: {
        //         slidesToShow: 2,
        //         slidesToScroll: 2,
        //     }
        // },
        // {
        //     breakpoint: 992,
        //     settings: {
        //         slidesToShow: 1,
        //         slidesToScroll: 1,
        //         arrows: false,
        //         dots: true,
        //     }
        // }
    ]
})