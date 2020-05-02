const rootElem = document.getElementById("root");
  //Create search feature;
rootElem.innerHTML = `
  <div id="search-episodes">
  <button class="home" type="button">HOME</button>
  <span class="search-bar">Series</span>
  <select id="series-list"></option></select>
  <span class="search-bar">Episodes</span>
  <select id="episode-list"></option></select>
  <input type="search" class="search-episodes"  placeholder="Search keywords">
  </div>
  <div class="episodeContainer"></div>`; 

//Onload function / API fetch / default Serie: 1
function setup() {
  fetch("https://api.tvmaze.com/shows/1/episodes")
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      makePageForEpisodes(data);
    });

  const allShows = getAllShows();
  const showList = document.querySelector("#series-list");
  showList.innerHTML = serieSelector(allShows);

  showList.addEventListener("change", function (event) {
    const showId = event.target.value;
    fetch(`https://api.tvmaze.com/shows/${showId}/episodes`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        makePageForEpisodes(data);
      });
  });
}

//content create
function makePageForEpisodes(episodeList) {
  let episodes = document.querySelector(".episodeContainer");
  episodes.innerHTML = createNewList(episodeList);
  
  const getInputField = document.querySelector(".search-episodes");
  // Dropdown rolling search
  const dropDownSearchMenu = document.querySelector("#episode-list");
  dropDownSearchMenu.addEventListener("change", function (event){
    const episodeId = event.target.value;
    const episodesFilteredById = episodeList.filter(
    (episode) => episode.id == episodeId
    );
    episodes.innerHTML = createNewList(episodesFilteredById);
  });

  dropDownSearchMenu.innerHTML = createDropDownMenu(episodeList);
  //Search Button function
  getInputField.addEventListener("keyup", function () {
    let filteredEpisodes = episodeList.filter(
      (episode) =>
        episode.summary.toLowerCase().includes(getInputField.value.toLowerCase()) ||
        episode.name.toLowerCase().includes(getInputField.value.toLowerCase())
    );
    episodes.innerHTML = createNewList(filteredEpisodes);
    // counter(filteredEpisodes)
  });
}

// function counter(filtered){
//   let getMainHeader = document.querySelector("#search-episodes")
//     getMainHeader.innerHTML += `${filtered.length} episode(s)`;
//     getMainHeader.document.style.color = "white"
// }

//Episodes List
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

function  createNewList(episodeList){ 
return episodeList.map(function (item) {
    return `<div class="episode">
    <h1 class="episodeHeader">${item.name} - S${item.season.toString().padStart(2, "0")}E${item.number.toString().padStart(2, "0")}</h1>
    <img src=${item.image.medium} alt= ${item.name}>
    ${item.summary}
    </div>`;
  }).join('');
}

//reset page to default
const homeBtn = document.querySelector(".home");
homeBtn.addEventListener("click", function () {
  location.reload(true);
});

function serieSelector(shows) {
  return shows
    .map(function (item) {
      return `<option value =${item.id}>
  ${item.name}</option>`;
    })
    .join("");
}

window.onload = setup;
