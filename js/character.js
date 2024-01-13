const printDetailCharacter = (url) =>{
    getCharacter(url).then(response => {
        let characterDetail= formatCharacterDetail(response);
        mainContainer.innerHTML=`
        <section class="character">
            ${characterDetail}
        </section>
    `
    putStatus(response.status);
    addEpisodes(response.episodes);
    addEventListenerToLocation(response.locationUrl);
});

}


const formDataCharacter= (data) => {
    let dataFormated={
        name: data.name.toUpperCase(),
        img: data.image,
        gender: data.gender,
        status: data.status,
        species:data.species,
        originName: data.origin.name,
        originUrl: data.origin.url,
        locationName: data.location.name,
        locationUrl: data.location.url,
        episodes: data.episode
    }

    return dataFormated;
}


const formatCharacterDetail= (response) =>{
    return`
    <div class="character__presentation">
    <img class="character__img" src="${response.img}"></img>
    <h3 class="character__name">${response.name}</h3>
</div>
<div class="character__data">
    <p class="character__title">STATUS</p>
    <div class="character__status-list">
        <p class="character__alive">ALIVE</p>
        <p class="character__dead">DEAD</p>
        <p class="character__uknown">UKNOWN</p>
    </div>
    <div class="character__texts">
        <div>
            <p class="character__title">SPECIES</p>
            <p class="character__info">${response.species}</p>
        </div>
       <div>
            <p class="character__title">ORIGIN</p>
            <p class="character__info">${response.originName}</p>
       </div>
       <div>
            <p class="character__title">LOCATION</p>
            <p class="character__location">${response.locationName}</p>
       </div>
    </div>
    <p class="character__title">EPISODE</p>

    <div class="character__episode-list">
    </div>

</div>
    `;
}

const getCharacter = async (url) => {
    let response= await fetch(url);
    let data = await response.json();
    data= formDataCharacter(data);
    return data;
}

const putStatus = (status) =>{
    let element= document.querySelector('.character__'+status.toLowerCase());
    element.classList +='--checked';
}
const addEpisodes = (episodes) =>{
    let episodeList=document.querySelector('.character__episode-list');
    episodes.forEach(element => {
        let episodeId=element.split('https://rickandmortyapi.com/api/episode/')[1];
        let episode=document.createElement('p');
        episode.textContent=episodeId;
        episode.classList.add('character__episode');
        episode.addEventListener('click', () =>{
            printPage('home_link2_1',element);
        });
        episodeList.appendChild(episode);
    });
}

const addEventListenerToLocation = (location) => {
    let locationElement=document.querySelector('.character__location');
    locationElement.addEventListener('click', () =>{
        printPage('home_link3_1',location);
    });

}