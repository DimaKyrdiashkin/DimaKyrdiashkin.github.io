// slider contentBlockOne_row
if(window.innerWidth<=480){
    $('.contentBlockOne_row__element').removeClass('wow');
    const masBlock = document.querySelectorAll(".contentBlockOne_row .contentBlockOne_row__element");
    let n = 0;
    setInterval(()=> {
        let nn = parseInt(n);
        masBlock[n].classList.remove("element_active");
        masBlock[n].classList.add("element_right");
        n++;
        if(n=== masBlock.length)n=0;
        masBlock[n].classList.remove("element_left");
        masBlock[n].classList.add("element_active");
        setTimeout(()=>{
            masBlock[nn].classList.remove("element_right");
            masBlock[nn].classList.add("element_left");

        },2000);

    }, 5000);
}

// slider /contentBlockOne_row