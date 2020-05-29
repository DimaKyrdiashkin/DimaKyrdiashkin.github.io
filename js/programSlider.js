let arr = ['url("img/program/event1.png"), linear-gradient(0deg, rgba(58, 58, 58, 0.73), rgba(58, 58, 58, 0.73))',
            'url("img/program/event2.png"), linear-gradient(0deg, rgba(58, 58, 58, 0.73), rgba(58, 58, 58, 0.73))',
            'url("img/program/event3.png"), linear-gradient(0deg, rgba(58, 58, 58, 0.73), rgba(58, 58, 58, 0.73))', 
            'url("img/program/event4.png"), linear-gradient(0deg, rgba(58, 58, 58, 0.73), rgba(58, 58, 58, 0.73))',
            'url("img/program/event5.png"), linear-gradient(0deg, rgba(58, 58, 58, 0.73), rgba(58, 58, 58, 0.73))',
            'url("img/program/event6.png"), linear-gradient(0deg, rgba(58, 58, 58, 0.73), rgba(58, 58, 58, 0.73))',
            'url("img/program/event7.png"), linear-gradient(0deg, rgba(58, 58, 58, 0.73), rgba(58, 58, 58, 0.73))',
            'url("img/program/event8.png"), linear-gradient(0deg, rgba(58, 58, 58, 0.73), rgba(58, 58, 58, 0.73))',
            'url("img/program/event9.png"), linear-gradient(0deg, rgba(58, 58, 58, 0.73), rgba(58, 58, 58, 0.73))',
            'url("img/program/event10.png"), linear-gradient(0d…, rgba(58, 58, 58, 0.73), rgba(58, 58, 58, 0.73))',
            'url("img/program/event11.png"), linear-gradient(0d…, rgba(58, 58, 58, 0.73), rgba(58, 58, 58, 0.73))',
            'url("img/program/event12.png"), linear-gradient(0d…, rgba(58, 58, 58, 0.73), rgba(58, 58, 58, 0.73))',
            'url("img/program/event13.png"), linear-gradient(0d…, rgba(58, 58, 58, 0.73), rgba(58, 58, 58, 0.73))',
            'url("img/program/event14.png"), linear-gradient(0d…, rgba(58, 58, 58, 0.73), rgba(58, 58, 58, 0.73))',
            'url("img/program/event15.png"), linear-gradient(0d…, rgba(58, 58, 58, 0.73), rgba(58, 58, 58, 0.73))',
            'url("img/program/event16.png"), linear-gradient(0d…, rgba(58, 58, 58, 0.73), rgba(58, 58, 58, 0.73))',
            'url("img/program/event17.png"), linear-gradient(0d…, rgba(58, 58, 58, 0.73), rgba(58, 58, 58, 0.73))',
            'url("img/program/event18.png"), linear-gradient(0d…, rgba(58, 58, 58, 0.73), rgba(58, 58, 58, 0.73))',
            'url("img/program/event19.png"), linear-gradient(0d…, rgba(58, 58, 58, 0.73), rgba(58, 58, 58, 0.73))']

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
    prevArrow: "<img src='img/home/slider_slick_next.svg' class='prev' alt='1'>",
    nextArrow: "<img src='img/home/slider_slick_next.svg' class='next' alt='2'>",
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
            breakpoint: 768,
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

// img/program/event1.png

