import axios from "axios";

const API_KEY = "3e6dced6d51fbfd4714907f655567a4f";
const popularMoviesLink = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
const popularTVLink = `https://api.themoviedb.org/3/tv/popular?api_key=${API_KEY}&language=en-US&page=1`;

export const fetchPopularMovies = async () => {
  const {data} = await axios.get(popularMoviesLink);

  return data;
};

export const fetchPopularSeries = async () => {
  const {data} = await axios.get(popularTVLink);

  return data;
};
