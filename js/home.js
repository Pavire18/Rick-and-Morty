const printHome = () =>{
    mainContainer.innerHTML=
    `
    <div class="header-home">
        <h1 class="header-home__title">RICK & MORTY</h1>
        <h2 class="header-home__subtitle">THE WIKI</h2>
    </div>
    <section class="section-home">
        <p class="section-home__text">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation</p>
        <div class="section-home__separator"></div>
        <div class="options">
            <button class="options__link" data-link="home_link1">PERSONAJES</button>
            <button class="options__link" data-link="home_link2">TEMPORADAS</button>
            <button class="options__link" data-link="home_link3">LOCALIZACIONES</button>
        </div>
    </section>
    `;
    addEventListenerHomeLinks();
    header.innerHTML=``;
    browser.innerHTML=``;
}

const addEventListenerHomeLinks = () =>{
    let options= [...document.getElementsByClassName('options__link')];
    options.forEach(element => {
        element.addEventListener('click', () => {
            printPage(element.getAttribute('data-link'));
        })
    });
}