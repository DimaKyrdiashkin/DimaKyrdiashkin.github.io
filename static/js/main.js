const card =  document.querySelectorAll('.cardT');
const cardHeight = [];
const minH = [];

card.forEach((item)=>{
    cardHeight.push(item.clientHeight + 2)
});
// cut text
const textFull = document.querySelectorAll('.cardT');
const button = document.querySelectorAll('.card_button');
let textFullText= [];


textFull.forEach((item)=>{
    textFullText.push(item.innerText)
});

const funSub = (i)=>{
    document.querySelectorAll('.cardT')[i].innerText = textFull[i].innerText.substr(0, 150)+'...';
}

textFull.forEach((item, i)=>{
    funSub(i)
});

card.forEach((item, i)=>{
    minH.push(item.clientHeight + 2);
    item.style.height = `${minH[i]}px`;
});

const short = (i)=>{
    textFull.forEach((item, i)=>{
        card[i].style.height = `${minH[i]}px`;
        funSub(i)
        button[i].classList.remove("open");
    });
};

const open=(i)=>{
    if(textFull[i].innerText.length >153){
        card[i].style.height = `${minH[i]}px`;
        funSub(i);
        button[i].classList.remove("open");
        return false;
    }
    short(i);
    card[i].style.height = `${cardHeight[i]}px`;
    document.querySelectorAll('.cardT')[i].innerText = textFullText[i];
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

