const  mass_a= document.getElementsByClassName('doc_ul_item_a'),
    modelDocB = document.getElementById("model_doc"),
    bodyEle = document.getElementsByTagName('body')[0],
    massText = document.getElementsByClassName('modal_text'),
    modelH2= document.getElementById('model_header_h2'),
    modelClose = ()=>{
    bodyEle.style.overflowY = "scroll";
    modelDocB.classList.remove('modal_active');
}


const modelOpenDoc = (name) => {
    bodyEle.style.overflowY = "hidden";
    modelDocB.classList.add('modal_active')
    for(let i of massText){
        i.style.display = "none"
    }
    console.log(name)
    switch (name) {
        case 'AMLP':
            modelH2.innerText = 'КПОЛИТИКА KYC/AML (KNOW YOUR CUSTOMER /ANTI-MONEY LAUNDERING POLICY)'
            break;
        case "AMLP":
    }
    document.getElementById(name).style.display = "block"
}

modelDocB.addEventListener("click", modelClose)


for(let i of mass_a){
    i.addEventListener('click',()=>{
        const name = i.getAttribute('data-modal-doc')
        modelOpenDoc(name)
    })
}