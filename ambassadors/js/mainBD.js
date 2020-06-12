let massSort =[],
    numberAmbasActiv=0,
    massAmbassadors,country,colorStatic;
const requestURL = 'js/ambassadors.json';
let request = new XMLHttpRequest();
request.open('GET', requestURL);
request.responseType = 'json';
request.send();
request.onload = function() {
    const superHeroes = request.response;
    massAmbassadors = superHeroes.massAmbassadors;
    country = superHeroes.country;
    colorStatic = superHeroes.colorStatic;
};
const flagCountry = (country) =>{
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
const sortCountryCity = (mass, key, text) =>{
    let massFun = [];
    for(let i of mass){
        i[key].map(value =>{
            if(value === text)massFun.push(i)
        })
    }
    return massFun;
},
    sortStatus = (mass, text)=>{
    let massFun = [];
    mass.map(value => {
        if(value.status === text) massFun.push(value)
    })
    return massFun
},
    sortName = (name) => {
    let massFun = [];
    name = name.toLocaleLowerCase();
    massAmbassadors.map(value => {
        if(value.name.toLocaleLowerCase().indexOf(name) !== -1) massFun.push(value)
    })
    return massFun
},
    soc = (massSoc) => {
    let res= ''
    for(let key in massSoc){
        let n = 0,
            colorSoc = colorStatic.purple;
        for(let i of massSoc[key]){
            switch (n) {
                case 1:
                    colorSoc = colorStatic.green;
                    break;
                case 2:
                    colorSoc = colorStatic.blue;
                    break;
                case 3:
                    colorSoc = colorStatic.orange;
                    break;
                case 4:
                    colorSoc = colorStatic.blue2;
                    break;
                case 5:
                    colorSoc = colorStatic.red;
                    break;
                case 6:
                    colorSoc = colorStatic.purple;
                    n = 0
                    break;
            }
            if( key ==='email')res += `<a href='mailto: ${i}' class='link_icon d-flex align-self-center'><i class='far fa-envelope fa-2x' style="color: ${colorSoc}"></i></a>`;
            else{
                res += `<a href=' ${i} ' class='link_icon d-flex align-self-center'><i class="`;
                switch (key) {
                    case 'instagram':
                        res+= `fab fa-instagram fa-2x`;
                        break;
                    case 'facebook':
                        res+= `fab fa-facebook-square fa-2x`;
                        break;
                    case 'pinterest':
                        res+= `fab fa-pinterest-square fa-2x`;
                        break;
                    case 'telegram':
                        res+= `fab fa-telegram fa-2x`;
                        break;
                    case 'vk':
                        res+= `fab fa-vk fa-2x`;
                        break;
                }
                res+=`" style="color:${colorSoc}"></i></a>`
            }
            n++;
        }
        n=0;
    }
    return res;
},
    addAmbassadors = (item) => {
    let color = colorStatic.green;
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
    addAmbasBtns = document.getElementById('addAmbasBtns'),
    addAmbasBtn = () =>{
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
    generationCity("0");
    formsAmbas.name.value = "";
    globalSort();
    addAmbasBtns.style.display = "block";
})
formsAmbas.name.addEventListener('keyup',()=> globalSort());
$(formsAmbas).change(()=> globalSort());
const globalSort = ()=>{
    if(formsAmbas.name.value != "") massSort = sortName(formsAmbas.name.value);
    else{
        massSort.length = 0;
        massAmbassadors.map(value => massSort.push(value));
    }
    if(formsAmbas.country.value !== "0") massSort = sortCountryCity(massSort, 'country', formsAmbas.country.value);
    if(formsAmbas.city.value !== "0") massSort = sortCountryCity(massSort, 'city', formsAmbas.city.value);
    if(formsAmbas.status.value !== "0") massSort = sortStatus(massSort, formsAmbas.status.value);
    addAmbus.innerHTML = "";
    for(let i in massSort){
        if(i >= 12 ) break;
        addAmbus.innerHTML += addAmbassadors(massSort[i])
        numberAmbasActiv = parseInt(i);
    }
    addAmbasBtns.style.display = (massSort.length<12) ? "none" : "block";
}
const selectSity = $("select.city");
let generationCity = (n) => {
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
setTimeout(()=>{
    globalSort();
    country.map((value) => $('select.country')[0].sumo.add(value.name, value.name));
    generationCity("0");
},1000)
$("select.country").on('change', (e)=>generationCity(e.target.value))
$('.sumo_status .options li:nth-of-type(2)').prepend("<img src=img/am1.svg>");
$('.sumo_status .options li:nth-of-type(3)').prepend("<img src=img/am2.svg>");
$('.sumo_status .options li:nth-of-type(4)').prepend("<img src=img/am3.svg>");
$('.sumo_status .options li:nth-of-type(5)').prepend("<img src=img/am4.svg>");
$('.sumo_status .options li:nth-of-type(6)').prepend("<img src=img/am5.svg>");