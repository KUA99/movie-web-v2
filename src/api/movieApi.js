import axiosClient from "./axiosClient";

export const category = {
  movie: "movie",
  tv: "tv",
};

export const movieType = {
  upcoming: "upcoming",
  popular: "popular",
  top_rated: "top_rated",
};

export const tvType = {
  popular: "popular",
  top_rated: "top_rated",
  on_the_air: "on_the_air",
};

const movieApi = {
  getMovieList: (type, params) => {
    const url = "movie/" + movieType[type];
    return axiosClient.get(url, params);
  },

  getTvList: (type, params) => {
    const url = "tv/" + tvType[type];
    return axiosClient.get(url, params);
  },

  getVideos: (section, id) => {
    const url = category[section] + "/" + id + "/videos";
    return axiosClient.get(url, { params: {} });
  },

  search: (section, params) => {
    const url = "/search/" + category[section];
    return axiosClient.get(url, params);
  },

  detail: (section, id, params) => {
    const url = category[section] + "/" + id;
    return axiosClient.get(url, params);
  },

  credits: (section, id) => {
    const url = category[section] + "/" + id + "/credits";
    return axiosClient.get(url, { params: {} });
  },

  similar: (section, id) => {
    const url = category[section] + "/" + id + "/similar";
    return axiosClient.get(url, { params: {} });
  },
  reviews: (section, id, params) => {
    const url = category[section] + "/" + id + "/reviews";
    return axiosClient.get(url, params);
  },
};

export default movieApi;
