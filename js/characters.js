let urlNext = null;
let dataAll =[];


const printCharacters = (info, parameter) =>{
    mainContainer.innerHTML ="";
    getCharacters(info, parameter).then(response => {
        let charactersCards = createCharactersCards(response);
        mainContainer.innerHTML = `
            <div class="card-list">
                ${charactersCards}
            </div>
            <button class="card-list__btn"  data-link="home_link1" onClick="printCharacters()"> + MORE </button>
            `;
            addEventListenerToCharactersLinks(response);
    });


}


//HACER GLOBAL commons.js
const addEventListenerToCharactersLinks =(characters) =>{
    let charactersLinks= [...document.getElementsByClassName('character-card__btn')];
    charactersLinks.forEach((element, i) => {
        element.addEventListener('click', () =>{
            printPage(element.getAttribute('data-link'),characters[i].urlDetail);
        });
    });
}


const createCharactersCards = (data) =>{
    let cards=data.map(character => {
        let status_style='unknown';
        switch (character.status) {
            case 'Dead':
                status_style='dead';
                break;
            case 'Alive':
                status_style='alive';
            default:
                break;
        }
        return `
        <div class="character-card">
            <div class="character-card__title">
                <p class="character-card__name">${character.name}</p>
                <p class="character-card__${status_style}">${character.status}</p>
            </div>
            <div class="character-card__data">
                <img class="character-card__img" src="${character.image}"></img>
                <div class="character-card__info">
                    <p class="character-card__subtitle">SPECIES</p>
                    <p class="character-card__text">${character.species}</p>
                    <p class="character-card__subtitle">GENDER</p>
                    <p class="character-card__text">${character.gender}</p>
                    <p class="character-card__subtitle">ORIGIN</p>
                    <p class="character-card__text">${character.origin}</p>
                    <p class="character-card__subtitle">LOCATION</p>
                    <p class="character-card__text">${character.location}</p>
                </div>
            </div>
            <button class="character-card__btn" data-link="home_link1_1">+ MORE DETAILS</button>
        </div>

        `;
    }).join('');
    return cards;
}

const getCharacters = async (info, parameter) =>{
    let url= URL_BASE+'/character';

    if(info){
        url+=`/?${parameter}=${info}`;
    }
        let response= urlNext!==null ? await fetch(urlNext) : await fetch(url);
        data = await response.json();
        dataAll= [...dataAll, ...mapDataCharacters(data.results)];
        urlNext = data.info.next;
    return dataAll;
}

const mapDataCharacters = (data) =>{
    let dataMapped= data.map( character => {
        let object ={
            name:character.name,
            status: character.status,
            species: character.species,
            origin: character.origin.name.split('(')[0],
            location: character.location.name.split('(')[0],
            gender: character.gender,
            image: character.image,
            urlDetail: character.url
        }
        return object;
    });

    return dataMapped;
}






    // mainContainer.innerHTML=
    // `
    // <div class="card-list">
    //     <div class="character-card">
    //         <div class="character-card__title">
    //             <p class="character-card__name">Rick Sanchez</p>
    //             <p class="character-card__status">ALIVE</p>
    //         </div>
    //         <div class="character-card__data">
    //             <img class="character-card__img" src="https://rickandmortyapi.com/api/character/avatar/1.jpeg"></img>
    //             <div class="character-card__info">
    //                 <p class="character-card__subtitle">SPECIES</p>
    //                 <p class="character-card__text">HUMAN</p>
    //                 <p class="character-card__subtitle">GENDER</p>
    //                 <p class="character-card__text">Male</p>
    //                 <p class="character-card__subtitle">ORIGIN</p>
    //                 <p class="character-card__text">Earth</p>
    //                 <p class="character-card__subtitle">LOCATION</p>
    //                 <p class="character-card__text">Earth</p>
    //             </div>
    //         </div>
    //         <button class="character-card__btn">+ MORE DETAILS</button>
    //     </div>

    //     <div class="character-card">
    //         <div class="character-card__title">
    //             <p class="character-card__name">Rick Sanchez</p>
    //             <p class="character-card__status">ALIVE</p>
    //         </div>
    //         <div class="character-card__data">
    //             <img class="character-card__img" src="https://rickandmortyapi.com/api/character/avatar/1.jpeg"></img>
    //             <div class="character-card__info">
    //                 <p class="character-card__subtitle">SPECIES</p>
    //                 <p class="character-card__text">HUMAN</p>
    //                 <p class="character-card__subtitle">GENDER</p>
    //                 <p class="character-card__text">Male</p>
    //                 <p class="character-card__subtitle">ORIGIN</p>
    //                 <p class="character-card__text">Earth</p>
    //                 <p class="character-card__subtitle">LOCATION</p>
    //                 <p class="character-card__text">Earth</p>
    //             </div>
    //         </div>
    //         <button class="character-card__btn">+ MORE DETAILS</button>
    //     </div>

    //     <div class="character-card">
    //     <div class="character-card__title">
    //         <p class="character-card__name">Rick Sanchez</p>
    //         <p class="character-card__status">ALIVE</p>
    //     </div>
    //     <div class="character-card__data">
    //         <img class="character-card__img" src="https://rickandmortyapi.com/api/character/avatar/1.jpeg"></img>
    //         <div class="character-card__info">
    //             <p class="character-card__subtitle">SPECIES</p>
    //             <p class="character-card__text">HUMAN</p>
    //             <p class="character-card__subtitle">GENDER</p>
    //             <p class="character-card__text">Male</p>
    //             <p class="character-card__subtitle">ORIGIN</p>
    //             <p class="character-card__text">Earth</p>
    //             <p class="character-card__subtitle">LOCATION</p>
    //             <p class="character-card__text">Earth</p>
    //         </div>
    //     </div>
    //     <button class="character-card__btn">+ MORE DETAILS</button>
    // </div>



    // </div>
    // `;