function getListenMusic() {
  // return new Promise(r => r(`{"listen":true,"title":"untitled","artist":"unknown","cover":"./img/musicnoimage.jpg"}`))
  return fetch("https://yondi.me/what-im-listen-in-vk").then((res) =>
    res.text()
  );
}

function renderMusic(isListen, imgsrc, title, author) {
  const musicContainer = document.querySelector(".music");
  const image = document.querySelector(".music > .wrapper > .cover-wrapper > img");
  const imageBg = document.querySelector(".music > .wrapper > .cover-wrapper > div");
  const titleElement = document.querySelector(
    ".music > .wrapper > div > .title"
  );
  const authorElement = document.querySelector(
    ".music > .wrapper > div > .author"
  );
  if (!image || !musicContainer || !titleElement || !authorElement) return;

  if (!isListen) return musicContainer.classList.remove("active");

  image.src = imgsrc;
  imageBg.style.background = `url(${imgsrc})`;
  titleElement.textContent = title;
  authorElement.textContent = author;

  musicContainer.classList.add("active");
}

let lastServerResponse = "";
async function VKMusicPresence() {
  const serverResponse = await getListenMusic();
  if (lastServerResponse === serverResponse) return;
  lastServerResponse = serverResponse;

  const music = JSON.parse(serverResponse);
  renderMusic(music.listen, music.cover, music.title, music.artist);
}

function makeInterval(fn, ms) {
  fn();
  return setInterval(fn, ms);
}
makeInterval(VKMusicPresence, 2000);
