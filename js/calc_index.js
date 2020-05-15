/* first */
$('#c-income-edit').attr('maxlength', 8)
$('.btc').css('display', 'block');
$("#c-income-slider").val(0.0001);
		var min_income_for_pam = 500000;
		var income_specify_step = 500;

		let calc = {
			defaults: {
				interestSavings:{  	// накопительный процент в неделю
					btc:  '1.75',
					eth:  '2.09',
					usdt: '2.08',
				},
				interestPam:{ 		// pam процент в неделю
					btc:  '2.62',
					eth:  '3.14',
					usdt: '3.12',
				},
				// interestBright:{  	// стабильный процент в неделю только usdt
				// 	6:  '33.8225578',
				// 	12: '89.8298558',
				// 	18: '169.2772786',
				// 	24: '281.9749662',
				// 	36: '668.6086792',
				// 	60: '3012.046307',
				// 	96: '26775.90303',
				// },
				currencyList: ['btc', 'eth', 'usdt'],
				accountList: ['savings','pam'],
				// periodStable:[6, 12, 18, 24, 36, 60, 96],   , 'stable'
				minSum: 0.0001,				// минимальная сумма
				maxSum: 100000000,		// максимальная сумма
				minPam: 500000,			// минимальная сумма на счете pam
			},

			inArray: function(arr, elem) {
			   	return arr.indexOf(elem) != -1;
			},

			isAccount: function(account){
				return this.inArray(this.defaults.accountList, account);
			},

			isCurrency: function(currency){
				return this.inArray(this.defaults.currencyList, currency);
			},

			// isPeriodStable: function(period){
			// 	return this.inArray(this.defaults.periodStable, period);
			// },

			// getPeriodStable: function(){return this.defaults.periodStable;},

			do: function(account, sum, term, currency, refill){
				if(!this.isAccount(account)){
					console.log('account name error, valid accounts: ',
						this.defaults.accountList);
					return;
				}
				// console.log(this.defaults.minSum);
				// console.log($('#c-income-slider').val());
				if($('#c-income-slider').val() < this.defaults.minSum || $('#c-income-slider').val() >
				 this.defaults.maxSum){
					console.log('error: sum not in range, min = '+
						this.defaults.minSum+', max = '+this.defaults.maxSum);
					return;
				}
				refill = refill || 0;
				return this.roundPlus(this[account](sum, term, currency, refill), 2);
			},

			savings: function(sum, term, currency, refill){
				if(!this.isCurrency(currency)){
					console.log('currency name error, valid currency: ',
						this.defaults.currencyList);
					return;
				}
				let total = sum;
				let interest = this.defaults.interestSavings[currency];
				let income = sum * interest / 100;

				let c = 1;
				for (let i = 1; i <= term; i++) {
					total += income;
					income = total * interest / 100;
					if(c == 4){
						total += refill;
						c = 1;
					}
					c++;
				}
				return total;
			},

			pam: function(sum, term, currency, refill){
				if(!this.isCurrency(currency)){
					console.log('currency name error, valid currency: ',
						this.defaults.currencyList);
					return;
				}
				if(sum < this.defaults.minPam){
					console.log('error: min sum for pam = '+
						this.defaults.minPam);

					return;
				}
				let total = sum;
				let interest = this.defaults.interestPam[currency];
				let income = sum * interest / 100;

				let c = 1;
				for (let i = 1; i <= term; i++) {
					total += income;
					if(c == 4){
						total += refill;
						income = total * interest / 100;
						c = 1;
					}
					c++;
				}
				return total;
			},

			// stable: function(sum, term){
			// 	if(!this.isPeriodStable(term)){
			// 		console.log('term error, valid terms: ',
			// 			this.defaults.periodStable);
			// 		return;
			// 	}
			// 	let total = sum;
			// 	let interest = this.defaults.interestBright[term];
			// 	let income = sum * interest / 100;
			// 	return total + income;
			// },

			roundPlus: function(x, n) {
				if(!$("#c-savings").prop("checked")){
				    if(isNaN(x) || isNaN(n)) return 'round problem';
				    var m = Math.pow(10,n);
				    var r = Math.round(x*m)/m;
				    return r.toFixed(n);
				}else{
					if(isNaN(x) || isNaN(n)) return 'round problem';
				    return x;
				};
		    }
		}
	
		$(function($) {
    $.fn.inputFilter = function(inputFilter) {
        return this.on("input keydown keyup mousedown mouseup select contextmenu drop", function() {
            if (inputFilter(this.value)) {
                this.oldValue = this.value;
                this.oldSelectionStart = this.selectionStart;
                this.oldSelectionEnd = this.selectionEnd;
            } else if (this.hasOwnProperty("oldValue")) {
                this.value = this.oldValue;
                this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
            }
        });
    };
}(jQuery));


