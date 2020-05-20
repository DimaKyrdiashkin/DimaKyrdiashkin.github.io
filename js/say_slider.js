"user script"

if(window.innerWidth <= 991){
    $(".say .say_slider").slick({
        dots: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        adaptiveHeight: true,
        // autoplay:true,
        autoplaySpeed:5000,
        arrows: false
    });
}
else if(window.innerWidth <= 1200){
    $(".say .say_slider").slick({
        dots: true,
        infinite: true,
        slidesToShow: 2,
        slidesToScroll: 2,
        adaptiveHeight: true,
        // autoplay:true,
        autoplaySpeed:5000,
        arrows: false
    });
}
else{
    $(".say .say_slider").slick({
        dots: true,
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 3,
        adaptiveHeight: true,
        // autoplay:true,
        autoplaySpeed:5000,
        prevArrow: "<img src='img/home/slider_slick_next.svg' class='prev' alt='1'>",
        nextArrow: "<img src='img/home/slider_slick_next.svg' class='next' alt='2'>",
    });
}
$(window).resize( ()=>{
    if(window.innerWidth <= 991){
        $(".say_slider").slick({
            dots: true,
            infinite: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            adaptiveHeight: true,
            // autoplay:true,
            autoplaySpeed:5000,
            arrows: false
        });
    }
    else{
        $(".say .say_slider").slick({
            dots: true,
            infinite: true,
            slidesToShow: 3,
            slidesToScroll: 3,
            adaptiveHeight: true,
            // autoplay:true,
            autoplaySpeed:5000,
            prevArrow: "<img src='img/home/slider_slick_next.svg' class='prev' alt='1'>",
            nextArrow: "<img src='img/home/slider_slick_next.svg' class='next' alt='2'>",
        });
    }
})