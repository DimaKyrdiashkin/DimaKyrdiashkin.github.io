const massAmbassadors = [
    {
        name: "Николай Полонский",
        country: ["Беларусь"],
        tel: ["+375 (44) 7966 025"],
        city: ["Минск"],
        pawer: "https://amir.capital/?partner=e411600e-9cec-4d0d-aa8d-43adafdd82eb",
        img: "./img/people/polonskiy.jpg",
        status: "Ambassador",
        network: {
            instagram: ["https://www.instagram.com/nick_polonsky/"],
            telegram: ["https://t.me/polonikfin"],
        }
    },
    {
        name: "Павел Саяпин",
        country: ["Россия"],
        tel: ["+7 (909) 671 9 999"],
        city: ["Москва","Владивосток","Находка","Канкун"],
        pawer: "https://amir.capital/?partner=313514cc-2b95-4436-b1f9-2f0830025461",
        img: "./img/people/Sayapin.png",
        status: "Ambassador",
        network: {
            instagram: ["http://instagram.com/nahodkin/"],
            facebook: ["https://www.facebook.com/pavel.sayapin/"],
        }
    },
    {
        name: "Александр Курдо",
        country: ["Беларусь"],
        tel: ["+375 (29) 8888 435"],
        city: ["Минск"],
        pawer: "https://amir.capital/?partner=5d93f85b-5d94-4b4b-8bf8-3129e965af44",
        img: "./img/people/kurdo.png",
        status: "Ambassador",
        network: {
            instagram: ["https://www.instagram.com/kurdoalexander/"],
        }
    },
    {
        name: "Михаил Миско",
        country: ["Беларусь"],
        tel: ["+375 (29) 6871 289"],
        city: ["Минск"],
        pawer: "https://amir.capital/?partner=5e8cf33b-66d5-4094-8b78-6e0680551716",
        img: "./img/people/misko.png",
        status: "Regional Ambassador",
        network: {
            instagram: ["https://www.instagram.com/mikhail.missko/"],
            telegram: ["https://t.me/mikewonder"]
        }
    },
    {
        name: "Камилла Сафинова",
        country: ["Казахстан"],
        tel: ["+7 (701) 206 0 180"],
        city: ["Алматы","Астана"],
        pawer: "https://amir.capital/?partner=86c53e14-ac6e-4e66-b7f1-48de88a3e105",
        img: "./img/people/safinova.png",
        status: "Regional Ambassador",
        network: {
            email: ["k.safinova@gmail.com"],
            instagram: ["https://instagram.com/kamalina23/"]
        }
    },
    {
        name: "Альбина Курбанова",
        country: ["Татарстан"],
        tel: ["+7 (917) 281 9 462"],
        city: ["Казань"],
        pawer: "https://amir.capital/?partner=37e7196e-525c-4d77-a5cb-fa35c676b982",
        img: "./img/people/kurbanova.png",
        status: "Regional Ambassador",
        network: {
            instagram: ["https://instagram.com/albinakurbanova_top/"],
        }
    },
    {
        name: "Евгений Буторин",
        country: ["Россия"],
        tel:["+7 (902) 876 0 013"],
        city: ["Екатеринбург"],
        pawer: "https://amir.capital/?partner=360add11-32a3-404d-8aea-55e957f158e7",
        img: "./img/people/butorin.png",
        status: "Ambassador",
        network: {
            instagram: ["http://www.instagram.com/evgeniy_butorin/"],
        }
    },
    {
        name: "Сарыбай Тлеубаев",
        country: ["Казахстан"],
        tel: ["+7 (701) 893 9 987"],
        city: ["Алматы"],
        pawer: "https://amir.capital/?partner=185c3586-92cd-46e0-a43a-b57ef4bbf00e",
        img: "./img/people/sarybay.png",
        status: "International Ambassador",
        network: {
            instagram: ["https://www.instagram.com/t.sarybay/"],
        }
    },
    {
        name: "Эльвира Сафинова",
        country: ["Казахстан"],
        tel:["+7 (777) 666 6 773"],
        city:["Алматы"],
        pawer:"https://amir.capital/?partner=923fb445-3fd2-48d5-a5be-e06fb08f18de",
        img:"./img/people/safinovaelvira.png",
        status: "Regional Ambassador",
        network:{
        }
    },
    {
        name: "Ольга Белозерцева",
        country: ["Украина"],
        tel: ["+38 (067) 541 5 065"],
        city: ["Днепр"],
        pawer: "https://amir.capital/?partner=69c90e2c-4043-4f2a-8482-c9e11b249be9",
        img: "./img/people/belizertseva.png",
        status: "Ambassador",
        network: {
            instagram: ["https://www.instagram.com/belozertsevaolga/"]
        }
    },
    {
        name: "Максим Петров",
        country: ["Россия"],
        tel: ["+7 (914) 938 5 888"],
        city: ["Иркутск"],
        pawer: "https://amir.capital/?partner=0a7f6ae2-e675-41ef-8d35-dedd68d08caf",
        img: "./img/people/petrov.png",
        status: "Ambassador",
        network: {
            instagram: ["https://instagram.com/petrov_me/","https://instagram.com/petrov_capital/"],
        }
    },
    {
        name: "Сергей Алешко",
        country: ["Россия"],
        tel: ["+7 (916) 828 0 950"],
        city: ["Москва"],
        pawer: "https://amir.capital/?partner=e1d4047f-20c1-4241-842c-a39d8a970187",
        img: "./img/people/aleshko.png",
        status: "International Ambassador",
        network: {
            instagram: ["https://instagram.com/sergey_aleshko"],
        }
    },
    {
        name: "Андрей Кипаев",
        country: ["Россия"],
        tel: ["+7 (927) 601 4 595"],
        city: ["Самара"],
        pawer: "https://amir.capital/?partner=07147a7c-f8cf-45b5-a3da-acabf1f83f2f",
        img: "./img/people/kipaevandrei.png",
        status: "Regional Ambassador",
        network: {
            email: ["9729808@mail.ru"],
            instagram: ["https://www.instagram.com/kipaevandrei/"],
            facebook: ["https://www.facebook.com/profile.php?id=100024350332197"],
        }
    },
    {
        name: "Егор Кудинов",
        country: ["Беларусь"],
        tel: ["+375 (29) 5232 355"],
        city: ["Минск"],
        pawer: "https://amir.capital/?partner=dfbcbf86-b351-45da-9fda-c9cb53a39cca",
        img: "./img/people/egorkud.png",
        status: "Regional Ambassador",
        network:{
            instagram: ["https://instagram.com/egokud/"],
        }
    },
    {
        name: "Галия Калиджанова",
        country: ["Казахстан"],
        tel: ["+7 (701) 749 0 635"],
        city: ["Алматы"],
        pawer: "https://amir.capital/?partner=29b18945-7993-4ba4-b52f-a6c2bcd5fda6",
        img: "./img/people/galiya_kali.png",
        status: "Ambassador",
        network:{
            instagram: ["https://www.instagram.com/galiya_investor/"],
        }
    },
    {
        name: "Александр Корниенко",
        country: ["Беларусь"],
        tel: ["+375 (29) 6599 555"],
        city: ["Минск"],
        pawer: "https://amir.capital/?partner=28b9bf0a-6502-404c-bbbc-5f7b56d6e164",
        img: "./img/people/AlexsanderD.png",
        status: "Ambassador",
        network:{
            instagram: ["https://instagram.com/aleksandr_kornienko_777"]
        }
    },
    {
        name: "Наргиза Идрисова",
        country: ["Кыргызская Республика"],
        tel: ["+996 708 30 99 20"],
        city: ["Бишкек"],
        pawer: "https://amir.capital/?partner=c5c110e9-4b91-4024-aac0-45e8fa279f75",
        img: "./img/people/nazikidrisova.png",
        status: "Ambassador",
        network: {
            instagram: ["https://www.instagram.com/nazikidrisova/"],
        }
    },
    {
        name: "Ольга Новикова",
        country: ["Россия"],
        tel: ["+7 (926) 277 7 607"],
        city: ["Москва"],
        pawer: "https://amir.capital/?partner=b7b34a67-074c-4467-8f00-9804429eb779",
        img: "./img/people/novikova.png",
        status: "Ambassador",
        network: {
            instagram: ["https://www.instagram.com/olga_amir_novikova/"],
        }
    },
    {
        name: "Денис Унуковский",
        country: ["Беларусь"],
        tel: ["+365 (33) 6629 975"],
        city: ["Минск"],
        pawer: "https://amir.capital/?partner=cac71e94-429b-43f9-a86c-86767de9d49f",
        img: "./img/people/unukouski.png",
        status: "Ambassador",
        network: {
            instagram: ["https://www.instagram.com/unukouski83/"],
            telegram: ["https://t.me/denik83"]
        }
    },
    {
        name: "Джамал Минбаева",
        country: ["Кыргызская Республика"],
        tel: ["+996 550 48 48 18"],
        city: ["Бишкек"],
        pawer: "https://amir.capital/?partner=3513e3a1-1372-402c-be46-81cfe63dd28d",
        img: "./img/people/minbaeva.png",
        status: "Ambassador",
        network: {
            instagram: ["https://www.instagram.com/djamalminbaeva/"],
        }
    },
    {
        name: "Дмитрий Шаромов",
        country: ["Украина","Россия"],
        tel: ["+38 (097) 340 34 03"],
        city: ["Киев", 'Санкт-Петербург'],
        pawer: "https://amir.capital/?partner=a87c4efc-ddfa-4652-b117-518c4b92e704",
        img: "./img/people/sharomov.png",
        status: "Regional Ambassador",
        network:{
            instagram: ["https://www.instagram.com/dimondial/"],
        }
    },
    {
        name: "Алексей Щукин",
        country: ["Кипр"],
        tel: ["+7 (921) 616 8 175", "+905 488 25 85 89"],
        city: ["..."],
        pawer: "https://amir.capital/?partner=594c9681-1cd6-4fe3-a9eb-78a289f13337",
        img: "./img/people/shukin.png",
        status: "Regional Ambassador",
        network:{
            facebook: ["https://www.facebook.com/Lexa.champ"],
            instagram: ["https://www.instagram.com/fazekaw/"],
            vk: ['https://vk.com/lexa_champ'],
        }
    },
    {
        name: "Василий Бородачёв",
        country: ["Беларусь"],
        tel: ["+375 (29) 6797 973"],
        city: ["Минск"],
        pawer: "https://amir.capital/?partner=83fdca7a-b279-41de-ad68-007ffab1e43d",
        img: "./img/people/Borodachev.png",
        status: "Ambassador",
        network: {
            instagram: ["https://www.instagram.com/vasilborodochev/"],
            telegram: ["https://t.me/VasiliyBorodachev"]
        }
    },
    {
        name: "Дмитрий Хамьянов",
        country: ["Россия"],
        tel: ["+7 (921) 997 0 314"],
        city:["Санкт-Петербург"],
        pawer: "https://amir.capital/?partner=112f2c71-98ae-4a67-81c6-ac3798bc96d6",
        img: "./img/people/hamyanov.png",
        status: "Ambassador",
        network: {
            instagram: ["https://www.instagram.com/dmitriykhamyanov/"],
        }
    },
    {
        name: "Николай Кузьменко",
        country: ["Россия"],
        tel: ["+7 (925) 502 6 878"],
        city: ["Москва"],
        pawer: "https://amir.capital/?partner=03d08f2f-9561-40af-9f0e-bf39e6e33d5e",
        img: "./img/people/kuzmenko.png",
        status: "International Ambassador",
        network: {
            instagram: ["https://www.instagram.com/nikolaykuzmenko69/"],
        }
    }
],
    country = [
        {
            name: "Россия",
            cities: ["Москва","Санкт-Петербург","Самара","Иркутск","Екатеринбург","Владивосток","Находка","Канкун"]
        },
        {
            name: "Украина",
            cities: ["Киев","Днепр"],
        },
        {
            name: "Беларусь",
            cities: ["Минск"],
        },
        {
            name: "Казахстан",
            cities: ["Алматы","Астана"],
        },
        {
            name: "Кыргызская Республика",
            cities: ["Бишкек"],
        },
        {
            name:"Татарстан",
            cities: ['Казань']
        },
        {
            name: "Кипр",
            cities: []
        }
    ],
    colorStatic ={
        green: '#00a100',
        blue: '#5064c8',
        orange:'#f78c1c',
        blue2 :'#0ea0de',
        red: '#f20001',
    };
