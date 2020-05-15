if(window.outerWidth > 1200) {
    let myFullpage = new fullpage('.fullpageId', {
        //Navigation
        menu: '#fp-nav',
        lockAnchors: false,
        anchors: ['promoContent', 'statistics', "threeSlide", 'advantages', 'bill', 'calc', 'tabl', 'say', "footer"],
        navigation: true,
        navigationPosition: 'right',
        navigationTooltips: [],//название для поинтов навигации
        showActiveTooltip: false,
        slidesNavigation: false,
        slidesNavPosition: 'bottom',

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
        sectionsColor: ['#0000', '#7038E4', '#F8F9FF', '#F8F9FF', '#542AC8', '#F8F9FF', '#F8F9FF', '#542AC8'],
        // paddingTop: '3em',
        // paddingBottom: '10px',
        fixedElements: '#header, #marks, #fp-nav',
        responsiveWidth: 0,
        responsiveHeight: 0,
        responsiveSlides: false,
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
        },
        afterSlideLoad: function (section, origin, destination, direction) {
        },
        onSlideLeave: function (section, origin, destination, direction) {
        }
    });
}