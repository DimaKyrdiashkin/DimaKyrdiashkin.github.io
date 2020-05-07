let studyPosition = $('.study').offset();
let count = 400;
let scaleCount = 4;

$(window).on('scroll', function(){
    if(window.pageYOffset >= studyPosition.top - 300 && scaleCount > 1 && document.documentElement.clientWidth > 768){
        if(count > 0){
            count-=20;
        };
        $(".cloudL").css('left', count);
        $(".cloudR").css('right', count);
        scaleCount-=0.1;
        $(".cloudL, .cloudR").css('transform', 'scale('+scaleCount+')');
    }else if(window.pageYOffset <= studyPosition.top && scaleCount < 4 && document.documentElement.clientWidth > 768){
        count+=20;
        $(".cloudL").css('left', count);
        $(".cloudR").css('right', count);
        scaleCount+=0.1;
        $(".cloudL, .cloudR").css('transform', 'scale('+scaleCount+')');
    }
    else if(document.documentElement.clientWidth <= 768){
        $(".cloudL").css('left', 0);
        $(".cloudR").css('right', 0);
        $(".cloudL, .cloudR").css('transform', 'scale(1)');
    };
});
$(window).on('load', function(){
    if(document.documentElement.clientWidth <= 1200){
        $('.study_first__column').attr('data-wow-delay', '0s');
        $('.study_first__column').attr('data-wow-offset', '200');
    };
});



// calc

function BrightCap() {
    let persent = $("select").val();
    let invest = parseInt($('#c-income-slider').val());
    let position = $(".rangeslider__handle").offset();

    switch (persent) {
        case "1":
            sum = invest;
            for (var i = 0; i < 6; i++) {
                invest += invest*0.025;
            };
            $(".c-result-block-4 #c-result-sum").text((invest-sum).toFixed(2));
            $(".c-result-block-2 #c-result-sum").text(invest.toFixed(2));
            break;
        case "2":
            sum = invest;
            for (var i = 0; i < 12; i++) {
                invest += invest*0.03;
            };
            $(".c-result-block-4 #c-result-sum").text((invest-sum).toFixed(2));
            $(".c-result-block-2 #c-result-sum").text(invest.toFixed(2));
            break;
        case "3":
            sum = invest;
            for (var i = 0; i < 18; i++) {
                invest += invest*0.035;
            };
            $(".c-result-block-4 #c-result-sum").text((invest-sum).toFixed(2));
            $(".c-result-block-2 #c-result-sum").text(invest.toFixed(2));
            break;
        case "4":
            sum = invest;
            for (var i = 0; i < 24; i++) {
                invest += invest*0.04;
            };
            $(".c-result-block-4 #c-result-sum").text((invest-sum).toFixed(2));
            $(".c-result-block-2 #c-result-sum").text(invest.toFixed(2));
            break;
        case "5":
            sum = invest;
            for (var i = 0; i < 36; i++) {
                invest += invest*0.045;
            };
            $(".c-result-block-4 #c-result-sum").text((invest-sum).toFixed(2));
            $(".c-result-block-2 #c-result-sum").text(invest.toFixed(2));
            break;
        case "6":
            sum = invest;
            for (var i = 0; i < 60; i++) {
                invest += invest*0.05;
            };
            $(".c-result-block-4 #c-result-sum").text((invest-sum).toFixed(2));
            $(".c-result-block-2 #c-result-sum").text(invest.toFixed(2));
            break;
        case "7":
            sum = invest;
            for (var i = 0; i < 96; i++) {
                invest += invest*0.06;
            };
            $(".c-result-block-4 #c-result-sum").text((invest-sum).toFixed(2));
            $(".c-result-block-2 #c-result-sum").text(invest.toFixed(2));
            break;
        default:
        // alert( "Нет таких значений" );
    }
}

