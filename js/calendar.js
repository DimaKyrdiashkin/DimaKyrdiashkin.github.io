$(".month_head").click(function(event){
    if(document.documentElement.scrollWidth <= 976 && !$(".calendar").hasClass("calendar_open")){
        $(".calendar").addClass("calendar_open");
    }else if(document.documentElement.scrollWidth <= 976 && $(".month").hasClass("open_calendar")){
        console.log($(".month").hasClass("open_calendar"));
        $(".calendar").removeClass("calendar_open");
    };
    $(event.target).parents(".month").toggleClass("open_calendar");
    setTimeout(function() {
          $(event.target).siblings(".week, .day, .eventDesc").toggleClass("opacity_calendar");
          $(event.target).parents(".month_head").siblings(".week, .day, .eventDesc").toggleClass("opacity_calendar");
    }, 300);
});

$(".arrow_calendar__left").click(function(event){
    let a = $(event.target).parents(".month").attr('class');
    $(".month.m"+(parseInt(a.match(/\d/g).join(''))-1)).removeClass("month_left");
    $(".month.m"+(parseInt(a.match(/\d/g).join(''))-1)).addClass("month_middle");
    $(event.target).parents(".month").removeClass("month_middle");
    $(event.target).parents(".month").addClass("month_right");
    $(".month").removeClass("open_calendar");
    $(".week, .day, .eventDesc").removeClass("opacity_calendar");
});
$(".arrow_calendar__right").click(function(event){
    let a = $(event.target).parents(".month").attr('class');
    $(".month.m"+(parseInt(a.match(/\d/g).join(''))+1)).removeClass("month_right");
    $(".month.m"+(parseInt(a.match(/\d/g).join(''))+1)).addClass("month_middle");
    $(event.target).parents(".month").removeClass("month_middle");
    $(event.target).parents(".month").addClass("month_left");
    $(".month").removeClass("open_calendar");
    $(".week, .day, .eventDesc").removeClass("opacity_calendar");
});
$(window).resize(function(){
    wid = document.documentElement.scrollWidth;
    if(wid <= 975 && $(".month_middle>.week").hasClass("opacity_calendar")){
        $(".calendar").addClass("calendar_open");
    }else{
        $(".calendar").removeClass("calendar_open");
    };
});