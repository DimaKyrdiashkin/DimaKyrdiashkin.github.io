var myFullpage;
let flag = true;
// fullpage_api.setLockAnchors(false);
function fun_Full() {
    const myFullpage = new fullpage('.fullpageId', {
        //Navigation
        menu: '#fp-nav',
        lockAnchors: false,
        // anchors: ['promoContent', "threeSlide", 'bill', 'calc1', 'tabl',"advantages", 'statistics', 'say', "footer"],
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
        sectionsColor: ['#0000', '#F8F9FF', '#ffffff', '#F8F9FF', '#F8F9FF', '#F8F9FF', '#542AC8','#F8F9FF', '#542AC8'],
        // paddingTop: '3em',
        // paddingBottom: '10px',
        fixedElements: '#header, #marks, #fp-nav',
        responsiveWidth: 1200,
        responsiveHeight: 0,
        responsiveSlides: true,
        parallax: false,
        parallaxOptions: {type: 'reveal', percentage: 62, property: 'translate'},
        cards: false,
        cardsOptions: {perspective: 100, fadeContent: true, fadeBackground: true},

        //Custom selectors
        sectionSelector: '.section',
        slideSelector: '.slide',
        

        lazyLoading: true,

        //events
        onLeave: function (origin, destination, direction) {
            // alert(1);
        },
        afterLoad: function (origin, destination, direction) {
        },
        afterRender: function () {
        },
        afterResize: function (width, height) {
            // console.clear();
        },
        afterReBuild: function () {
        },
        afterResponsive: function (isResponsive) {
            flag = false;
            fullpage_api.destroy('all');
            $('.fullpageId').css('transform', 'none')
        },
        afterSlideLoad: function (section, origin, destination, direction) {
        },
        onSlideLeave: function (section, origin, destination, direction) {
        }
    });
    return myFullpage;
}
myFullpag = fun_Full();

window.addEventListener("resize", function(){
   if(document.documentElement.clientWidth > 1200 && flag == false){
    myFullpag = fun_Full();
    flag = true;
   }; 
});
