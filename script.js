//You can edit ALL of the code here
function setup() {
  const allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);
}
function makePageForEpisodes(episodeList) {
  const rootElem = document.getElementById("root");
  rootElem.textContent = `Got ${episodeList.length} episode(s)`;
  let episodes = document.createElement("div");
  episodes.className = "episodeContainer";
  let newEpisodes = episodeList.map(function (item) {
    return `<div class="episode">
            <h1 class="episodeHeader">${
              item.name
            } - S${item.season.toString().padStart(2, "0")}E${item.number.toString().padStart(2, "0")}</h1>
            <img src=${item.image.medium} alt= ${item.name}
            <p>${item.summary}</p>
            </div>`;
  });
  episodes.innerHTML = newEpisodes;
  rootElem.appendChild(episodes);
  // console.log(episodes);
  // console.log(episodeList);
  
}
window.onload = setup;
