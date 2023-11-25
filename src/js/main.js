import { getImages } from './helpers-api';
import { createMarkUp } from './markup';

const searchForm = document.querySelector('.search-form');
const searchInput = document.querySelector('.input');
const galleryImage = document.querySelector('.gallery');
const btnLodeMore = document.querySelector('.load-more');

let page = 1;

function handleSubmit(e) {
  e.preventDefault();

  page = 1;

  galleryImage.innerHTML = '';

  const searchName = searchInput.value;

  getImages(searchName, page)
    .then(({ data: { hits } }) => createMarkUp(hits))
    .catch(error => console.log(error))
    .finally(() => {
      e.target.reset();
      btnLodeMore.removeAttribute('hidden');
    });
}

function handleClick(event) {
  btnLodeMore.setAttribute('hidden', true);

  page += 1;

  getImages(searchName, page)
    .then(({ data: { hits } }) => createMarkUp(hits))
    .catch(error => console.log(error))
    .finally(() => {
      btnLodeMore.removeAttribute('hidden');
    });
}

searchForm.addEventListener('submit', handleSubmit);
btnLodeMore.addEventListener('click', handleClick);
