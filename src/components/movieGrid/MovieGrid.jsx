import React, { useState, useEffect } from "react";
import { ArrowBackIosNew, ArrowForwardIos } from "@mui/icons-material";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

import "./moviegrid.scss";
import movieApi from "../../api/movieApi";
import MovieCard from "../movieCard/MovieCard";

const MovieGrid = (props) => {
  const { category, keyword } = props;
  const userEmail = useSelector((state) => state.user.email);

  const [list, setList] = useState([]);
  const [movieType, setMovieType] = useState("popular");
  const [tvType, setTvType] = useState("popular");
  const [moviePage, setMoviePage] = useState(1);
  const [tvPage, setTvPage] = useState(1);
  const [searchPage, setSearchPage] = useState(1);
  const [playList, setPlayList] = useState([]);

  const handleChangeType = (e) => {
    switch (category) {
      case "movie":
        setMovieType(e.target.value);
        setMoviePage(1);
        break;
      default:
        setTvType(e.target.value);
        setTvPage(1);
        break;
    }
  };

  const handelIncreasePage = () => {
    window.scrollTo(0, 0);
    if (keyword === undefined) {
      switch (category) {
        case "movie":
          setMoviePage((preState) => preState + 1);
          break;
        default:
          setTvPage((preState) => preState + 1);
          break;
      }
    } else {
      setSearchPage((preState) => preState + 1);
    }
  };

  const handelDecreasePage = () => {
    window.scrollTo(0, 0);
    if (keyword === undefined) {
      switch (category) {
        case "movie":
          setMoviePage((preState) => preState - 1);
          break;
        default:
          setTvPage((preState) => preState - 1);
          break;
      }
    } else {
      setSearchPage((preState) => preState - 1);
    }
  };

  const { pathname } = useLocation();

  useEffect(() => {
    setPlayList(JSON.parse(localStorage.getItem(userEmail)));
  }, [userEmail]);

  //reset page
  useEffect(() => {
    if (keyword === undefined) {
      switch (category) {
        case "movie":
          setMoviePage(1);
          break;
        default:
          setTvPage(1);
          break;
      }
    } else {
      setSearchPage(1);
    }
  }, [category, pathname]);

  //call api
  useEffect(() => {
    const getListItem = async () => {
      let params = {};
      let response = null;
      if (keyword === undefined) {
        switch (category) {
          case "movie":
            try {
              params = {
                page: moviePage,
              };
              response = await movieApi.getMovieList(movieType, { params });
              setList(response.results);
            } catch (error) {
              console.log(error);
            }
            break;
          case "playlist":
            setList(playList);
            break;
          default:
            try {
              params = {
                page: tvPage,
              };
              response = await movieApi.getTvList(tvType, { params });
              setList(response.results);
            } catch (error) {
              console.log(error);
            }
            break;
        }
      } else {
        try {
          params = {
            page: searchPage,
            query: keyword,
          };
          response = await movieApi.search(category, { params });
          setList(response.results);
        } catch (error) {
          console.log(error);
        }
      }
    };
    getListItem();
  }, [
    category,
    keyword,
    movieType,
    tvType,
    moviePage,
    tvPage,
    searchPage,
    playList,
  ]);

  return (
    <div className="moviegrid">
      <div className="moviegrid-header">
        <h2 className="moviegrid-header-title">
          {keyword ? `search with keyword "${keyword}"` : category}
          {category === "playlist" && userEmail ? ` (${list?.length})` : ""}
        </h2>
        {!keyword && category === "movie" ? (
          <div className="moviegrid-header-type">
            <button
              className={
                movieType === "popular"
                  ? "moviegrid-header-type-btn active"
                  : "moviegrid-header-type-btn"
              }
              value="popular"
              onClick={handleChangeType}
            >
              popular
            </button>
            <button
              className={
                movieType === "upcoming"
                  ? "moviegrid-header-type-btn active"
                  : "moviegrid-header-type-btn"
              }
              onClick={handleChangeType}
              value="upcoming"
            >
              {category === "tv" ? "on the air" : "upcoming"}
            </button>
            <button
              className={
                movieType === "top_rated"
                  ? "moviegrid-header-type-btn active"
                  : "moviegrid-header-type-btn"
              }
              value="top_rated"
              onClick={handleChangeType}
            >
              top rated
            </button>
          </div>
        ) : !keyword && category === "tv" ? (
          <div className="moviegrid-header-type">
            <button
              className={
                tvType === "popular"
                  ? "moviegrid-header-type-btn active"
                  : "moviegrid-header-type-btn"
              }
              value="popular"
              onClick={handleChangeType}
            >
              popular
            </button>
            <button
              className={
                tvType === "on_the_air"
                  ? "moviegrid-header-type-btn active"
                  : "moviegrid-header-type-btn"
              }
              onClick={handleChangeType}
              value={category === "tv" ? "on_the_air" : "upcoming"}
            >
              on the air
            </button>
            <button
              className={
                tvType === "top_rated"
                  ? "moviegrid-header-type-btn active"
                  : "moviegrid-header-type-btn"
              }
              value="top_rated"
              onClick={handleChangeType}
            >
              top rated
            </button>
          </div>
        ) : (
          ""
        )}
      </div>
      {list?.length === 0 || list === null ? (
        category === "playlist" ? (
          <h2 className="moviegrid-loading-text">
            {userEmail
              ? "Your playlist is empty"
              : "Please sign in to see your playlist"}{" "}
          </h2>
        ) : keyword ? (
          <h2>No results found</h2>
        ) : (
          <h2
            data-text="Please wait a second ..."
            className="moviegrid-loading-text"
          >
            Please wait a second ...
          </h2>
        )
      ) : (
        ""
      )}
      <div className="moviegrid-content">
        {list?.map((item, index) => (
          <MovieCard key={index} item={item} categoryCard={category} />
        ))}
      </div>
      {list?.length !== 0
        ? category !== "playlist" && (
            <div className="moviegrid-page">
              <button
                className={
                  searchPage === 1 && moviePage === 1 && tvPage === 1
                    ? "moviegrid-page-btn disabled"
                    : "moviegrid-page-btn "
                }
                onClick={handelDecreasePage}
              >
                <ArrowBackIosNew className="moviegrid-page-btn-icon" />
              </button>
              <button
                className="moviegrid-page-btn"
                onClick={handelIncreasePage}
              >
                <ArrowForwardIos className="moviegrid-page-btn-icon" />
              </button>
            </div>
          )
        : ""}
    </div>
  );
};

export default MovieGrid;
