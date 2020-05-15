

$(window).on("resize", () => {
    sliderBill()
})
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


function sliderBill() {
    if(window.outerWidth<= 991){
        document.querySelector(".bill_right_svg").remove();
        $("#bill_right").slick({
            dots: true,
            // autoplay:true,
            autoplaySpeed: 5000,
            arrows:false,
            infinite: true,
            slidesToShow: 1,
            slidesToScroll: 1,
        });
        document.querySelector(".bill_active").classList.remove("bill_active")
    }
    

}
sliderBill();