import axios from "axios";

const API_KEY = "3e6dced6d51fbfd4714907f655567a4f";
const popularMoviesLink = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
const popularTVLink = `https://api.themoviedb.org/3/tv/top_rated?api_key=${API_KEY}&language=en-US&page=1`;
const movieGenres = `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=en-US`;
const seriesGenres = `https://api.themoviedb.org/3/genre/tv/list?api_key=${API_KEY}&language=en-US`;

export const fetchPopularMovies = async () => {
  const {data} = await axios.get(popularMoviesLink);

  const finalData = data?.results.map(
    ({
      release_date,
      original_title,
      poster_path,
      vote_average,
      backdrop_path,
      overview,
      genre_ids,
    }) => ({
      poster: poster_path,
      rating: vote_average,
      backdrop: backdrop_path,
      title: original_title,
      description: overview,
      genres: genre_ids,
      release: release_date,
    }),
  );

  return finalData;
};

export const fetchPopularSeries = async () => {
  const {data} = await axios.get(popularTVLink);

  const finalData = data?.results.map(
    ({
      first_air_date,
      original_name,
      poster_path,
      vote_average,
      backdrop_path,
      overview,
      genre_ids,
    }) => ({
      poster: poster_path,
      rating: vote_average,
      backdrop: backdrop_path,
      title: original_name,
      description: overview,
      genres: genre_ids,
      release: first_air_date,
    }),
  );

  return finalData;
};

export const fetchMovieGenres = async () => {
  const {data} = await axios.get(movieGenres);

  return data;
};

export const fetchSeriesGenres = async () => {
  const {data} = await axios.get(seriesGenres);

  return data;
};
