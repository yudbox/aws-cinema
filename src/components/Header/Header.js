import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import logo from "../../assets/header/cinema-logo.svg";
import { getMovies, setMovieCategory } from "../../redux/actions/movies-action";
import * as constants from "../../constants";
import "./Header.scss";

const HEADER_CATEGORIES = [
  {
    id: 1,
    iconClass: "fas fa-film",
    name: "Now Playing",
    category: constants.NOW_PLAYING
  },
  {
    id: 2,
    iconClass: "fas fa-fire",
    name: "Popular",
    category: constants.POPULAR
  },
  {
    id: 3,
    iconClass: "fas fa-star",
    name: "Top Rated",
    category: constants.TOP_RATED
  },
  {
    id: 4,
    iconClass: "fas fa-plus-square",
    name: "Upcoming",
    category: constants.UPCOMING
  }
];

const Header = () => {
  const [navClass, setNavClass] = useState(false);
  const [menuClass, setMenuClass] = useState(false);

  const dispatch = useDispatch();
  const category = useSelector((state) => state.movies.movieCategory);

  useEffect(() => {
    dispatch(getMovies(category, 1));
  }, [category]);

  const toggleMenu = () => {
    setNavClass(!navClass);
    setMenuClass(!menuClass);
  };

  const handleMovieCategory = (catecory) => {
    dispatch(setMovieCategory(catecory));
  };

  return (
    <>
      <div className="header-nav-wrapper">
        <div className="header-bar"></div>
        <div className="header-navbar">
          <div className="header-image">
            <img
              src={logo}
              alt="logo"
            />
          </div>
          <div
            className={`${menuClass ? "header-menu-toggle is-active" : "header-menu-toggle"}`}
            id="header-mobile-menu"
            onClick={toggleMenu}
          >
            <span className="bar"></span>
            <span className="bar"></span>
            <span className="bar"></span>
          </div>
          <ul className={`${menuClass ? "header-nav header-mobile-nav" : "header-nav"}`}>
            {HEADER_CATEGORIES.map((cat) => (
              <li
                key={cat.id}
                className={cat.category === category ? "header-nav-item active-item" : "header-nav-item"}
                onClick={() => handleMovieCategory(cat.category)}
              >
                <span className="header-list-name">
                  <i className={cat.iconClass}></i>
                </span>
                &nbsp;
                <span className="header-list-name">{cat.name}</span>
              </li>
            ))}
            <li className="header-nav-item">New Movies</li>
            <input
              className="search-input"
              type="text"
              placeholder="Search for a movie"
            />
          </ul>
        </div>
      </div>
    </>
  );
};

export default Header;
