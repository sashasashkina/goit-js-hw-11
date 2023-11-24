import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api';
const API_KEY = '40873711-279b17552f71bebdec6439352';

export async function getImages(name, page = 1) {
  const searchParams = new URLSearchParams({
    key: API_KEY,
    q: name,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    page: page,
    per_page: 40,
  });
  console.log();
  //   const res = await axios.get(`${BASE_URL}/`, { searchParams });
  const res = await axios.get();
  return res;
}