let massSort =[],
    numberAmbasActiv=0;
flagCountry = (country) =>{
    switch (country) {
        case 'Россия':
            return `<span class="flag-icon flag-icon-ru flag-icon-squared"></span>`;
            break;
        case 'Украина':
            return `<span class="flag-icon flag-icon-ua flag-icon-squared"></span>`;
            break;
        case 'Казахстан':
            return `<span class="flag-icon flag-icon-kz flag-icon-squared"></span>`;
            break;
        case 'Беларусь':
            return `<span class="flag-icon flag-icon-by flag-icon-squared"></span>`;
            break;
        case 'Кипр':
            return `<span class="flag-icon flag-icon-cy flag-icon-squared"></span>`;
            break;
        case 'Кыргызская Республика':
            return `<span class="flag-icon flag-icon-kg flag-icon-squared"></span>`;
            break;
        case 'Татарстан':
            return `<svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="14" height="17"><rect fill="#008000" width="14" height="7"/><rect fill="#FFF" width="14" height="3" y="7"/><rect fill="#F00" width="14" height="7" y="10"/></svg>`;
            break;
    }
    return ""
}
sortCountryCity = (mass, key, text) =>{
    let massFun = [];
    for(let i of mass){
        i[key].map(value =>{
            if(value === text){
                massFun.push(i)
            }
        })
    }
    return massFun;
}
sortStatus = (mass, text)=>{
    let massFun = [];
    mass.map(value => {
        if(value.status === text) {
            massFun.push(value)
        }
    })
    return massFun
}
sortName = (name) => {
    let massFun = [];
    name = name.toLocaleLowerCase();
    massAmbassadors.map(value => {
        if(value.name.toLocaleLowerCase().indexOf(name) !== -1){
            massFun.push(value)
        }
    })
    return massFun
}
soc = ( massSoc)=> {
    let res= ''
    for(let key in massSoc){
        // let n = 0;
        for(let i of massSoc[key]){
            if( key ==='email'){
                res += "<a href='mailto: " + i + " ' class='link_icon d-flex align-self-center'><i class='far fa-envelope fa-2x'></i></a>";
            }
            else{
                res += "<a href=' " + i + "' class='link_icon d-flex align-self-center'>"
                switch (key) {
                    case 'instagram':
                        res+= "<i class=\"fab fa-instagram fa-2x\"></i>";
                        break;
                    case 'facebook':
                        res+= "<i class=\"fab fa-facebook-square fa-2x\"></i>";
                        break;
                    case 'pinterest':
                        res+= "<i class=\"fab fa-pinterest-square fa-2x\"></i>";
                        break;
                    case 'telegram':
                        res+= "<i class=\"fab fa-telegram fa-2x\"></i>";
                        break;
                    case 'vk':
                        res+= '<i class="fab fa-vk fa-2x"></i>';
                        break;
                }
                res+="</a>"
            }
        }
    }
    return res;
};
addAmbassadors = (item) => {
    let color ='#00a100'
    switch (item.status) {
        case 'Ambassador':
            color = colorStatic.green
            break;
        case 'Regional Ambassador':
            color = colorStatic.blue
            break;
        case 'International Ambassador':
            color = colorStatic.orange
            break;
        case 'TOP Ambassador':
            color = colorStatic.blue2
            break;
        case 'Член Правления':
            color = colorStatic.red
            break;
    }
    let res = `<div class='item'> <div class='avatar' style='background-image: url(${item.img})'></div>`;
    res+= `<div class='text'><p class='name'>${item.name}</p>`;
    res+= `<p class='phone'>${item.tel.join('<br>')}</p>`;
    res+= "<p class='status'><svg width='19' height='16' viewBox='0 0 19 16' fill='none' xmlns='http://www.w3.org/2000/svg'>"
    res+= `<path d='M14.5595 15.0751V10.469C14.5595 10.1608 14.6099 8.62659 15.5965 8.62659C15.7826 8.62659 16.2519 8.67148 16.5749 9.08366C16.6545 9.18641 16.7305 9.28916 16.8043 9.38836C17.1051 9.79582 17.3028 10.0438 17.5065 10.0438C18.0355 10.0438 18.6254 9.14153 18.6254 7.84711C18.6254 6.55269 18.0355 5.65038 17.5065 5.65038C17.3028 5.65038 17.1062 5.89839 16.8043 6.30585C16.7305 6.40506 16.6545 6.50781 16.5749 6.61056C16.2519 7.02393 15.7826 7.06762 15.5965 7.06762C14.6087 7.06762 14.5595 5.53227 14.5595 5.2252V0.619141H9.99515C8.85108 0.619141 5.94278 0.619141 4.79876 0.619141H0.234373V15.0763H14.5595V15.0751Z' fill='${color}'/> </svg> ${item.status} </p>`
    res+= `<p class='country'> ${flagCountry(item.country[0])} `;
    res+= `${item.country.join(', ')} </p><p class='city'> <svg width='13' height='17' viewBox='0 0 13 17' fill='none' xmlns='http://www.w3.org/2000/svg'> <path d='M6.43132 0.0195312C3.17751 0.0195312 0.530273 2.82435 0.530273 6.27183C0.530273 9.64521 6.0051 15.5619 6.23826 15.8122L6.43132 16.0195L6.62438 15.8122C6.85754 15.5619 12.3324 9.64521 12.3324 6.27183C12.3324 2.82435 9.68513 0.0195312 6.43132 0.0195312ZM6.43132 4.71942C7.23908 4.71942 7.89634 5.41581 7.89634 6.27183C7.89634 7.12767 7.23908 7.82405 6.43132 7.82405C5.62357 7.82405 4.9663 7.12767 4.9663 6.27183C4.9663 5.41581 5.62357 4.71942 6.43132 4.71942Z' fill='#542AC8'/> </svg> ${item.city.join(', ')} </p>`
    res+= `<div class='soc'> ${soc(item.network)}</div><a href='${item.link}' class='but transp'>Регистрация</a></div></div>`;
    return res
}
const  addAmbus = document.getElementById('addAmbus'),
    addAmbasBtns = document.getElementById('addAmbasBtns');
