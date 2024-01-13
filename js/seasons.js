


const  printSeasons = () =>{
    mainContainer.innerHTML ="";
    getEpisodes().then(response => {
        let seasonCards = createSeasonsCards(response);
        mainContainer.innerHTML = `
            <div class="card-list">
                ${seasonCards}
            </div>
            `;
            addEventListenerToSeasonsLinks(response);
    });


}


//HACER GLOBAL commons.js
const addEventListenerToSeasonsLinks =(characters) =>{
    let seasonsLinks= [...document.getElementsByClassName('season-card__episode')];
    seasonsLinks.forEach((element, i) => {
        element.addEventListener('click', () =>{
            printPage(element.getAttribute('data-link'),characters[i].urlDetail);
        });
    });
}


const createSeasonsCards = (data) =>{

    let seasons=formatSeasons(data);
    let cards=seasons.map((season,i) => {

        let episodesLayout=addSeasonsEpisodes(season);
        let date=season[0].air_date + ' - ' + season[season.length-1].air_date;

        return `
        <div class="season-card">
            <p class="season-card__title">SEASON ${i+1}</p>
            <p class="season-card__subtitle">DATE</p>
            <p class="season-card__date">${date}</p>
            <p class="season-card__subtitle">EPISODES</p>
            <div class="season-card__episode-list">
                ${episodesLayout}
            </div>
        </div>

        `;
    }).join('');
    return cards;
}

const addSeasonsEpisodes = (season) =>{
    let episodes=``;
    season.forEach(element => {
        episodes+=`<button class="season-card__episode"  data-link="home_link2_1">${element.name}</button>`;
    });
    return episodes;
}


const formatSeasons = (data) =>{
    let numSeasons=parseInt(data[data.length-1].episode.substring(1,3));
    let seasons=[];
    for (let i = 0; i < numSeasons; i++) {
        let season=data.filter((episode) => parseInt(episode.episode.substring(1,3))===i+1);
        seasons.push(season);
    }
    return seasons;
    // return data.reduce((acc,curr)=>{
    //     const season=curr.episode.substring(0,3);
    //     if(Object.keys(acc).every(val=>val !== season)){
    //         acc[season]=[curr];
    //     }else{
    //         acc[season].push(curr);
    //     }
    //     return acc;
    // },{});
}

const getEpisodes = async () =>{
    let url= URL_BASE+'/episode';
    let urlNext = null;
    let dataAll =[];
    do {

        let response= urlNext!==null ? await fetch(urlNext) : await fetch(url);
        data = await response.json();
        dataAll= [...dataAll, ...mapDataEpisodes(data.results)];
        urlNext = data.info.next;

    } while (urlNext!==null);
    return dataAll;
}

const mapDataEpisodes = (data) =>{
    let dataMapped= data.map( episode => {
        let object ={
            name:episode.name,
            air_date: episode.air_date,
            episode: episode.episode,
            urlDetail: episode.url
        }
        return object;
    });

    return dataMapped;
}
