const searchInput = document.getElementById("search-input");
const searchCount = document.getElementById("search-count");
const showSelect = document.getElementById("show-select");
const episodeSelect = document.getElementById("episode-select");
const statusMessage = document.getElementById("status-message");
let allShows = [];
let allEpisodes = [];
const episodeCache = {}; // cache episodes per-show: { [showId]: [episodes] }

function setup() {
  fetchTvShows()
    .then(function (tvShows) {
      statusMessage.textContent = "";
      // sort shows alphabetically, case-insensitive
      allShows = tvShows.sort((a, b) =>
        a.name.localeCompare(b.name, undefined, { sensitivity: "base" }),
      );
      populateShowSelect(allShows);

      // By default, don't fetch episodes for every show; wait for user to pick one.
      // Optionally, you could auto-select the first show:
      if (allShows.length > 0) {
        showSelect.value = allShows[0].id;
        return loadEpisodesForShow(allShows[0].id);
      }
    })
    .catch(function (error) {
      // Requirement 5: Handle errors for the user
      statusMessage.textContent =
        "Failed to load episodes. Please try again later.";
      console.error(error);
    });
}

function makePageForEpisodes(episodeList) {
  episodeSelect.innerHTML = "";
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

  // image may be missing
  const img = episodeCard.querySelector("img");
  if (episode.image && episode.image.medium) {
    img.src = episode.image.medium;
  } else {
    img.remove();
  }

  episodeCard.querySelector("h3").textContent =
    `${episodeCode} - ${episode.name}`;
  episodeCard.querySelector("p").innerHTML =
    episode.summary || "<em>No summary available.</em>";

  return episodeCard;
}

function createEpisodeCode(episode) {
  const seasonNum = String(episode.season);
  const episodeNum = String(episode.number);
  return `S${seasonNum.padStart(2, 0)}E${episodeNum.padStart(2, 0)}`;
}

function populateEpisodeSelect(episodes) {
  // episodes: array of episode objects for the currently selected show
  const select = episodeSelect;
  // default option to show all
  const defaultOption = document.createElement("option");
  defaultOption.value = "";
  defaultOption.textContent = "Show all episodes";
  select.appendChild(defaultOption);

  episodes.forEach((episode) => {
    const option = document.createElement("option");
    option.value = episode.id;
    option.textContent = `${createEpisodeCode(episode)} - ${episode.name}`;
    select.appendChild(option);
  });
}

searchInput.addEventListener("input", function () {
  const searchTerm = searchInput.value.trim().toLowerCase();

  const filteredEpisodes = allEpisodes.filter(function (episode) {
    const name = (episode.name || "").toLowerCase();
    const summary = (episode.summary || "").toLowerCase();
    return name.includes(searchTerm) || summary.includes(searchTerm);
  });

  makePageForEpisodes(filteredEpisodes);

  searchCount.textContent = `Displaying ${filteredEpisodes.length} / ${allEpisodes.length} episodes`;
});
episodeSelect.addEventListener("change", (event) => {
  const targetId = `ep-${event.target.value}`;
  // if user chose the empty option, show all episodes for the current show
  if (!event.target.value) {
    makePageForEpisodes(allEpisodes);
    return;
  }

  const element = document.getElementById(targetId);
  if (element) {
    element.scrollIntoView({ behavior: "smooth", block: "start" });
  }
});

function fetchTvShows() {
  const tvShowURL = "https://api.tvmaze.com/shows";
  return fetch(tvShowURL).then(function (data) {
    return data.json();
  });
}

function populateShowSelect(shows) {
  // clear existing
  showSelect.innerHTML = "";
  const defaultOption = document.createElement("option");
  defaultOption.value = "";
  defaultOption.textContent = "Select a show...";
  showSelect.appendChild(defaultOption);

  shows.forEach((show) => {
    const option = document.createElement("option");
    option.value = show.id;
    option.textContent = show.name;
    showSelect.appendChild(option);
  });
}

function loadEpisodesForShow(showId) {
  // do not fetch if cached
  if (episodeCache[showId]) {
    allEpisodes = episodeCache[showId];
    makePageForEpisodes(allEpisodes);
    return Promise.resolve(allEpisodes);
  }

  statusMessage.textContent = "Loading episodes...";
  const url = `https://api.tvmaze.com/shows/${showId}/episodes`;
  return fetch(url)
    .then((res) => {
      if (!res.ok) throw new Error(`Failed to fetch episodes: ${res.status}`);
      return res.json();
    })
    .then((episodes) => {
      episodeCache[showId] = episodes;
      allEpisodes = episodes;
      makePageForEpisodes(allEpisodes);
      statusMessage.textContent = "";
      return episodes;
    })
    .catch((err) => {
      console.error(err);
      statusMessage.textContent = "Failed to load episodes for that show.";
    });
}

// wire show select change after DOM load
window.onload = function () {
  setup();

  showSelect.addEventListener("change", function (e) {
    const showId = e.target.value;
    if (!showId) return;
    loadEpisodesForShow(showId);
  });
};
