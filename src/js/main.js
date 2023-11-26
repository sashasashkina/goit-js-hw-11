import { Notify } from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import { getImages } from './helpers-api';
import { createMarkUp } from './markup';

const searchForm = document.querySelector('.search-form');
const searchInput = document.querySelector('.input');
const galleryImage = document.querySelector('.gallery');
const btnLodeMore = document.querySelector('.load-more');

let page = 1;
let searchName = '';

let lightbox = new SimpleLightbox('.gallery-link', {
  captionDelay: 250,
  captionsData: 'alt',
});

function handleSubmit(e) {
  e.preventDefault();

  page = 1;

  galleryImage.innerHTML = '';

  searchName = searchInput.value;

  getImages(searchName, page)
    .then(({ data: { hits, totalHits } }) => {
      if (hits.length === 0) {
        throw new Error();
      }
      createMarkUp(hits);
      btnLodeMore.removeAttribute('hidden');
      Notify.success(`Hooray! We found ${totalHits} images.`);
      lightbox.refresh();
    })

    .catch(() =>
      Notify.failure(
        `Sorry, there are no images matching your search query. Please try again.`
      )
    )
    .finally(() => {
      e.target.reset();
    });
}

function handleClick(event) {
  btnLodeMore.setAttribute('hidden', true);

  page += 1;

  getImages(searchName, page)
    .then(({ data: { hits, totalHits } }) => {
      if (hits.length === 0) {
        btnLodeMore.setAttribute('hidden', true);
        Notify.info(
          `We're sorry, but you've reached the end of search results.`
        );
        return;
      }
      createMarkUp(hits);
      btnLodeMore.removeAttribute('hidden');
      lightbox.refresh();
    })
    .catch(error => console.log(error));
}

searchForm.addEventListener('submit', handleSubmit);
btnLodeMore.addEventListener('click', handleClick);
