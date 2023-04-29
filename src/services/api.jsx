import axios from 'axios';

const API_KEY = '34125001-552eb8cc5bd5517d5b42222f1';
const BASE_URL = `https://pixabay.com/api/`;
const OTHER_SETTINGS = '&image_type=photo&orientation=horizontal&per_page=12';

export const fetchImages = async (searchQuery, page) => {
  try {
    const URL = `${BASE_URL}?q=${searchQuery}&page=${page}&key=${API_KEY}${OTHER_SETTINGS}`;

    const data = await axios.get(URL);

    return data;
  } catch (error) {
    console.error(error);
  }
};

export const api = {
  fetchImages,
};