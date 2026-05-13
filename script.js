//You can edit ALL of the code here
function setup() {
  const allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);
}

function makePageForEpisodes(episodeList) {
  const rootElem = document.getElementById("root");
  rootElem.textContent = `Got ${episodeList.length} episode(s)`;
}

function createFilmCard(episodeList) {
  episode1 = episodeList[0];
  const filmCard = document.createElement("section");
  const name = document.createElement("h1");
  const episodeCode = createEpisodeCode(episode1);

  name.textContent = `${episodeCode} - ${episode1.name}`;
  filmCard.appendChild(name);
  document.body.appendChild(filmCard);
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

   1. The name of the episode
   2. The season number
   3. The episode number
   4. The medium-sized image for the episode
   5. The summary text of the episode

  */
