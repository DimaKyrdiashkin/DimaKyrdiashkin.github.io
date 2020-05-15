if(window.innerWidth <= 500  ){
    $("#footer_slider").slick({
        dots: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        prevArrow: "<img src='img/home/slider_slick_next.svg' class='prev' alt='1'>",
        nextArrow: "<img src='img/home/slider_slick_next.svg' class='next' alt='2'>",
    });
}
else if(window.innerWidth <= 991 ){
    $("#footer_slider").slick({
        dots: true,
        infinite: true,
        slidesToShow: 2,
        slidesToScroll: 2,
        prevArrow: "<img src='img/home/slider_slick_next.svg' class='prev' alt='1'>",
        nextArrow: "<img src='img/home/slider_slick_next.svg' class='next' alt='2'>",
    });
}
else{
    $("#footer_slider").slick({
        dots: true,
        infinite: true,
        slidesToShow: 4,
        slidesToScroll: 4,
        prevArrow: "<img src='img/home/slider_slick_next.svg' class='prev' alt='1'>",
        nextArrow: "<img src='img/home/slider_slick_next.svg' class='next' alt='2'>",
    });
}