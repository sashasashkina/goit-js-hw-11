import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api';
const API_KEY = '40873711-279b17552f71bebdec6439352';

export async function getImages(name, page = 1) {
  const params = new URLSearchParams({
    key: API_KEY,
    q: name,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    page: page,
    per_page: 40,
  });

  const res = await axios.get(`${BASE_URL}/?${params}`);

  return res;
}
