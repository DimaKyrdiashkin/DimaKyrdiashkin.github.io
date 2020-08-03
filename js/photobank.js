const bdPhoto =[
    {
        id: '01',
        title: 'BLOCKCHAIN LIFE 2019',
        urlTitle: "img/cat1/head.jpg",
        urlImg:['img/cat1/photo1.jpg','img/cat1/photo2.jpg','img/cat1/photo3.jpg','img/cat1/photo4.jpg','img/cat1/photo5.jpg','img/cat1/photo6.jpg','img/cat1/photo7.jpg','img/cat1/photo8.jpg']
    },
    {
        id: '02',
        title: 'BLOCKCHAIN WEEK 2019',
        urlTitle: "img/cat2/head.jpg",
        urlImg:['img/cat2/photo1.jpg','img/cat2/photo2.jpg','img/cat2/photo3.jpg','img/cat2/photo4.jpg','img/cat2/photo5.jpg','img/cat2/photo6.jpg','img/cat1/photo7.jpg','img/cat2/photo8.jpg','img/cat2/photo9.jpg','img/cat2/photo10.jpg','img/cat2/photo11.jpg','img/cat2/photo12.jpg','img/cat2/photo13.jpg','img/cat2/photo14.jpg']
    },
    {
        id: "03",
        title: 'SUNNY DAY ANTALYA 2019',
        urlTitle: "img/cat3/head.jpg",
        urlImg:['img/cat3/photo1.jpg','img/cat3/photo2.jpg','img/cat3/photo3.jpg','img/cat3/photo4.jpg','img/cat3/photo5.jpg','img/cat3/photo6.jpg','img/cat3/photo7.jpg','img/cat3/photo8.jpg','img/cat3/photo9.jpg','img/cat3/photo10.jpg','img/cat3/photo11.jpg','img/cat3/photo12.jpg','img/cat3/photo13.jpg','img/cat3/photo14.jpg','img/cat3/photo15.jpg','img/cat3/photo16.jpg','img/cat3/photo17.jpg','img/cat3/photo17.jpg','img/cat3/photo18.jpg','img/cat3/photo19.jpg','img/cat3/photo20.jpg','img/cat3/photo21.jpg','img/cat3/photo22.jpg','img/cat3/photo23.jpg','img/cat3/photo24.jpg','img/cat3/photo25.jpg','img/cat3/photo26.jpg','img/cat3/photo27.jpg','img/cat3/photo28.jpg','img/cat3/photo29.jpg','img/cat3/photo30.jpg','img/cat3/photo31.jpg','img/cat3/photo32.jpg','img/cat3/photo34.jpg','img/cat3/photo33.jpg','img/cat3/photo35.jpg','img/cat3/photo36.jpg','img/cat3/photo37.jpg','img/cat3/photo38.jpg','img/cat3/photo39.jpg','img/cat3/photo40.jpg','img/cat3/photo41.jpg','img/cat3/photo42.jpg']
    },
    {
        id: "04",
        title: 'SUNNY DAY MOSCOW 2019',
        urlTitle: "img/cat4/head.jpg",
        urlImg:['img/cat4/photo1.jpg','img/cat4/photo2.jpg','img/cat4/photo3.jpg','img/cat4/photo4.jpg','img/cat4/photo5.jpg','img/cat4/photo6.jpg','img/cat4/photo7.jpg','img/cat4/photo8.jpg','img/cat4/photo9.jpg','img/cat4/photo10.jpg','img/cat4/photo11.jpg','img/cat4/photo12.jpg','img/cat4/photo13.jpg','img/cat4/photo14.jpg','img/cat4/photo15.jpg','img/cat4/photo16.jpg','img/cat4/photo17.jpg','img/cat4/photo18.jpg','img/cat4/photo20.jpg','img/cat4/photo19.jpg','img/cat4/photo21.jpg','img/cat4/photo22.jpg','img/cat4/photo23.jpg','img/cat4/photo24.jpg','img/cat4/photo25.jpg','img/cat4/photo26.jpg','img/cat4/photo27.jpg','img/cat4/photo28.jpg','img/cat4/photo29.jpg','img/cat4/photo30.jpg']
    },
]
const massLi = document.querySelectorAll('#main_columns li'),
    modaul = document.getElementById('modul'),
    headModel = document.getElementById('headModel'),
    modelH2 = document.getElementById('modelH2'),
    modelOrder = document.getElementById('modelOrder');

const addImg = (name)=>{
    for(const i of bdPhoto){
        if(i.title === name){
            modaul.classList.add('open_cat_active');
            document.querySelector('body').style.overflowY = "hidden"
            modelOrder.innerText = i.id;
            headModel.src = i.urlTitle;
            modelH2.innerHTML = i.title;
            let n = 0;
            i.urlImg.map(value => {
                const img = document.createElement('img');
                img.src = value;
                img.width = massLi[0].offsetWidth;
                if(massLi.length  === n) n=0;
                massLi[n].append(img);
                n++;
            })
            break
        }
    }
}

setTimeout(  ()=>{

},200)

document.getElementById('delModul').addEventListener( "click",()=>{
    modaul.classList.remove('open_cat_active');
    document.querySelector('body').style.overflowY = "auto"
    for(const i of massLi){
        i.innerHTML = ''
    }
})
const btn_top =document.getElementById('btn_top'),
    model =document.querySelector('.open_cat ')
window.addEventListener('scroll', function() {
    const heigthTop = document.querySelector('footer').offsetTop;

    if(pageYOffset >50){
        btn_top.style.display = 'block'
    }
    else {
        btn_top.style.display = 'none'
    }
    if(pageYOffset + window.innerHeight - btn_top.clientHeight + 40 >= heigthTop){
        btn_top.style.top = `${heigthTop -btn_top.clientHeight}px`
        btn_top.style.position = "absolute"
        btn_top.style.bottom = "auto"
    }
    else {
        btn_top.style.top = "auto";
        btn_top.style.position = "fixed"
        btn_top.style.bottom = "50px"
    }


});

model.addEventListener('scroll', function() {
    if(model.scrollTop >50){
        btn_top.style.display = 'block'
    }
    else {
        btn_top.style.display = 'none'
    }
});
btn_top.addEventListener("click", ()=>{
    window.scrollTo(0,0);
    model.scrollTo(0,0);
})
var a = document.querySelector('#btn_top'), b = null, P = 0;