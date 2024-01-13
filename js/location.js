
const printDetailLocations = (url) =>{
    getLocation(url).then(response => {
        let locationDetail= formatLocationDetail(response);
        mainContainer.innerHTML=`
        <div class="general-detail">
            ${locationDetail}
        </div>
    `
    addResidents(response.residents);
});

}


const formDataLocation= (data) => {
    let dataFormated={
        name: data.name,
        dimension: data.dimension,
        type: data.type,
        residents: data.residents
    }

    return dataFormated;
}


const formatLocationDetail= (response) =>{
    return`
    <p class="general-detail__name">${response.name}</p>
        <div class="general-detail__data">
            <div class="general-detail__texts">
                <div class="general-detail__text">
                    <p class="general-detail__title">TYPE</p>
                    <p class="general-detail__info">${response.type}</p>
                </div>
                <div class="general-detail__text">
                    <p class="general-detail__title">DIMENSION</p>
                    <p class="general-detail__info">${response.dimension}</p>
                </div>
            </div>
            <p class="general-detail__title">RESIDENTS</p>
            <div class="general-detail__characters-list">
            </div>
        </div>
    `;
}

const getLocation = async (url) => {
    let response= await fetch(url);
    let data = await response.json();
    data= formDataLocation(data);
    return data;
}

const addResidents = (residents) =>{
    let residentList=document.querySelector('.general-detail__characters-list');
    residents.forEach(element => {
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


/*
mainContainer.innerHTML=`
    <div class="general-detail">
        <p class="general-detail__name">Citadel of Ricks</p>
        <div class="general-detail__data">
            <div class="general-detail__texts">
                <div class="general-detail__text">
                    <p class="general-detail__title">TYPE</p>
                    <p class="general-detail__info">Space Station</p>
                </div>
                <div class="general-detail__text">
                    <p class="general-detail__title">DIMENSION</p>
                    <p class="general-detail__info">Unknown</p>
                </div>
            </div>
            <p class="general-detail__title">RESIDENTS</p>
            <div class="general-detail__characters-list">
                <img class="general-detail__img" src="https://rickandmortyapi.com/api/character/avatar/1.jpeg"></img>
                <img class="general-detail__img" src="https://rickandmortyapi.com/api/character/avatar/1.jpeg"></img>
                <img class="general-detail__img" src="https://rickandmortyapi.com/api/character/avatar/1.jpeg"></img>
                <img class="general-detail__img" src="https://rickandmortyapi.com/api/character/avatar/1.jpeg"></img>
                <img class="general-detail__img" src="https://rickandmortyapi.com/api/character/avatar/1.jpeg"></img>
                <img class="general-detail__img" src="https://rickandmortyapi.com/api/character/avatar/1.jpeg"></img>
                <img class="general-detail__img" src="https://rickandmortyapi.com/api/character/avatar/1.jpeg"></img>
            </div>
        </div>
    </div>`;
*/