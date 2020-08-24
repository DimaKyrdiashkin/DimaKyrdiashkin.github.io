const card =  document.querySelectorAll('.cardT');
const cardBottom = document.querySelectorAll('.card_bottom');
const cardHeight = [];
const minH = [];

card.forEach((item)=>{
    cardHeight.push(item.clientHeight + 2)
});
// document.querySelector('.cardT').style.maxHeight = "76px";
// // cut text
// const textFull = document.querySelectorAll('.cardT');
const button = document.querySelectorAll('.card_button');
// let textFullText= [];


// textFull.forEach((item)=>{
//     textFullText.push(item.innerText)
// });

// const funSub = (i)=>{
//     document.querySelectorAll('.cardT')[i].innerText = textFull[i].innerText.substr(0, 150)+'...';
// }

// textFull.forEach((item, i)=>{
//     funSub(i)
// });

// card.forEach((item, i)=>{
//     minH.push(item.clientHeight + 2);
//     item.style.height = `${minH[i]}px`;
// });

// const short = (i)=>{
//     textFull.forEach((item, i)=>{
//         card[i].style.height = `${minH[i]}px`;
//         funSub(i)
//         button[i].classList.remove("open");
//     });
// };

const open=(i)=>{
    // document.querySelector('.card_button').className.split(' ')[1]
    if(button[i].className.split(' ')[1] == 'open'){
        cardBottom[i].classList.remove("open");
        button[i].classList.remove("open");
        return false
    }else{
        cardBottom[i].classList.add('open');
    }
    // if(textFull[i].innerText.length >153){
    //     card[i].style.height = `${minH[i]}px`;
    //     funSub(i);
    //     button[i].classList.remove("open");
    //     return false;
    // }
    // short(i);
    
    // document.querySelectorAll('.cardT')[i].innerText = textFullText[i];
    button[i].classList.add("open");
}
button.forEach((item, i)=>{
    item.addEventListener("click", ()=>{open(i)});
});


// $('.card_button').click(function(){
//     $(this).toggleClass('open');
//     $('.hidden').slideUp(900);
//     if($(this).hasClass('open')){
//         $(this).parent().find('.hidden').slideToggle(900);
//     }else{
//         return false
//     }
// })


// menu
const mBut = document.querySelector('.mobButton');
const menu = document.querySelector('.mobMenu');
const mobButton = document.querySelectorAll('.mobItems');

mBut.addEventListener("click", ()=>{
    menu.classList.toggle('open');
    mBut.classList.toggle('open');
});

mobButton.forEach((item, i)=>{
    item.addEventListener("click", ()=>{
        menu.classList.remove('open');
        mBut.classList.remove('open');
    })
});

