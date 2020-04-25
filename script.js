//You can edit ALL of the code here
function setup() {
  const allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);
}

function makePageForEpisodes(episodeList) {
  const rootElem = document.getElementById("root");
  //Create search feature;
  rootElem.innerHTML = `<div id="search-episodes">
  <span class="search-bar">Search all episodes</span>
  <select id="episode-list"><option value = "test"></option></select>
  <input type="search" class="search-episodes" placeholder="Search for keywords">
  </div>`; 
  
  //div creation for all episodes
  let episodes = document.createElement("div");
  episodes.className = "episodeContainer";
  episodes.innerHTML = createNewList(episodeList);
  rootElem.appendChild(episodes)
  
  const getInputField = document.querySelector(".search-episodes");
  console.log(getInputField.value)
  // Dropdown rolling search
  const dropDownSearchMenu = document.querySelector("#episode-list");
  dropDownSearchMenu.addEventListener("change", function (event) {
    const episodeId = event.target.value;
    const episodesFilteredById = episodeList.filter(
      (episode) => episode.id == episodeId
    );
    episodes.innerHTML = createNewList(episodesFilteredById);
  });

  dropDownSearchMenu.innerHTML = createDropDownMenu(episodeList);
//DropDown menu
  function createDropDownMenu(episodeList) {
    return episodeList
      .map(function (item) {
        return `<option value =${item.id}>
    S${item.season.toString().padStart(2,"0")}
    E${item.number.toString().padStart(2, "0")} 
    ${item.name}</option>`;
      })
    .join("");
  }

  //Search Button function
  getInputField.addEventListener("keyup", function () {
    let filteredEpisodes = episodeList.filter(
      (episode) =>
        episode.summary.toLowerCase().includes(getInputField.value) ||
        episode.name.toLowerCase().includes(getInputField.value)
    );
    episodes.innerHTML = createNewList(filteredEpisodes);
  });

  function  createNewList(episodeList){ 
  return episodeList.map(function (item) {
     return `<div class="episode">
      <h1 class="episodeHeader">${item.name} - S${item.season.toString().padStart(2, "0")}E${item.number.toString().padStart(2, "0")}</h1>
      <img src=${item.image.medium} alt= ${item.name}>
      ${item.summary}
      </div>`;
    }).join('');
  }
}

window.onload = setup;
