

const printLocations = (info, parameter) =>{
    mainContainer.innerHTML ="";
    getLocations(info, parameter).then(response => {
        let locationCards = createLocationsCards(response);
        mainContainer.innerHTML = `
            <div class="card-list">
                ${locationCards}
            </div>
            <button class="card-list__btn"  data-link="home_link3" onClick="printLocations()"> + MORE </button>
            `;
            addEventListenerToLocationLinks(response);
    });


}


//HACER GLOBAL commons.js
const addEventListenerToLocationLinks =(characters) =>{
    let charactersLinks= [...document.getElementsByClassName('location-card__btn')];
    charactersLinks.forEach((element, i) => {
        element.addEventListener('click', () =>{
            printPage(element.getAttribute('data-link'),characters[i].urlDetail);
        });
    });
}


const createLocationsCards = (data) =>{
    let cards=data.map(location => {
        return `
        <div class="location-card">
            <p class="location-card__name">${location.name}</p>
            <div class="location-card__data">
                <div class="location-card__info">
                    <p class="location-card__text1">TYPE</p>
                    <p class="location-card__text2">${location.type}</p>
                </div>
                <div class="location-card__separator"> </div>
                <div class="location-card__info">
                    <p class="location-card__text1">DIMENSION</p>
                    <p class="location-card__text2">${location.dimension}</p>
                </div>
            </div>
            <button class="location-card__btn" data-link="home_link3_1">+ MORE DETAILS</button>
        </div>

        `;
    }).join('');
    return cards;
}

const getLocations = async (info, parameter) =>{
    let url= URL_BASE+'/location';
    if(info){
        url+=`/?${parameter}=${info}`;
    }
    let response= urlNext!==null ? await fetch(urlNext) : await fetch(url);
    data = await response.json();
    dataAll= [...dataAll, ...mapDataLocations(data.results)];
    urlNext = data.info.next;

    return dataAll;
}

const mapDataLocations = (data) =>{
    let dataMapped= data.map( location => {
        let object ={
            name:location.name,
            type: location.type,
            dimension: location.dimension,
            urlDetail: location.url
        }
        return object;
    });

    return dataMapped;
}
