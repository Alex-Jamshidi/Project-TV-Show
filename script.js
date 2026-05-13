//You can edit ALL of the code here
function setup() {
  const allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);
}

function makePageForEpisodes(episodeList) {
  const rootElem = document.getElementById("root");
  rootElem.textContent = `Got ${episodeList.length} episode(s)`;
}

/*
function createFilmCard(episodeList) {
  episode = episodeList[0];
  const filmCard = document.createElement("section");
  const epCodeAndName = document.createElement("h1");
  const summary = document.createElement("p");

  const episodeCode = createEpisodeCode(episode);
  epCodeAndName.textContent = `${episodeCode} - ${episode.name}`;
  summary.textContent = episode.summary;

  filmCard.appendChild(epCodeAndName);
  filmCard.appendChild(summary);
  document.body.appendChild(filmCard);
}*/

function createFilmCard(episodeList) {
  episode = episodeList[0];
  const episodeCode = createEpisodeCode(episode);

  const episodeCard = document
    .getElementById("episode-card-template")
    .content.cloneNode(true);

  episodeCard.querySelector("img").src =
    "http://static.tvmaze.com/uploads/images/medium_landscape/1/2668.jpg";
  episodeCard.querySelector("h3").textContent =
    `${episodeCode} - ${episode.name}`;
  episodeCard.querySelector("p").textContent = episode.summary;

  document.body.appendChild(episodeCard);
}

function createEpisodeCode(episode) {
  const seasonNum = String(episode.season);
  const episodeNum = String(episode.number);
  return `S${seasonNum.padStart(2, 0)}E${episodeNum.padStart(2, 0)}`;
}

createEpisodeCode(getAllEpisodes()[0]);
createFilmCard(getAllEpisodes());
window.onload = setup;

/*


   4. The medium-sized image for the episode
   5. The summary text of the episode

  */
