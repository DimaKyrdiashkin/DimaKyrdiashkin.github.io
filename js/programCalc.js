$("input").focusout((e)=>{
    e.target.value = (e.target.value !== "") ? e.target.value : 0;
});

jQuery(document).ready(function($) {
    $('#deposit, #depref1, #depref2,  #depref3, #percent').keydown(keydownprev).change(checkNum).keyup(calc);
});

Number.prototype.format = function(n, x, s, c) {
    var re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\D' : '$') + ')',
            num = this.toFixed(Math.max(0, ~~n));

    return (c ? num.replace('.', c) : num).replace(new RegExp(re, 'g'), '$&' + (s || ','));
};

var num_ar = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "ArrowLeft", "ArrowRight", "ArrowDown", "ArrowUp", "F5", "Backspace", "Escape",".","Delete","Tab"];

function keydownprev(e){
    if(!num_ar.includes(e.key)){
        e.preventDefault();
    }
}

function checkNum(v){
    this.value = this.value.replace(/[^0-9\.]/g, '');
}

var affiliate = {
    1:{
        regul:{
            own:1,
            ref:1
        },
        name: "SPARK",
        percentage:{
            1:5,
            2:2,
            3:1
        },
        img: "status-img-bronze"
    },

    2:{
        regul:{
            own:100,
            ref:1000
        },
        name: "RAY",
        percentage:{
            1:10,
            2:4,
            3:2
        },
        img: "status-img-ser"
    },

    3:{
        regul:{
            own:1000,
            ref:10000
        },
        name: "LIGHT",
        percentage:{
            1:15,
            2:6,
            3:3
        },
        img: "status-img-gold"
    },

    4:{
        regul:{
            own:10000,
            ref:100000
        },
        name: "SHINE",
        percentage:{
            1:20,
            2:8,
            3:4
        },
        img: "status-img-platin"
    },

    5:{
        regul:{
            own:50000,
            ref:500000
        },
        name: "SUN",
        percentage:{
            1:25,
            2:10,
            3:5
        },
        img: "status-img-bril"
    },

}

function calc(){
    var deposit = getVal("deposit");
    var depref1 = getVal("depref1");
    var depref2 = getVal("depref2");
    var depref3 = getVal("depref3");
    var percent = getVal("percent");

    if(isNumeric(percent) && isNumeric(deposit)){
        var depincome = deposit/100*percent;
        $("#depincome").html("USDT " + depincome.format(0, 3, ' ', ','));

        var sumref = depref1+depref2+depref3;
        var statusid = getStatus(deposit, sumref);
        $(".status-img").css("display","none");
        $("#"+affiliate[statusid].img).css("display","inline-block");


        var depincref1 = depref1/100*percent;
        var depincref2 = depref2/100*percent;
        var depincref3 = depref3/100*percent;

        var refincome = depincref1/100*affiliate[statusid].percentage[1] +
                depincref2/100*affiliate[statusid].percentage[2] +
                depincref3/100*affiliate[statusid].percentage[3];
        $("#refincome").html( "USDT " + refincome.format(0, 3, ' ', ','));
        var income = parseFloat(depincome) + parseFloat(refincome);

        $("#income").html( 'USDT ' + income.format(0, 3, ' ', ','));

    } else {
        clear_data();
    }

}

function clear_data(){
    $("#status, #income, #depincome, #refincome").val("").html("");
}

function getVal(id){
    var val =  parseFloat($("#"+id).data('val'));
    if(!isNumeric(val)){
        val = 0;
    }
    return val
}

function getStatus(deposit, sumref){
    var status = 1;
    var sum = deposit + sumref;
    for (var i = 1; i <= 5; i++) {
        if (deposit >= affiliate[i].regul.own & sum >= affiliate[i].regul.ref) {
            status = i;
        }
    }
    return status;
}

function roundPlus(x, n) { //x - число, n - количество знаков
    if(isNaN(x) || isNaN(n)) return false;
    var m = Math.pow(10,n);
    var r = Math.round(x*m)/m;
    return r.toFixed(n);
}

function isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}

$('.calc_input_dollar, .calc_input_percent').bind('change, keydown, keyup',function(event) {
    $(this).data('val', $(this).val());
});

$('.calc_input_dollar').focusout(function() {
    let val = parseInt($(this).val());
    $(this).val( "USDT " + val.format(0, 3, ' ', ','));
});

$('.calc_input_dollar, .calc_input_percent').focusin(function(event) {
    $(this).val($(this).data('val'));
});

$('.calc_input_percent').focusout(function() {
    let val = parseInt($(this).val());
    $(this).val(val+' %');
});


calc();