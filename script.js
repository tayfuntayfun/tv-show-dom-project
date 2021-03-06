const rootElem = document.getElementById("root");
//Create search feature;
rootElem.innerHTML = `
  <div id="search-episodes">
  <button class="home" type="button">HOME</button>
  <span class="search-bar">Series</span>
  <select id="series-list"></option></select>
  <span class="search-bar">Episodes</span>
  <select id="episode-list"></option></select>
  <input type="search" class="search-episodes"  placeholder="Search keywords"><p class="counter"></p>
  </div>
  <div class="episodeContainer"></div>`;

//Onload function / API fetch / default Serie: 1

const DefaultShow = "https://api.tvmaze.com/shows/1/episodes";

function setup() {
  fetch(DefaultShow)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      makePageForEpisodes(data);
    });

  let allShows = getAllShows();
  //Sort the Series
  allShows.sort(function (a, b) {
    if (a.name < b.name) {
      return -1;
    }
    if (a.name > b.name) {
      return 1;
    }
    // names must be equal
    return 0;
  });

  const showList = document.querySelector("#series-list");
  showList.innerHTML = seriesSelector(allShows);

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

  // Dropdown rolling Series
  const dropDownSearchMenu = document.querySelector("#episode-list");
  dropDownSearchMenu.addEventListener("change", function (event) {
    const episodeId = event.target.value;
    const episodesFilteredById = episodeList.find(
      (episode) => episode.id == episodeId
    );
    episodes.innerHTML = createNewList(episodesFilteredById);
  });

  dropDownSearchMenu.innerHTML = createDropDownMenu(episodeList);

  //Search Button function and counter
  getInputField.addEventListener("keyup", function () {
    filteredEpisodes = episodeList.filter(
      (episode) =>
        episode.summary
          .toLowerCase()
          .includes(getInputField.value.toLowerCase()) ||
        episode.name.toLowerCase().includes(getInputField.value.toLowerCase())
    );
    episodes.innerHTML = createNewList(filteredEpisodes);
    let searchCounter = document.querySelector(".counter");
    searchCounter.textContent = `${filteredEpisodes.length} episode(s)`;
  });
}

//Episodes Drop Down list
function createDropDownMenu(episodeList) {
  return episodeList
    .map((item) => {
      return `<option value =${item.id}>
      S${item.season.toString().padStart(2, "0")}
      E${item.number.toString().padStart(2, "0")} 
      ${item.name}</option>`;
    })
    .join("");
}

//Episodes creation / and render
function createNewList(episodeList) {
  let searchCounter = document.querySelector(".counter");
  searchCounter.textContent = `${episodeList.length} episode(s)`;
  return episodeList.length > 1
    ? episodeList
        .map((item) => {
          return `<div class="episode">
    <h1 class="episodeHeader">${item.name} - S${item.season
            .toString()
            .padStart(2, "0")}E${item.number.toString().padStart(2, "0")}</h1>
    <img src=${item.image.medium} alt= ${item.name}>
    ${item.summary}
    </div>`;
        })
        .join("")
    : `<div class="episode">
          <h1 class="episodeHeader">${
            episodeList.name
          } - S${episodeList.season
        .toString()
        .padStart(2, "0")}E${episodeList.number
        .toString()
        .padStart(2, "0")}</h1>
    <img src=${episodeList.image.medium} alt= ${episodeList.name}>
    ${episodeList.summary}
    </div>`;
}

//reset page to default
const homeBtn = document.querySelector(".home");
homeBtn.addEventListener("click", function () {
  location.reload(true);
});

function seriesSelector(shows) {
  return shows
    .map(function (item) {
      return `<option value =${item.id}>
  ${item.name}</option>`;
    })
    .join("");
}

window.onload = setup;