addAmbasBtn =()=>{
    let n =numberAmbasActiv+13;
    for(let i= numberAmbasActiv + 1; i < n; i++){
        if(i >= massSort.length) {
            addAmbasBtns.style.display = "none";
            return;
        }
        addAmbus.innerHTML += addAmbassadors(massSort[i])
        numberAmbasActiv = parseInt(i);
    }
}
// filter
$('.sumo_select').SumoSelect();
const countryCityStatusBlock = document.querySelectorAll(".CaptionCont.SelectBox span"),
    selectCountryCityStatus = document.querySelectorAll("form select option[selected]"),
    formsAmbas=document.getElementById('fillter');
document.getElementById('delForm').addEventListener('click', ()=>{
    for(let i of selectCountryCityStatus){
        i.selected = true;
    }
    countryCityStatusBlock[0].innerHTML = selectCountryCityStatus[0].innerHTML;
    countryCityStatusBlock[2].innerHTML = selectCountryCityStatus[2].innerHTML;
    generationCity("0")
    formsAmbas.name.value = ""
    globalSort()
    addAmbasBtns.style.display = "block";
})
formsAmbas.name.addEventListener('keyup',()=>{globalSort()})
$(formsAmbas).change(()=>{
    globalSort()})
globalSort = ()=>{
    if(formsAmbas.name.value != "") massSort = sortName(formsAmbas.name.value);
    else{
        massSort.length = 0;
        massAmbassadors.map(value => massSort.push(value));
    }
    if(formsAmbas.country.value !== "0") massSort = sortCountryCity(massSort, 'country', formsAmbas.country.value);
    if(formsAmbas.city.value !== "0") massSort = sortCountryCity(massSort, 'city', formsAmbas.city.value);
    if(formsAmbas.status.value !== "0") massSort = sortStatus(massSort, formsAmbas.status.value);
    addAmbus.innerHTML = ""
    for(let i in massSort){
        if(i >= 12 ) break;
        addAmbus.innerHTML += addAmbassadors(massSort[i])
        numberAmbasActiv = parseInt(i);
    }
    if(massSort.length<12){
        addAmbasBtns.style.display = "none";
    }
    else {
        addAmbasBtns.style.display = "block";
    }
}
globalSort()
const selectSity = $("select.city");
generationCity = (n) => {
    selectSity.html('');
    selectSity.append("<option value='0' selected='selected'>Город</option>");
    selectSity[0].sumo.reload();
    if(n === "0"){
        let mass = []
        country.map(value =>mass = mass.concat(value.cities))
        mass.sort();
        mass.map((value) => $('select.city')[0].sumo.add(value, value))
        return;
    }
    for(let i of country){
        if(i.name === n) i.cities.map((value) => $('select.city')[0].sumo.add(value, value));
    }
}
generationCity("0")
country.map((value) => $('select.country')[0].sumo.add(value.name, value.name))
$("select.country").on('change', (e)=>{
    generationCity($(e.target).val());
 })
$('section.third.block .search_box .SumoSelect:nth-of-type(3) .options li:nth-of-type(2)').prepend("<img src=img/am1.svg>");
$('section.third.block .search_box .SumoSelect:nth-of-type(3) .options li:nth-of-type(3)').prepend("<img src=img/am2.svg>");
$('section.third.block .search_box .SumoSelect:nth-of-type(3) .options li:nth-of-type(4)').prepend("<img src=img/am3.svg>");
$('section.third.block .search_box .SumoSelect:nth-of-type(3) .options li:nth-of-type(5)').prepend("<img src=img/am4.svg>");
$('section.third.block .search_box .SumoSelect:nth-of-type(3) .options li:nth-of-type(6)').prepend("<img src=img/am5.svg>");



