let arr = ['url("../img/event/event1.png"), linear-gradient(0deg, rgba(58, 58, 58, 0.73), rgba(58, 58, 58, 0.73))',
            'url("../img/event/event2.png"), linear-gradient(0deg, rgba(58, 58, 58, 0.73), rgba(58, 58, 58, 0.73))',
            'url("../img/event/event3.png"), linear-gradient(0deg, rgba(58, 58, 58, 0.73), rgba(58, 58, 58, 0.73))',
            'url("../img/event/event4.png"), linear-gradient(0deg, rgba(58, 58, 58, 0.73), rgba(58, 58, 58, 0.73))',
            'url("../img/event/event5.png"), linear-gradient(0deg, rgba(58, 58, 58, 0.73), rgba(58, 58, 58, 0.73))',
            'url("../img/event/event6.png"), linear-gradient(0deg, rgba(58, 58, 58, 0.73), rgba(58, 58, 58, 0.73))',
            'url("../img/event/event7.png"), linear-gradient(0deg, rgba(58, 58, 58, 0.73), rgba(58, 58, 58, 0.73))',
            'url("../img/event/event8.png"), linear-gradient(0deg, rgba(58, 58, 58, 0.73), rgba(58, 58, 58, 0.73))',
            'url("../img/event/event9.png"), linear-gradient(0deg, rgba(58, 58, 58, 0.73), rgba(58, 58, 58, 0.73))',
            'url("../img/event/event10.png"), linear-gradient(0d…, rgba(58, 58, 58, 0.73), rgba(58, 58, 58, 0.73))',
            'url("../img/event/event11.png"), linear-gradient(0d…, rgba(58, 58, 58, 0.73), rgba(58, 58, 58, 0.73))',
            'url("../img/event/event12.png"), linear-gradient(0d…, rgba(58, 58, 58, 0.73), rgba(58, 58, 58, 0.73))',
            'url("../img/event/event13.png"), linear-gradient(0d…, rgba(58, 58, 58, 0.73), rgba(58, 58, 58, 0.73))']
$('#partner_slider').slick({
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    adaptiveHeight: true,
    focusOnSelect: true,
    autoplaySpeed: 5000,
    arrows: true,
    prevArrow: "<img src='../../img/slider_slick_next.svg' class='prev' alt='1'>",
    nextArrow: "<img src='../../img/slider_slick_next.svg' class='next' alt='2'>",
    responsive: [
        {
            breakpoint: 769,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
                arrows: true,
                dots: false,
            }
        },
        {
            breakpoint: 481,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                arrows: true,
                dots: false,
            }
        }
    ]
})
//event_slider
$('#event_slider').slick({
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    adaptiveHeight: true,
    focusOnSelect: true,
    autoplaySpeed: 5000,
    arrows: true,
    prevArrow: "<img src='../../img/slider_slick_next.svg' class='prev' alt='1'>",
    nextArrow: "<img src='../../img/slider_slick_next.svg' class='next' alt='2'>",
    responsive: [
        {
            breakpoint: 993,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
                arrows: true,
                dots: false,
                },         
        },
        {
            breakpoint: 769,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                arrows: true,
                dots: false,
            }
        },        
        {
            breakpoint: 481,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                arrows: true,
                dots: false,
            }
        }        
    ]
})

