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
        urlTitle: "img/cat1/head.jpg",
        urlImg:['img/cat2/photo1.jpg','img/cat2/photo2.jpg','img/cat2/photo3.jpg','img/cat2/photo4.jpg','img/cat2/photo5.jpg','img/cat2/photo6.jpg','img/cat1/photo7.jpg','img/cat2/photo8.jpg','img/cat2/photo9.jpg','img/cat2/photo10.jpg','img/cat2/photo11.jpg','img/cat2/photo12.jpg','img/cat2/photo13.jpg','img/cat2/photo14.jpg']
    },
    {
        id: "04",
        title: 'BLOCKCHAIN LIFE 2019',
        urlTitle: "img/cat1/head.jpg",
        urlImg:['img/cat1/photo1.jpg','img/cat1/photo2.jpg','img/cat1/photo3.jpg','img/cat1/photo4.jpg','img/cat1/photo5.jpg','img/cat1/photo6.jpg','img/cat1/photo7.jpg','img/cat1/photo8.jpg']
    },
]
const massLi = document.querySelectorAll('#main_columns li'),
    modaul = document.getElementById('modul'),
    headModel = document.getElementById('headModel'),
    modelH2 = document.getElementById('modelH2'),
    modelOrder = document.getElementById('modelOrder')

const addImg = (name)=>{

    for(const i of bdPhoto){
        if(i.title === name){
            for(const i of massLi){
                i.innerHTML = ''
            }
            modaul.classList.add('open_cat_active');
            document.querySelector('body').style.overflowY = "hidden"
            modelOrder.innerText = i.id
            headModel.src = i.urlTitle
            modelH2.innerHTML = i.title
            i.urlImg.map(value => {
                let massLiHe =[];
                let n = 0
                for(const values of massLi){
                    massLiHe.push({'id': n, 'height': values.offsetHeight})
                    n++;
                }
                massLiHe.sort((a, b) => a.height > b.height ? 1 : -1)
                massLi[massLiHe[0]["id"]].innerHTML+=`<img src="${value}">`
            })
            break
        }

    }
}
document.getElementById('delModul').addEventListener( "click",()=>{
    modaul.classList.remove('open_cat_active');
    document.querySelector('body').style.overflowY = "auto"
})