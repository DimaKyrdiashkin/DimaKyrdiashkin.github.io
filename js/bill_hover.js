

$(".bill_right").on("mouseleave",()=>{
    document.querySelector(".bill_active").classList.remove('bill_active');
    document.querySelectorAll('.bill_right_li')[1].classList.add('bill_active');
})


$(".bill_right_li").on("mouseenter",(e)=>{
    document.querySelector(".bill_active").classList.remove('bill_active');
    if(e.target.nodeName === "LI"){
        e.target.classList.add("bill_active")
    }
    else{
        e.target.parentElement.classList.add("bill_active")
    }


})