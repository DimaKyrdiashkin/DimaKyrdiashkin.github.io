const investors_full = document.getElementById("investors"),
    analysts_full = document.getElementById("analysts"),
    income_full = document.getElementById("income"),
    company_full = document.getElementById("company"),
    company_full_n = company_full.innerText,
    investors_full_n = investors_full.innerText,
    analysts_full_n = analysts_full.innerText,
    income_full_n = income_full.innerText;
investors_full.innerText = 0;
analysts_full.innerText = 0;
income_full.innerText = 0;
company_full.innerText = 0;
function activeStatistics() {
    const url = window.location.href;
    console.log('fun')
    if(url.indexOf("statistics") !== -1){
        console.log("if")
    }
}
let flagg = true
const static = setInterval(()=> {
    const url = window.location.href;
    if(url.indexOf("statistics") !== -1 && flagg){
        let n_1 = 0, n_2 = 0, n_3 = 0, n_4 = 0;
        const investors_full_fun = setInterval( function () {
            n_1++;

            investors_full.innerText = n_1;

            if( n_1 === parseInt(investors_full_n) ) {
                n_1 = 0
            }
        }, 1 );
        const analysts_full_fun = setInterval( function () {
            n_2++;

            analysts_full.innerText = n_2;

            if( n_2 === parseInt(analysts_full)) {
                n_2 = 0;
            }
        }, 1 );
        const income_full_fun = setInterval( function () {
            n_3++;

            income_full.innerText = n_3;

            if( n_3 === parseInt(income_full_n) ) {
                n_3 = 0
            }
        }, 1 );
        const company_full_fun = setInterval( function () {
            n_4+=4;

            company_full.innerText = n_4;

            if( n_4 === parseInt(company_full_n) ) {
                n_4 = 0
            }
        }, 1 );
        setInterval(()=>{
            clearInterval( investors_full_fun );
            clearInterval( analysts_full_fun );
            clearInterval( income_full_fun );
            clearInterval( company_full_fun );
            clearInterval(static)
            investors_full.innerText = investors_full_n
            analysts_full.innerText = analysts_full_n
            income_full.innerText = income_full_n
            company_full.innerText = company_full_n


        },1000)
        flagg = false
    }
},1000)