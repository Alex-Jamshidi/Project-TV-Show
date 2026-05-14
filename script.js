//You can edit ALL of the code here
const searchInput = document.getElementById("search-input");
const searchCount = document.getElementById("search-count");
const episodeSelector = document.getElementById("episode-selector");
let allEpisodes = [];

function setup() {
  allEpisodes = getAllEpisodes();
  createDropdownOptions(allEpisodes);
  makePageForEpisodes(allEpisodes);
  showAllEpisodes(allEpisodes);
}

function makePageForEpisodes(episodeList) {
  const rootElem = document.getElementById("root");
  rootElem.textContent = `Got ${episodeList.length} episode(s)`;

  document.getElementById("episodes").innerHTML = "";
}

function showAllEpisodes(allEpisodes) {
  const episodeCards = allEpisodes.map(createEpisodeCard);
  document.getElementById("episodes").append(...episodeCards);
}

function createEpisodeCard(episode) {
  const episodeCode = createEpisodeCode(episode);
  const episodeCard = document
    .getElementById("episode-card-template")
    .content.cloneNode(true);

  const section = episodeCard.querySelector("section");
  section.id = `ep-${episode.id}`;

  episodeCard.querySelector("img").src = episode.image.medium;
  episodeCard.querySelector("h3").textContent =
    `${episodeCode} - ${episode.name}`;
  episodeCard.querySelector("p").textContent = episode.summary;

  return episodeCard;
}

function createEpisodeCode(episode) {
  const seasonNum = String(episode.season);
  const episodeNum = String(episode.number);
  return `S${seasonNum.padStart(2, 0)}E${episodeNum.padStart(2, 0)}`;
}

searchInput.addEventListener("input", function () {
  const searchTerm = searchInput.value.toLowerCase();

  const filteredEpisodes = allEpisodes.filter(function (episode) {
    return (
      episode.name.toLowerCase().includes(searchTerm) ||
      episode.summary.toLowerCase().includes(searchTerm)
    );
  });

  makePageForEpisodes(filteredEpisodes);

  searchCount.textContent = `Displaying ${filteredEpisodes.length} / ${allEpisodes.length} episodes`;
});

window.onload = setup;

/*


   4. The medium-sized image for the episode
   5. The summary text of the episode

  */
