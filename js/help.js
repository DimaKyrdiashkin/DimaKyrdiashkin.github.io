let  textItem,
    massHeightText = []
const funHeight = ()=>{
    textItem= document.querySelectorAll('.question_item_body')
    massHeightText.length =0;
    for(let i of textItem){
        massHeightText.push(i.clientHeight)
        i.style.height = "0";
        i.classList.add('closePadding')
    }
}
funHeight()
$(window).resize(()=> funHeight() )

let cc =document.querySelectorAll(".question_item");
let num =0
for(let i of cc){
    i.setAttribute("data-info", num);
    num++;
}

$(".question_item_header").on("click", (e) => {
    const n = $(e.target).closest('.question_item').attr("data-info")
    const block = $(e.target).closest('.question_item').find('.question_item_body')
    $('.question_item_body').addClass('closePadding');
    $(".question_item_open").removeClass("activeItem");
    if(block.height() == "0"){
        $(e.target).closest('.question_item').find(".question_item_open").addClass('activeItem')
        $('.question_item_body').css({height : "0"})
        block.css({height : massHeightText[n] + "px"})
        block.removeClass('closePadding')
    }
    else{
        $(e.target).closest('.question_item').find(".question_item_open").removeClass('activeItem')
        block.css({height:"0"})
    }
})

