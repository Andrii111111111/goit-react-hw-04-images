import axios from 'axios';

const API_KEY = '39240631-8a58999efa7d66452fb176341';
axios.defaults.baseURL = 'https://pixabay.com/api/';
axios.defaults.params = {
  per_page: 12,
};

export const getImages = async (query, page) => {
  try {
    const { data } = await axios.get(`?key=${API_KEY}&q=${query}&page=${page}`);
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};
