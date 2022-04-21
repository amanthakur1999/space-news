let source = document.getElementById('source');
let ul = document.querySelector('ul');

let url = `https://api.spaceflightnewsapi.net/v3/articles?_limit=30`;
let allNews = [];

let isLoding = false;
function handlerSpinner() {
  if (isLoding) {
    ul.innerHTML = `<div class="spiner"> <div  class = "donut"> </div</div>`;
  }
}

function init() {
  isLoding = true;
  handlerSpinner();
  fetch(url)
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error('Response id not OK!');
      }
    })
    .then((news) => {
      createUI(news);
      allNews = news;
      let allSite = Array.from(
        new Set(news.map((eachNews) => eachNews.newsSite))
      );
      console.log(allSite);
    })
    .catch((error) => {
      ul.innerText = error;
    })
    .finally(navigator.onLine);
}
init();

function createUI(data) {
  ul.innerHTML = '';
  data.forEach((elm) => {
    let list = document.createElement('li');
    list.classList.add('list');

    let imageArtical = document.createElement('img');
    imageArtical.classList.add('imageArtical');
    imageArtical.src = elm.imageUrl;

    let dataDiv = document.createElement('div');
    dataDiv.classList.add('dataDiv');

    let chanel = document.createElement('p');
    chanel.innerText = elm.newsSite;
    chanel.classList.add('chanel');

    let title = document.createElement('h2');
    title.classList.add('title');
    title.innerText = elm.title;

    let a = document.createElement('a');
    a.href = elm.url;
    let readMore = document.createElement('button');
    readMore.classList.add('readMore');
    a.append(readMore);
    readMore.innerText = 'Read More';

    ul.append(list);
    list.append(imageArtical, dataDiv);
    dataDiv.append(chanel, title, a);
  });
}

source.addEventListener('change', (event) => {
  console.log(event.target.value);
  let filterNews = allNews.filter(
    (news) => news.newsSite === event.target.value
  );
  if (event.target.value == '') {
    filterNews = allNews;
  }
  createUI(filterNews);
  console.log(filterNews);
});
