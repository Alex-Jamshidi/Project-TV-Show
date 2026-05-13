//You can edit ALL of the code here
function setup() {
  const allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);
  showAllEpisodes(allEpisodes);
}

function makePageForEpisodes(episodeList) {
  const rootElem = document.getElementById("root");
  rootElem.textContent = `Got ${episodeList.length} episode(s)`;
}

function showAllEpisodes(allEpisodes) {
  for (const episode of allEpisodes) {
    const episodeCard = createEpisodeCard(episode);
    document.getElementById("episodes").appendChild(episodeCard);
  }
}

function createEpisodeCard(episode) {
  const episodeCode = createEpisodeCode(episode);
  const episodeCard = document
    .getElementById("episode-card-template")
    .content.cloneNode(true);

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

window.onload = setup;

/*


   4. The medium-sized image for the episode
   5. The summary text of the episode

  */
