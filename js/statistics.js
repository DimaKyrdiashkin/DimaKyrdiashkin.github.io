

const investors_full = document.getElementById("investors"),
    analysts_full = document.getElementById("analysts"),
    income_full = document.getElementById("income"),
    company_full = document.getElementById("company");
function activeStatistics() {
    const url = window.location.href;
    console.log(true)
    if(url.indexOf("statistics") !== -1){
        console.log(true)
    }
}
$(window).scroll(function(){
    activeStatistics();
});

// $(document).ready(function(){
//     activeStatistics();
// });