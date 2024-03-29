// https://developers.themoviedb.org/3/movies/get-movie-details
import axios from "axios";

const REQUEST_URL = "https://api.themoviedb.org/3";
export const IMAGE_URL = "https://image.tmdb.org/t/p/w500";
const API_KEY = process.env.REACT_APP_API_SECRET_KEY;

export const MOVIE_API_URL = async (type, page) => {
  return await axios.get(`${REQUEST_URL}/movie/${type}?api_key=${API_KEY}&language=en-US&page=${page}`);
};

// https://developers.themoviedb.org/3/search/search-movies
export const SEARCH_API_URL = async (query) => {
  return await axios.get(`${REQUEST_URL}/search/movie?api_key=${API_KEY}&language=en-US&query=${query}`);
};

// https://developers.themoviedb.org/3/movies/get-movie-details
export const MOVIE_DETAILS_API_URL = async (movieId) => {
  return await axios.get(`${REQUEST_URL}/movie/${movieId}?api_key=${API_KEY}&language=en-US`);
};

// https://developers.themoviedb.org/3/movies/get-movie-credits
export const MOVIE_CREDITS_API_URL = async (movieId) => {
  return await axios.get(`${REQUEST_URL}/movie/${movieId}/credits?api_key=${API_KEY}&language=en-US`);
};

// https://developers.themoviedb.org/3/movies/get-movie-images
export const MOVIE_IMAGES_API_URL = async (movieId) => {
  return await axios.get(`${REQUEST_URL}/movie/${movieId}/images?api_key=${API_KEY}&language=en-US&include_image_language=en`);
};

// https://developers.themoviedb.org/3/movies/get-movie-videos
export const MOVIE_VIDEOS_API_URL = async (movieId) => {
  return await axios.get(`${REQUEST_URL}/movie/${movieId}/videos?api_key=${API_KEY}&language=en-US`);
};

// https://developers.themoviedb.org/3/movies/get-movie-reviews
export const MOVIE_REVIEWS_API_URL = async (movieId, page = 1) => {
  return await axios.get(`${REQUEST_URL}/movie/${movieId}/reviews?api_key=${API_KEY}&language=en-US&page=${page}`);
};
