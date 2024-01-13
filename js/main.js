const mainContainer = document.querySelector('.main');
const header = document.querySelector('.header');
const browser = document.querySelector('.browser-container');
const URL_BASE='https://rickandmortyapi.com/api';
let contadorPaginas=0;

const SUBTITLE ={
    home_link1: 'CHARACTERS FINDER',
    home_link1_1: 'CHARACTER DETAIL',
    home_link2: 'SEASONS FINDER',
    home_link2_1: 'SEASON DETAIL',
    home_link3: 'LOCATION FINDER',
    home_link3_1: 'LOCATION DETAIL'
}


window.onload = ()  => {
    if(localStorage.length!=0){
        let page=JSON.parse(localStorage.getItem('page'+(localStorage.length-1)));
        contadorPaginas=localStorage.length-1;
        printPage(page.id,page.url);
    }else{
        printHome();
        let page={id:'home' ,data:''};
        let historic=[];
        historic.push(page);
        localStorage.setItem('page'+contadorPaginas, JSON.stringify(page));
    }

}


const printPage = (section, url) =>{
    switch (section) {
        case 'home_link1' :
            printCharacters()
            printBrowser(section);
        case 'home_link1_1' :
            printDetailCharacter(url);
            break;
        case 'home_link2':
            printSeasons()
        case 'home_link2_1':
            printDetailEpisode(url);
            break;
        case 'home_link3':
            printLocations();
            printBrowser(section);
        case 'home_link3_1':
            printDetailLocations(url);
            break;
        case 'home':
            printHome();
            break;
    }

    if(JSON.parse(localStorage.getItem('page'+contadorPaginas)).id!==section){
        page={id:section , url:url};
        contadorPaginas++;
        localStorage.setItem('page'+contadorPaginas, JSON.stringify(page));
    }


    printHeader(SUBTITLE[section]);
    window.scroll(0,0);
}