import React, { useEffect, useRef, useState } from "react";
import {
  Home,
  Movie,
  LiveTv,
  PlaylistPlay,
  Search,
  Close,
  Menu,
  Logout,
  Login,
} from "@mui/icons-material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { signOut } from "firebase/auth";
import { toast } from "react-toastify";

import "./header.scss";
import logo from "../../assets/image/logo.png";
import person from "../../assets/image/person.png";
import { auth } from "../../firebase/firebase";
import { setUserLogout, setUserLogin } from "../../features/user/userSlice";

const navList = [
  {
    title: "Home",
    path: "/",
    icon: <Home className="nav-icon" />,
  },
  {
    title: "Movies",
    path: "/movie",
    icon: <Movie className="nav-icon" />,
  },
  {
    title: "TV Series",
    path: "/tv",
    icon: <LiveTv className="nav-icon" />,
  },
  {
    title: "Playlist",
    path: "/playlist",
    icon: <PlaylistPlay className="nav-icon" />,
  },
];

export const Header = () => {
  const userName = useSelector((state) => state.user.name);
  const userPhoto = useSelector((state) => state.user.photo);

  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const active = navList.findIndex((item) => pathname === item.path);

  const searchBarRef = useRef(null);
  const menuRef = useRef(null);
  const overlayRef = useRef(null);
  const headerRef = useRef(null);

  const [isShowSearchBar, setIsShowSearchBar] = useState(true);
  const [isShowMobileMenu, setIsShowMobileMenu] = useState(true);
  const [isScroll, setIsScroll] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [searchSelected, setSearchSelected] = useState("movie");

  const handleShowSearchBar = () => {
    setIsShowSearchBar(!isShowSearchBar);
    searchBarRef.current.style.opacity = isShowSearchBar ? "1" : "0";
    searchBarRef.current.style.transform = isShowSearchBar
      ? "scale(1)"
      : "scale(0)";
  };

  const handelMobileMenu = () => {
    setIsShowMobileMenu(!isShowMobileMenu);
    if (isShowMobileMenu) {
      menuRef.current.style.transform = "translateX(0)";
      overlayRef.current.style.display = "block";
    } else {
      menuRef.current.style.transform = "translateX(-60rem)";
      overlayRef.current.style.display = "none";
    }
  };

  const handleLogOut = async () => {
    try {
      await signOut(auth);
      dispatch(setUserLogout());
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearch = () => {
    if (searchInput.trim().length > 0) {
      navigate(`/${searchSelected}/search/${searchInput.trim().toLowerCase()}`);
      setSearchInput("");
      handleShowSearchBar();
    } else {
      toast.warning(
        <p className="toast-text toast-text-warning">
          Please enter your keyword
        </p>
      );
    }
  };

  //show/hide header at login page
  useEffect(() => {
    if (pathname === "/login") {
      headerRef.current.style.display = "none";
    } else {
      headerRef.current.style.display = "block";
    }
  }, [pathname]);

  //init user when page is reloaded
  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        dispatch(
          setUserLogin({
            name:
              user.displayName ||
              user.email.toLowerCase().slice(0, user.email.indexOf("@")),
            email: user.email,
            photo: user.photoURL,
          })
        );
      }
    });
  }, [userName]);

  //hide/show header when user scrolls
  useEffect(() => {
    window.addEventListener("scroll", () => {
      setIsScroll(window.pageYOffset < 100 ? false : true);
    });

    return () => {
      window.removeEventListener("scroll", () => {
        setIsScroll(window.pageYOffset < 100 ? false : true);
      });
    };
  }, []);

  return (
    <div className={isScroll ? "header scroll" : "header"} ref={headerRef}>
      <div className="header-nav container">
        <div className="mobile-menu-wrapper" onClick={handelMobileMenu}>
          <Menu className="mobile-menu-icon" />
        </div>
        <div className="logo">
          <Link to="/">
            <img src={logo} alt="Web logo" />
          </Link>
        </div>
        <div className="menu" ref={menuRef}>
          <button className="menu-close-btn" onClick={handelMobileMenu}>
            <Close className="menu-close-icon" />
          </button>
          <ul className="menu-list">
            {userName && (
              <div className="mobile-user-info">
                <img src={userPhoto || person} alt="user avatar" />
                <span>{userName || "Unknown"}</span>
              </div>
            )}
            {navList.map((navItem, index) => (
              <li
                key={index}
                className={active === index ? "menu-item active" : "menu-item"}
              >
                <Link to={navItem.path} className="menu-item-link">
                  {navItem.icon}
                  {navItem.title}
                </Link>
              </li>
            ))}
            <div className="mobile-user-menu">
              {userName ? (
                <li
                  className="menu-item-link mobile-user-menu-item"
                  onClick={handleLogOut}
                >
                  <Logout className="nav-icon" /> log out
                </li>
              ) : (
                <Link
                  to="/login"
                  className="menu-item-link mobile-user-menu-item"
                >
                  <Login className="nav-icon" /> sign in
                </Link>
              )}
            </div>
          </ul>
        </div>
        <div className="overlay" ref={overlayRef}></div>
        <div className="header-action">
          <div className="search-bar" ref={searchBarRef}>
            <button className="search-bar-btn" onClick={handleSearch}>
              <Search className="search-icon-bar" />
            </button>
            <div className="search-bar-input">
              <input
                value={searchInput}
                type="text"
                placeholder="Enter some movie, tv..."
                onChange={(e) => setSearchInput(e.target.value)}
              />
            </div>
            <select
              value={searchSelected}
              name="type"
              onChange={(e) => setSearchSelected(e.target.value)}
            >
              <option value="movie">Movie</option>
              <option value="tv">tv series</option>
            </select>
          </div>
          <Search className="search-icon" onClick={handleShowSearchBar} />
          <div className="header-btn">
            {userName ? (
              <>
                <a href="#" className="header-user">
                  <img src={userPhoto || person} alt="user avatar" />
                </a>
                <div className="header-user-info">
                  <div className="header-user-info-content">
                    <img src={userPhoto || person} alt="user avatar" />
                    <span>{userName || "Unknown"}</span>
                  </div>
                  <p onClick={handleLogOut}>log out</p>
                </div>
              </>
            ) : (
              <Link to="/login">
                <button>Sign in</button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
