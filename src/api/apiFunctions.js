import axios from "axios";

export const API_KEY = "3e6dced6d51fbfd4714907f655567a4f";
export const popularMoviesLink = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
export const upcomingMoviesLink = `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&language=en-US&page=1`;
export const topMoviesLink = `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=en-US&page=1`;
const popularTVLink = `https://api.themoviedb.org/3/tv/popular?api_key=${API_KEY}&language=en-US&page=1`;
const upcomingTVLink = `https://api.themoviedb.org/3/tv/on_the_air?api_key=${API_KEY}&language=en-US&page=1`;
const topTVLink = `https://api.themoviedb.org/3/tv/top_rated?api_key=${API_KEY}&language=en-US&page=1`;
const movieGenres = `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=en-US`;
const seriesGenres = `https://api.themoviedb.org/3/genre/tv/list?api_key=${API_KEY}&language=en-US`;

export const fetchPopular = async (type, category) => {
  let categorySeriesLink;
  let categoryMoviesLink;

  switch (category) {
    case 0:
      categoryMoviesLink = popularMoviesLink;
      categorySeriesLink = popularTVLink;
      break;
    case 1:
      categoryMoviesLink = upcomingMoviesLink;
      categorySeriesLink = upcomingTVLink;
      break;
    case 2:
      categoryMoviesLink = topMoviesLink;
      categorySeriesLink = topTVLink;
      break;
    default:
      categoryMoviesLink = popularMoviesLink;
      categorySeriesLink = popularTVLink;
      break;
  }

  const linkToFetch = type ? categoryMoviesLink : categorySeriesLink;

  try {
    const {data} = await axios.get(linkToFetch);

    const finalData = data?.results.map(
      ({
        release_date,
        original_title,
        poster_path,
        vote_average,
        backdrop_path,
        overview,
        genre_ids,
        id,
        original_name,
        first_air_date,
      }) => ({
        poster: poster_path,
        rating: vote_average,
        backdrop: backdrop_path,
        title: type ? original_title : original_name,
        description: overview,
        genres: genre_ids,
        release: type ? release_date : first_air_date,
        id,
        type: type ? "movie" : "series",
      }),
    );

    return finalData;
  } catch {}
};

export const fetchGenres = async () => {
  const moviesGenresData = await axios.get(movieGenres);
  const seriesGenresData = await axios.get(seriesGenres);

  const data = [
    ...moviesGenresData?.data.genres,
    ...seriesGenresData?.data.genres,
  ];

  return data;
};

export const fetchDetails = async ({id, type}) => {
  const movieDetails = `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US`;
  const seriesDetails = `https://api.themoviedb.org/3/tv/${id}?api_key=${API_KEY}&language=en-US`;
  //refactor?
  console.log(type);
  if (type === "movie") {
    try {
      const {data} = await axios.get(movieDetails);
      return data;
    } catch (e) {}
  } else {
    try {
      const {data} = await axios.get(seriesDetails);
      data["release_date"] = data["first_air_date"];
      data["title"] = data["name"];
      data["type"] = "TV";
      return data;
    } catch (e) {}
  }
};

export const fetchVideo = async ({type, id}) => {
  const videoLink = `https://api.themoviedb.org/3/${type}/${id}/videos?api_key=${API_KEY}&language=en-US`;
  try {
    const {data} = await axios.get(videoLink);
    const link = data?.results.find(item => item.type === "Trailer");

    return link?.key;
  } catch (e) {}
};

export const fetchSearchResults = async keyword => {
  const searchQuery = `https://api.themoviedb.org/3/search/multi?api_key=${API_KEY}&language=en-US&page=1&include_adult=false&query=${keyword}`;

  try {
    const {data} = await axios.get(searchQuery);

    const finalData = data?.results.map(
      ({
        release_date,
        original_title,
        poster_path,
        vote_average,
        media_type,
        id,
        original_name,
        first_air_date,
      }) => ({
        poster: poster_path,
        type: media_type,
        rating: vote_average,
        title: original_title || original_name,
        release: release_date || first_air_date,
        id,
      }),
    );
    const filteredData = finalData?.filter(item => item.poster);

    return filteredData;
  } catch {}
};
