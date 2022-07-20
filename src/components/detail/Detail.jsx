import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  AccessTime,
  CalendarMonth,
  PlayArrow,
  Add,
  RemoveCircle,
} from "@mui/icons-material";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./detail.scss";
import apiConfig from "../../api/apiConfig";
import movieApi from "../../api/movieApi";
import imdbLogo from "../../assets/image/imdb.png";
import Casts from "./casts/Casts";
import Reviews from "./reviews/Reviews";
import Trailers from "./trailers/Trailers";
import MovieList from "../movieList/MovieList";
import Loading from "../loading/Loading";
import { Modal } from "../modal/Modal";

export const Detail = () => {
  const userEmail = useSelector((state) => state.user.email);
  const { category, id } = useParams();

  const [movie, setMovie] = useState();
  const [playList, setPlayList] = useState([]);
  const [inPlayList, setInPlayList] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isShowModal, setIsShowModal] = useState(false);

  //Get playlist from localStorage
  useEffect(() => {
    setPlayList(JSON.parse(localStorage.getItem(userEmail)));
  }, [userEmail]);

  // Check movie in  playlist
  useEffect(() => {
    if (playList) {
      const index = playList.findIndex((item) => item.id === Number(id));
      setInPlayList(index !== -1 ? true : false);
    }
  }, [id, playList]);

  //Get movie from APi
  useEffect(() => {
    const getMovie = async () => {
      try {
        const response = await movieApi.detail(category, id, { params: {} });
        setMovie(response);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    getMovie();
  }, [category, id]);

  const handleAddToPlayList = (e) => {
    e.preventDefault();
    if (userEmail) {
      const spanText = e.target.childNodes[0].textContent;
      if (spanText.includes("add")) {
        const movieItem = {
          id: movie.id,
          title: movie.title,
          name: movie.name,
          original_title: movie.original_title,
          poster_path: movie.poster_path,
          category,
          backdrop_path: movie.backdrop_path,
          release_date: movie.release_date,
        };
        playList?.push(movieItem);
        localStorage.setItem(userEmail, JSON.stringify(playList));
        setInPlayList(true);
        toast.success(<p className="toast-text toast-text-success">Added</p>);
      } else {
        const newPlaylist = playList?.filter((item) => item.id !== movie.id);
        localStorage.setItem(userEmail, JSON.stringify(newPlaylist));
        setInPlayList(false);
        toast.success(<p className="toast-text toast-text-success">Removed</p>);
      }
    } else {
      toast.error(
        <p className="toast-text toast-text-error">please sign in !</p>
      );
    }
  };

  const handelShowModal = (e) => {
    e.preventDefault();
    setIsShowModal(true);
  };

  const handelCloseModal = () => {
    setIsShowModal(false);
  };

  return (
    <>
      {isLoading ? (
        <Loading height="60" mgTop="40" />
      ) : (
        <div className="detail">
          <div
            className="detail-banner"
            style={{
              backgroundImage: `url(${apiConfig.originalImage(
                movie.backdrop_path || movie.poster_path
              )})`,
            }}
          ></div>
          <div className="detail-content">
            <div className="detail-poster">
              <img
                src={apiConfig.w500Image(
                  movie.poster_path || movie.backdrop_path
                )}
                alt="poster movie"
              />
            </div>
            <div className="detail-info">
              <h2 className="detail-info-title">
                {movie.title || movie.original_title || movie.name}
              </h2>
              <ul className="detail-info-genres">
                {movie.genres.map((genre, index) => (
                  <li key={index} className="detail-info-genres-item">
                    {genre.name}
                  </li>
                ))}
              </ul>
              <p className="detail-info-overview">{movie.overview}</p>
              <ul className="detail-info-meta">
                <li className="detail-info-meta-item">
                  <img src={imdbLogo} alt="imdb logo" />
                  <span>{movie.vote_average}</span>
                </li>
                <li className="detail-info-meta-item">
                  <CalendarMonth className="detail-info-icon" />
                  <span>
                    {movie.release_date
                      ? movie.release_date.slice(0, 4)
                      : "2022"}
                  </span>
                </li>
                <li className="detail-info-meta-item">
                  <AccessTime className="detail-info-icon" />
                  <span>
                    {category === "tv"
                      ? `${movie.number_of_seasons} seasons`
                      : `${movie.runtime} min`}
                  </span>
                </li>
              </ul>
              <div className="detail-info-play-wrapper">
                <a
                  href="/"
                  className="detail-info-play"
                  onClick={handelShowModal}
                >
                  <PlayArrow className="detail-info-play-icon" />
                  <span>play now</span>
                </a>
                <a
                  href="/"
                  className="detail-info-play"
                  onClick={handleAddToPlayList}
                >
                  {inPlayList ? (
                    <>
                      <RemoveCircle className="detail-info-play-icon" />
                      <span>Remove</span>
                    </>
                  ) : (
                    <>
                      <Add className="detail-info-play-icon" />
                      <span>add to playlist</span>
                    </>
                  )}
                </a>
              </div>
            </div>
          </div>
          <div className="detail-casts container">
            <Casts category={category} id={id} />
          </div>
          <div className="detail-tab container">
            <Tabs>
              <TabList>
                <Tab>Reviews</Tab>
                <Tab>Trailers</Tab>
              </TabList>

              <TabPanel>
                <Reviews category={category} id={id} />
              </TabPanel>
              <TabPanel>
                <Trailers category={category} id={id} />
              </TabPanel>
            </Tabs>
          </div>
          <div className="detail-similar container">
            <h2 className="detail-similar-title">Related</h2>
            <MovieList categoryProp={category} typeProp="similar" id={id} />
          </div>
        </div>
      )}
      <Modal active={isShowModal} onClose={handelCloseModal} />
    </>
  );
};
