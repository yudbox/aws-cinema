// https://developers.themoviedb.org/3/movies/get-movie-details
import axios from "axios";

const REQUEST_URL = "https://api.themoviedb.org/3";
export const IMAGE_URL = "https://image.tmdb.org/t/p/w500";
const API_KEY = process.env.REACT_APP_API_SECRET_KEY;

export const MOVIE_API_URL = async (type, page) => {
  return await axios.get(`${REQUEST_URL}/movie/${type}?api_key=${API_KEY}&language=en-US&page=${page}`);
};
