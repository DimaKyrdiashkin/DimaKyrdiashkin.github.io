var myFullpage;
let flag = true;

window.addEventListener("resize", function(){
    if(document.documentElement.clientWidth > 1200 && flag == false){
         myFullpag = fun_Full();
         flag = true;
    }else{
         flag = false;
    };
 });

// fullpage_api.setLockAnchors(false);
function fun_Full() {
    const myFullpage = new fullpage('.fullpageId', {
        //Navigation
        menu: '#fp-nav',
        lockAnchors: false,
        anchors: ['promoContent', "threeSlide", 'bill', "advantages", 'statistics', 'device','say', "footer"],
        navigation: true,
        navigationPosition: 'right',
        navigationTooltips: [],//название для поинтов навигации
        showActiveTooltip: false,
        slidesNavigation: false,
        slidesNavPosition: 'bottom',
        // setLockAnchors: false,

        //Scrolling
        css3: true,
        scrollingSpeed: 700,
        autoScrolling: true,
        fitToSection: true,
        fitToSectionDelay: 1000,
        scrollBar: false,
        easing: 'easeInOutCubic',
        easingcss3: 'ease',
        loopBottom: false,
        loopTop: false,
        loopHorizontal: true,
        continuousVertical: false,
        continuousHorizontal: false,
        scrollHorizontally: false,
        interlockedSlides: false,
        dragAndMove: false,
        offsetSections: false,
        resetSliders: false,
        fadingEffect: false,
        normalScrollElements: '#element1, .element2',
        scrollOverflow: false,
        scrollOverflowReset: false,
        scrollOverflowOptions: null,
        touchSensitivity: 15,
        bigSectionsDestination: null,

        //Accessibility
        keyboardScrolling: true,
        animateAnchor: true,
        recordHistory: true,

        //Design
        controlArrows: true,
        verticalCentered: true,
        sectionsColor: ['#0000', '#F8F9FF', '#ffffff', '#F8F9FF', '#F8F9FF', '#F8F9FF', 'rgba(0,0,0,0)','#F8F9FF','#fff', '#542AC8'],
        // paddingTop: '3em',
        // paddingBottom: '10px',
        fixedElements: '#header, #marks, #fp-nav, .marker',
        responsiveWidth: 1201,
        responsiveHeight: 0,
        responsiveSlides: true,
        parallax: false,
        parallaxOptions: {type: 'reveal', percentage: 62, property: 'translate'},
        cards: false,
        cardsOptions: {perspective: 100, fadeContent: true, fadeBackground: true},

        //Custom selectors
        sectionSelector: '.section',
        slideSelector: '.slide',
        

        lazyLoading: false,

        //events
        onLeave: function (origin, destination, direction) {
            if(document.querySelector("video").pause) document.querySelector("video").play();
            if(destination.index === 0){
                document.getElementById("promo_h1").style.zIndex = "12";
            }
            if(destination.index <= 1){
                $('.marker').removeClass('marker_open', 500);
            }else if(destination.index <= 2){
                if(destination.index == 2 && direction == 'up'){
                    $('.marker').removeClass('marker_open', 500);
                }
                $('.marker').delay(500).addClass('marker_open', 500);
                setTimeout(() => $('.marker h5').text('PROFITABLE'), 400);
            }else if(destination.index <= 3){
                $('.marker').removeClass('marker_open', 500);
                $('.marker').delay(500).addClass('marker_open', 500);
                setTimeout(() => $('.marker h5').text('SECURE'), 400);
            }else if(destination.index <= 4){
                $('.marker').removeClass('marker_open', 500);
                $('.marker').delay(500).addClass('marker_open', 500);
                setTimeout(() => $('.marker h5').text('USEFUL'), 400);
            }else if(destination.index <= 5){
                $('.marker').removeClass('marker_open', 500);
                $('.marker').delay(500).addClass('marker_open', 500);
                setTimeout(() => $('.marker h5').text('COMFORTABLY'), 400);
            }else if(destination.index <= 6){
                $('.marker').removeClass('marker_open', 500);
                $('.marker').delay(500).addClass('marker_open', 500);
                setTimeout(() => $('.marker h5').text('USEFUL'), 400);
            }else if(destination.index <= 7){
                $('.marker').removeClass('marker_open', 500);
                $('.marker').delay(500).addClass('marker_open', 500);
                setTimeout(() => $('.marker h5').text('SECURE'), 400);
            }else{
                $('.marker').removeClass('marker_open', 500);
            }
        },
        afterLoad: function (origin, destination, direction) {
        },
        afterRender: function () {
        },
        afterResize: function (width, height) {
        },
        afterReBuild: function () {
        },
        afterResponsive: function (isResponsive) {
            flag = false;
            fullpage_api.destroy('all');
            $('.marker').delay(200).removeClass('marker_open');
            $('.fullpageId').css('transform', 'none');
        },
        afterSlideLoad: function (section, origin, destination, direction) {
        },
        onSlideLeave: function (section, origin, destination, direction) {
        }
    });
    return myFullpage;
}
myFullpag = fun_Full();