function BrightNotCap() {
    let persent = $("select").val();
    let invest = parseInt($('#c-income-slider').val());
    let position = $(".rangeslider__handle").offset();
    let sum = 0;

    // if(invest !== parseInt($('#c-income-slider').val())){
    // 	// alert(1);
    // };
    switch (persent) {
        case "0":
            // $('#c-result-sum').html('Выберите период');
            break;
        case "1":
            sum += invest*0.025*6;
            $(".c-result-block-2 #c-result-sum").text(Math.round(sum/6).toFixed(2));
            $(".c-result-block-4 #c-result-sum").text(Math.round(sum).toFixed(2));
            break;
        case "2":
            sum += invest*0.03*12;
            $(".c-result-block-2 #c-result-sum").text(Math.round(sum/12).toFixed(2));
            $(".c-result-block-4 #c-result-sum").text(Math.round(sum).toFixed(2));
            break;
        case "3":
            sum += invest*0.035*18;
            $(".c-result-block-2 #c-result-sum").text(Math.round(sum/18).toFixed(2));
            $(".c-result-block-4 #c-result-sum").text(Math.round(sum).toFixed(2));
            break;
        case "4":
            sum += invest*0.04*24;
            $(".c-result-block-2 #c-result-sum").text(Math.round(sum/24).toFixed(2));
            $(".c-result-block-4 #c-result-sum").text(Math.round(sum).toFixed(2));
            break;
        case "5":
            sum += invest*0.045*36;
            $(".c-result-block-2 #c-result-sum").text(Math.round(sum/36).toFixed(2));
            $(".c-result-block-4 #c-result-sum").text(Math.round(sum).toFixed(2));
            break;
        case "6":
            sum += invest*0.05*60;
            $(".c-result-block-2 #c-result-sum").text(Math.round(sum/60).toFixed(2));
            $(".c-result-block-4 #c-result-sum").text(Math.round(sum).toFixed(2));
            break;
        case "7":
            sum += invest*0.06*96;
            $(".c-result-block-2 #c-result-sum").text(Math.round(sum/96).toFixed(2));
            $(".c-result-block-4 #c-result-sum").text(Math.round(sum).toFixed(2));
            break;
        default:
            alert( "Нет таких значений" );
    }
}



function fun_calc () {
    document.getElementById("invest_field").classList.remove("invest-field-active");
    $(".c-result-block-4 #c-result-sum").text("Выберите период");
    $(".checkP").text("Период");
    $(".c-info-field").addClass("close");
    $(".calc_select").addClass("open");
    $(".c-result-block-2").css("height", "15%");
    $(".c-result-block-4").css("height", "15%");
    $(".c-result-block-1, .c-result-block-3").css("margin-top", "10px");
    $(".c-result-block-3").css("display", "flex");
    $(".c-result-block-4").css("display", "flex");
    $("span.hr").css("display", "block");
    $("#c-refill-check").attr("disabled", true);
    $(".c-currency-check").prop("checked", false);
    $("#c-refill-check").prop("checked", false);
    $(".c-currency-check").attr("disabled", true);
    $("#capotalization").attr("disabled", false);
    $("#c-usdt").prop("checked", true);
    $('#c-result-sum').html('Выберите период');
    let amount = parseInt($('#c-income-slider').val());
    $("#text_calc_vv").html("Инвестировать USDT")

    label =  amount.format(0, 3, ' ', '.');
    $('#c-income').html(label);
    if($("#capotalization").prop("checked")){
        $(".c-result-block-1 .c-primary-title").text("Сумма в конце срока");
    }else{
        $(".c-result-block-1 .c-primary-title").text("Ежемесячный доход USDT");
    }
    if($("#capotalization").prop("checked")){
        BrightCap();
    }else{
        BrightNotCap();
    }
    $('#result_calc_vv').html("Ваш результат USDT");
    $('#c-result-sum').html(result.toString());
}

setTimeout(fun_calc, 100)

// /calc