$(function() {


    Number.prototype.format = function(n, x, s, c) {
        if(!$("#c-savings").prop("checked")){
            var re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\D' : '$') + ')',
                num = this.toFixed(Math.max(0, ~~n));
        }else if($("#c-savings").prop("checked") && $("#c-usdt").prop("checked")){
            var re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\D' : '$') + ')',
                num = this.toFixed(Math.max(0, ~~n));
        }else{
            var re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\D' : '$') + ')',
                num = this.toFixed(Math.max(0, ~~n+4));
        };

        return (c ? num.replace('.', c) : num).replace(new RegExp(re, 'g'), '$&' + (s || ','));
    };

    function periodText(number, titles) {
        let cases = [2, 0, 1, 1, 1, 2];
        return titles[ (number%100>4 && number%100<20)? 2 : cases[(number%10<5)?number%10:5] ];
    }

    function periodWeek(number){
        return periodText(number, ['неделя', 'недели', 'недель']);
    }

    function periodMonth(number){
        return periodText(number, ['месяц', 'месяца', 'месяцев']);
    }

    function calculate(){
        let account = $('.c-account-check:checked').val();
        validate(account);
        let currency = $('.c-currency-check:checked').val();
        let income = parseFloat($('#c-income-edit').val());
        
        let period = parseInt($('#c-period-slider').val());
        if($('#c-refill-check').prop('checked')){
            var refill = parseFloat($('#c-refill-amount').val());
        } else {
            var refill = 0;
        }
        let result = parseFloat(calc.do(account, income, period, currency, refill)).format(2, 3, ' ', '.');
        if($("#c-btc").prop("checked") && !$("#c-pam").prop("checked")){

            $('#result_calc_vv').html("Ваш результат BTC");
            $('#c-result-sum').html( result.toString());
        }else if($("#c-eth").prop("checked") && !$("#c-pam").prop("checked")){
            $('#result_calc_vv').html("Ваш результат ETH");
            $('#c-result-sum').html(result.toString());
        }else if (!$("#c-stable").prop("checked")) {

            $('#result_calc_vv').html("Ваш результат USDT");
            $('#c-result-sum').html(result.toString());
        };


    }


    $('.c-account-check').bind('click', function(event) {
        $(".c-account-check").prop( "checked", false );
        $(this).prop( "checked", true );
        if($(this).val() == 'stable'){
            // $('#c-usdt').trigger('click');
            // $('.c-currency-check').prop('disabled', true);
            // refillDisable();
        } else {
            $('.c-currency-check').prop('disabled', false);
            $('#c-refill-check').prop('disabled', false);
        }
        calculate();
    });

    $('.c-currency-check').bind('click', function(event) {
        $(".c-currency-check").prop( "checked", false );
        $(this).prop( "checked", true );
        calculate();
    });

    $('#c-refill-check').bind('click', function(){
        $('#c-refill-amount').prop("disabled", !$(this).prop("checked"));
        document.getElementById("invest_field").classList.toggle("invest-field-active");
        calculate();
    });

    $('#c-refill-amount').bind('keyup', function() {
        calculate();
    });
    $('#c-refill-amount').inputFilter(function(value) {
        return /^-?\d*[.,]?\d{0,2}$/.test(value)
    });;

    function refillDisable(){
        $('#c-refill-check').prop({
            checked: false,
            disabled: true,
        });
        $('#c-refill-amount').prop("disabled", true);
        calculate();
    }

    $('#c-income-slider, #c-period-slider').change(function(event) {
        calculate();
    });

    $('#c-income-edit').change(function(){
        if($('#c-pam').prop("checked") && $('#c-income-edit').val() > 10000000){
            $('#c-income-edit').val('10000000');
        }
        $('#c-income-slider').val($('#c-income-edit').val());       
        calculate();
    });

    function validate(name){
        let income = $('#c-income-slider').val();
        if(name == 'pam' && income < min_income_for_pam){
            var attributes = {
                min: 1,
                max: 10000000,
                step: 1
            };
            $('#c-income-slider').attr(attributes);
            $('#c-income-slider').val(min_income_for_pam).change();
            $('#c-income-slider').rangeslider('update', true);
            calculate();
        }

        if(name == 'pam' || name == 'savings'){
            var attributes = {
                min: 1,
                max: 260,
                step: 1
            };
            $('#c-period-slider').attr(attributes);
            $('#c-period-slider').rangeslider('update', true);
        }
        if(name == 'savings' && $("#c-usdt").prop("checked")){
            var attributes = {
                min: 1,
                max: 500000,
                step: 1
            };
            $('#c-income-slider').attr(attributes);
            $('#c-income-slider').rangeslider('update', true);
        }
        if(name == 'savings' && $("#c-btc").prop("checked")){
            var attributes = {
                min: 0.0001,
                max: 100,
                step: 0.0001
            };
            $('#c-income-slider').attr(attributes);
            $('#c-income-slider').rangeslider('update', true);
        }
        if(name == 'savings' && $("#c-eth").prop("checked")){
            var attributes = {
                min: 0.0001,
                max: 1000,
                step: 0.0001
            };
            $('#c-income-slider').attr(attributes);
            $('#c-income-slider').rangeslider('update', true);
        }
        if(name == 'stable'){
            var attributes = {
                min: 1,
                max: 500000,
                step: 1
            };
            $('#c-income-slider').attr(attributes);
            $('#c-income-slider').rangeslider('update', true);
        }

    }

    function pText(value){
        let account = $('.c-account-check:checked').val();
        if (account == 'savings' || account == 'pam') {
            return periodWeek(value);
        } else {
            return periodMonth(value);
        }
    }


    $('#c-income-slider').rangeslider({
        polyfill: false,
        fillClass: 'rangeslider__fill',
        onInit: function() {
            let amount = parseFloat(this.value);
            let label = 'USDT ' + amount.format(0, 3, ' ', '.');


            if($("#c-btc").prop("checked") && !$("#c-pam").prop("checked")){
                $("#text_calc_vv").html("Инвестировать");
                label = amount.format(0, 4, ' ', '.');
                $("#c-income-edit").val(amount);
                // $('#c-income').html(label);
            }else if($("#c-eth").prop("checked") && !$("#c-pam").prop("checked")){
                $("#c-income-edit").val(amount);
                $("#text_calc_vv").html("Инвестировать");
                label = amount.format(0, 4, ' ', '.');
                // $('#c-income').html(label);
            }else{
                $("#text_calc_vv").html("Инвестировать");
                label = amount.format(0, 3, ' ', '.');
                // $('#c-income').html(label);
            };
        },
        onSlide: function(position, value) {
            let amount = parseFloat(value);
            $("#c-income-edit").val(amount);
            let label;

            if($("#c-btc").prop("checked") && !$("#c-pam").prop("checked")){
                $("#text_calc_vv").html("Инвестировать");
                label = parseFloat($("#c-income-edit").val()).format(0, 4, ' ', '.');
                $('#c-income').html(label);
            }else if($("#c-eth").prop("checked") && !$("#c-pam").prop("checked")){
                label = amount.format(0, 4, ' ', '.');
                $("#text_calc_vv").html("Инвестировать");
                $('#c-income').html(label);
            }else{
                label = amount.format(0, 3, ' ', '.');
                $("#text_calc_vv").html("Инвестировать");
                $('#c-income').html(label);
            };
        },
        onSlideEnd: function(position, value) {
        }
    });

    $('#c-period-slider').rangeslider({
        polyfill: false,
        fillClass: 'rangeslider__fill',
        onInit: function() {
            let label = $('#c-period-slider').val()+' '+pText($('#c-period-slider').val());
            $('#c-period').html(label);
        },
        onSlide: function(position, value) {
            let label = value+' '+pText(value);
            $('#c-period').html(label);
        },
        onSlideEnd: function(position, value) {
        }
    });

    // $('.c-editable').click(function(){
    //     let edit = $($(this).data('edit-id'));
    //     let label = $(this);
    //     let slider = $($(this).data('slider-id'));
    //     edit.val(slider.val());
    //     edit.show();
    //     edit.focus();
    //     label.hide();

    //     edit.bind('change, focusout',function(){
    //         let amount = parseFloat($(this).val());
    //         slider.val(amount);
    //         slider.change();
    //         $(this).hide();
    //         label.show();
    //     });

    // });

    calculate();
    $( ".check" ).click(function() {
        $(".select_option").toggleClass("select_option__open");
        $(".arrow span").toggleClass("open");
    });
    $("#s1").click(function() {
        let a = $("#s1").text();
        $("select").val($("#s1").attr("id")[1]);
        $(".checkP").text(a);
        $(".select_option").toggleClass("select_option__open");
        $(".arrow span").toggleClass("open");
        if($("#capotalization").prop("checked")){
            BrightCap();
        }else{
            BrightNotCap();
        };
    });
    $("#s2").click(function() {
        let a = $("#s2").text();
        $("select").val($("#s2").attr("id")[1]);
        $(".checkP").text(a);
        $(".select_option").toggleClass("select_option__open");
        $(".arrow span").toggleClass("open");
        if($("#capotalization").prop("checked")){
            BrightCap();
        }else{
            BrightNotCap();
        };
    });
    $("#s3").click(function() {
        let a = $("#s3").text();
        $("select").val($("#s3").attr("id")[1]);
        $(".checkP").text(a);
        $(".select_option").toggleClass("select_option__open");
        $(".arrow span").toggleClass("open");
        if($("#capotalization").prop("checked")){
            BrightCap();
        }else{
            BrightNotCap();
        };
    });
    $("#s4").click(function() {
        let a = $("#s4").text();
        $("select").val($("#s4").attr("id")[1]);
        $(".checkP").text(a);
        $(".select_option").toggleClass("select_option__open");
        $(".arrow span").toggleClass("open");
        if($("#capotalization").prop("checked")){
            BrightCap();
        }else{
            BrightNotCap();
        };
    });
    $("#s5").click(function() {
        let a = $("#s5").text();
        $("select").val($("#s5").attr("id")[1]);
        $(".checkP").text(a);
        $(".select_option").toggleClass("select_option__open");
        $(".arrow span").toggleClass("open");
        if($("#capotalization").prop("checked")){
            BrightCap();
        }else{
            BrightNotCap();
        };
    });
    $("#s6").click(function() {
        let a = $("#s6").text();
        $("select").val($("#s6").attr("id")[1]);
        $(".checkP").text(a);
        $(".select_option").toggleClass("select_option__open");
        $(".arrow span").toggleClass("open");
        if($("#capotalization").prop("checked")){
            BrightCap();
        }else{
            BrightNotCap();
        };
    });
    $("#s7").click(function() {
        let a = $("#s7").text();
        $("select").val($("#s7").attr("id")[1]);
        $(".checkP").text(a);
        $(".select_option").toggleClass("select_option__open");
        $(".arrow span").toggleClass("open");
        if($("#capotalization").prop("checked")){
            BrightCap();
        }else{
            BrightNotCap();
        };
    });
    $("#capotalization").click(function(){
        if($("#capotalization").prop("checked")){
            BrightCap();
        }else{
            BrightNotCap();
        };
        if($("#capotalization").prop("checked")){
            $(".c-result-block-1 .c-primary-title").text("Сумма в конце срока");
        }else{
            $(".c-result-block-1 .c-primary-title").text("Ежемесячный доход");
        }
    });
    $("#c-stable").click(function() {
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
        $("#text_calc_vv").html("Инвестировать")
        $('.end').html('500 000');
        $('.eth, .btc').css('display', 'none');
        $('.usdt').css('display', 'block');
        $('#c-usdt').attr("disabled", false);

        label =  amount.format(0, 3, ' ', '.');
        $('#c-income').html(label);
        if($("#capotalization").prop("checked")){
            $(".c-result-block-1 .c-primary-title").text("Сумма в конце срока");
        }else{
            $(".c-result-block-1 .c-primary-title").text("Ежемесячный доход");
        }
        if($("#capotalization").prop("checked")){
            BrightCap();
        }else{
            BrightNotCap();
        };
    });
    $("#c-pam").click(function() {
        $('.eth, .btc').css('display', 'none');
        $('.usdt').css('display', 'block');
        $('.end').html('10 000 000');
        var attributes = {
            min: 1,
            max: 10000000,
            step: 1
        };
        $('#c-income-slider').attr(attributes);
        $('#c-income-slider').rangeslider('update', true);
    });
    $("#c-savings, #c-pam").click(function() {
        $("select").val(0);
        $(".c-info-field").removeClass("close");
        $(".calc_select").removeClass("open");
        $("#capotalization").attr("disabled", true);
		$("#capotalization").prop("checked", false);
        $(".c-result-block-2").css("height", "fit-content");
        $("span.hr").css("display", "none");
        $(".c-result-block-3").css("display", "none");
        $(".c-result-block-4").css("display", "none");
        let amount = parseInt($('#c-income-slider').val());
        if($("#c-btc").prop("checked") && !$("#c-pam").prop("checked")){
            label = amount.format(0, 3, ' ', '.');
            $("#text_calc_vv").html("Инвестировать");
            $('#c-income').html(label);
            $(".c-result-block-1 .c-primary-title").text("Ваш результат BTC");
        }else if($("#c-eth").prop("checked") && !$("#c-pam").prop("checked")){
            label = amount.format(0, 4, ' ', '.');
            $("#text_calc_vv").html("Инвестировать");
            $('#c-income').html(label);
            $(".c-result-block-1 .c-primary-title").text("Ваш результат ETH");
        }else{
            $("#text_calc_vv").html("Инвестировать");
            label = amount.format(0, 3, ' ', '.');
            $('#c-income').html(label);
            $(".c-result-block-1 .c-primary-title").text("Ваш результат USDT");
        };
    });
    $('#c-savings').click(function(){
        if($("#c-btc").prop("checked")){
            $('.end').html("100");
            label =  amount.format(0, 4, ' ', '.');
            $("#text_calc_vv").html("Инвестировать");
            $('#c-income').html(label);
            $('.eth, .usdt').css('display', 'none');
            $('.btc').css('display', 'block');
        }else if($("#c-eth").prop("checked")){
            $('.end').html("1 000");
            label =  amount.format(0, 4, ' ', '.');
            $("#text_calc_vv").html("Инвестировать");
            $('#c-income').html(label);
            $('.btc, .usdt').css('display', 'none');
            $('.eth').css('display', 'block');
        }else{
            $('.end').html("500 000");
            $("#text_calc_vv").html("Инвестировать");
            label =  amount.format(0, 4, ' ', '.');
            $('#c-income').html(label);
            $('.eth, .btc').css('display', 'none');
            $('.usdt').css('display', 'block');
        };
    });
    $("#c-btc, #c-eth, #c-usdt").click(function(){
        let amount = parseFloat($('#c-income-slider').val());
        if($("#c-btc").prop("checked") && !$("#c-pam").prop("checked")){
            label =  amount.format(0, 4, ' ', '.');
            $("#text_calc_vv").html("Инвестировать");
            $('#c-income').html(label);
            $('.end').html("100");
            $('.eth, .usdt').css('display', 'none');
            $('.btc').css('display', 'block');
        }else if($("#c-eth").prop("checked") && !$("#c-pam").prop("checked")){
            label =  amount.format(0, 4, ' ', '.');
            $("#text_calc_vv").html("Инвестировать");
            $('#c-income').html(label);
            $('.end').html("1 000");
            $('.btc, .usdt').css('display', 'none');
            $('.eth').css('display', 'block');
        }else{
            $("#text_calc_vv").html("Инвестировать");
            label =  amount.format(0, 3, ' ', '.');
            $('#c-income').html(label);
            $('.end').html("500 000");
            $('.eth, .btc').css('display', 'none');
            $('.usdt').css('display', 'block');
        };
        if($("#c-pam").prop("checked")){
            $('.end').html('10 000 000');
        };
    });



    function BrightNotCap() {
        let persent = $("select").val();
        let invest = parseInt($('#c-income-slider').val());
        let position = $(".rangeslider__handle").offset();
        let sum = 0;

        switch (persent) {
            case "0":
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
    };
    $('#c-income-slider').change(function(event) {
        if($("#capotalization").prop("checked")){
            BrightCap();
        }else{
            BrightNotCap();
        };
    });

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
    };
    $("#c-result-sum").click(function(){
        if($("#c-result-sum").text() == "Выберите период"){
            window.scrollTo({
                top: document.documentElement.clientHeight,
                behavior: "smooth"
            });
        };
    });

});
