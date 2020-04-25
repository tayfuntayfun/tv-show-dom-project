//You can edit ALL of the code here
function setup() {
  const allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);
}

function makePageForEpisodes(episodeList) {
  const rootElem = document.getElementById("root");
  //Create search feature;
  rootElem.innerHTML = `<span id="search-bar">Search all episodes</span>
                        <input type="search" id="search-content" placeholder="Search for..">`; 
  
  //div creation for all episodes
  let episodes = document.createElement("div");
  episodes.className = "episodeContainer";
  episodes.innerHTML = createNewList(episodeList);
  rootElem.appendChild(episodes)
  
  //Search Button function
  let getSearchButton = document.getElementById("search-content");
  getSearchButton.addEventListener("input", function () {
  let filteredEpisodes = episodeList.filter((key) => key.summary.toLowerCase().includes(getSearchButton.value) ||
  key.name.toLowerCase().includes(getSearchButton.value)
  );
  episodes.innerHTML = createNewList(filteredEpisodes);
});
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

window.onload = setup;
