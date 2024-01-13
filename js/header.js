printHeader = (subtitle) =>{
    header.innerHTML=
    `
    <div class="header__main">
        <div class="header__data">
            <p class="header__title">RICK & MORTY</p>
            <p class="header__subtitle">THE WIKI</p>
            <i class="fa-solid fa-arrow-left arrow"></i>
        </div>
    </div>
    <div class="header__section">
        <h1 class="header__option">${subtitle}</h1>
    </div>
    `;
    addEventListenerToArrowBack();
}

const addEventListenerToArrowBack = () =>{
    let arrow=document.querySelector('.arrow');
    arrow.addEventListener('click', () =>{
        btnGoBack();
    });
}

const btnGoBack = () =>{
    localStorage.removeItem('page'+contadorPaginas);
    contadorPaginas--;
    let page=JSON.parse(localStorage.getItem('page'+contadorPaginas));
    if(page.id!=='home'){
        printPage(page.id,page.url);
    }else{
        printHome();
    }

}
