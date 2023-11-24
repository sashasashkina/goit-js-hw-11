import { getImages } from './helpers-api';

const searchForm = document.querySelector('.search-form');
const searchInput = document.querySelector('.input');

function handleSubmit(e) {
  e.preventDefault();

  const searchName = searchInput.value;

  getImages(searchName)
    .then(data => console.log(data))
    .catch(error => console.log(error));

  e.target.reset();
}
searchForm.addEventListener('submit', handleSubmit);
