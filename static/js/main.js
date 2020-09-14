const card =  document.querySelectorAll('.cardT');
const cardBottom = document.querySelectorAll('.card_bottom');
const cardHeight = [];
const minH = [];

card.forEach((item)=>{
    cardHeight.push(item.clientHeight + 2)
});
const button = document.querySelectorAll('.card_button');

const open=(i)=>{
    if(button[i].className.split(' ')[1] == 'open'){
        cardBottom[i].classList.remove("open");
        button[i].classList.remove("open");
        return false
    }else{
        cardBottom.forEach((item, i)=>{
            item.classList.remove('open');
            button[i].classList.remove('open');
        })
        cardBottom[i].classList.add('open');
    }
    button[i].classList.add("open");
}

button.forEach((item, i)=>{
    item.addEventListener("click", ()=>{open(i)});
});



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

const wrap = document.querySelector(".wrapper");

window.addEventListener('scroll', ()=>{  
    if(pageYOffset-250>document.documentElement.clientHeight){
        wrap.classList.add("scroll");
    }else{
        wrap.classList.remove("scroll");
    }
})