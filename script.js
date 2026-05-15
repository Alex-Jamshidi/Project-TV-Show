const searchInput = document.getElementById("search-input");
const searchCount = document.getElementById("search-count");
const episodeSelector = document.getElementById("episode-selector");
const statusMessage = document.getElementById("status-message");
let allShows = [];
let allEpisodes = [];
const episodeCache = {};

function setup() {
  fetchTvShows()
    .then(function (tvShows) {
      allEpisodes = tvShows;
      statusMessage.textContent = "";
      allShows = tvShows.sort((a, b)) => a.name.localeCompare(b.name, undefined, {sensitivity: "base"});
      populateEpisodeSelect(tvShows);
      makePageForEpisodes(tvShows);
    })
    .catch(function (error) {
      // Requirement 5: Handle errors for the user
      statusMessage.textContent =
        "Failed to load episodes. Please try again later.";
      console.error(error);
    });
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

function fetchTvShows() {
  const tvShowURL = "https://api.tvmaze.com/shows/82/episodes";
  return fetch(tvShowURL).then(function (data) {
    return data.json();
  });
}

window.onload = setup;
