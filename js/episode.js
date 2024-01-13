const printDetailEpisode = (url) =>{
    getEpisode(url).then(response => {
        let episodeDetail= formatepisodeDetail(response);
        mainContainer.innerHTML=`
        <div class="general-detail">
            ${episodeDetail}
        </div>
    `
    addEpisodeCharacters(response.characters);
});

}


const formDataEpisode= (data) => {
    let dataFormated={
        name: data.name,
        air_date: data.air_date,
        episode: data.episode,
        characters: data.characters
    }

    return dataFormated;
}


const formatepisodeDetail= (response) =>{
    return`
    <p class="general-detail__name">${response.name}</p>
        <div class="general-detail__data">
            <div class="general-detail__texts">
                <div class="general-detail__text">
                    <p class="general-detail__title">EPISODE</p>
                    <p class="general-detail__info">${response.episode}</p>
                </div>
                <div class="general-detail__text">
                    <p class="general-detail__title">DATE</p>
                    <p class="general-detail__info">${response.air_date}</p>
                </div>
            </div>
            <p class="general-detail__title">RESIDENTS</p>
            <div class="general-detail__characters-list">
            </div>
        </div>
    `;
}

const getEpisode = async (url) => {
    let response= await fetch(url);
    let data = await response.json();
    data= formDataEpisode(data);
    return data;
}

const addEpisodeCharacters = (characters) =>{
    let residentList=document.querySelector('.general-detail__characters-list');
    characters.forEach(element => {
        let residentImg='https://rickandmortyapi.com/api/character/avatar/'+element.split('https://rickandmortyapi.com/api/character/')[1]+'.jpeg';
        let resident=document.createElement('img');
        resident.classList.add('general-detail__img');
        resident.setAttribute('src',residentImg);
        resident.addEventListener('click', () =>{
            printPage('home_link1_1',element);
        });
        residentList.appendChild(resident);
    });
}
