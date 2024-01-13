printBrowser = (section) =>{
    browser.innerHTML=`
    <div class="browser">
        <i class="fa-solid fa-magnifying-glass browser__icon" onclick="printFilterData('${section}')"></i>
        <div class="browser__separator"></div>
        <select name="parameters" id="parameters" class="browser__selector">

        </select>
        <input class="browser__input"  type="text" ></input>
    </div>
    `;
    printSelectorBySection(section);
}


const printFilterData =(section) =>{
    let input= document.querySelector('.browser__input');
    let selector= document.querySelector('.browser__selector');
    mainContainer.innerHTML=``;
    dataAll=[];
    urlNext=null;
    if(section==='home_link1'){
        printCharacters(input.value, selector.value);
    }else{
        printLocations(input.value, selector.value);
    }

}


const printSelectorBySection = (section) =>{
    let selector= document.querySelector('.browser__selector');
    if(section==='home_link1'){
        selector.innerHTML=`
        <option value="name">Name</option>
        <option value="status">Status</option>
        <option value="species">Species</option>
        <option value="type">Type</option>
        <option value="gender">Gender</option>
    `;
    }else{
        selector.innerHTML=`
        <option value="name">Name</option>
        <option value="dimension">Dimension</option>
        <option value="type">Type</option>
    `;
    }
   
}