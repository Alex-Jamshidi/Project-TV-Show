const searchInput = document.getElementById("search-input");
const searchCount = document.getElementById("search-count");
const episodeSelector = document.getElementById("episode-selector");
let allEpisodes = [];

function setup() {
  allEpisodes = getAllEpisodes();
  populateEpisodeSelect(allEpisodes);
  makePageForEpisodes(allEpisodes);
}

function makePageForEpisodes(episodeList) {
  document.getElementById("episode-select").innerHTML = "";
  document.getElementById("episodes").innerHTML = "";
  populateEpisodeSelect(episodeList);
  showAllEpisodes(episodeList);
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

function populateEpisodeSelect(episodes) {
  const select = document.getElementById("episode-select");
  episodes.forEach((episode) => {
    const option = document.createElement("option");
    option.value = episode.id;
    option.textContent = `${createEpisodeCode(episode)} - ${episode.name}`;
    select.appendChild(option);
  });
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

const episodeSelect = document.getElementById("episode-select");
episodeSelect.addEventListener("change", (event) => {
  const targetId = `ep-${event.target.value}`;

  if (targetId) {
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }
});

// const tvShowURL = "https://api.tvmaze.com/shows/82/episodes";
fetch(tvShowURL);

window.onload = setup;

// 1. You must delete the `episodes.js` file from your repository.
// 2. Your website must still work the same, but by using a `fetch` request to https://api.tvmaze.com/shows/82/episodes. This URL should serve the exact same content as was returned by `getAllEpisodes` in `episodes.js`.
// 3. You must fetch this URL only _once_ per visit to your website. You should not re-fetch when someone searches, scrolls, or selects an episode from the drop-down.
// 4. If you don't have data yet, you should show something to tell the user to wait for the data.
// 5. If an error occurred loading the data, notify the user.
//   1. Note: real users don't look in the console - `console.log` or `console.error` are not sufficient for this requirement.
//   2. You will need to simulate an error to test this out yourself.
