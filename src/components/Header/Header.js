import React, { useState } from "react";
// import logo from "../../assets/logo.svg";
import "./Header.scss";

const HEADER_CATEGORIES = [
  {
    id: 1,
    iconClass: "fas fa-film",
    name: "Now Playing",
    type: "now_playing"
  },
  {
    id: 2,
    iconClass: "fas fa-fire",
    name: "Popular",
    type: "popular"
  },
  {
    id: 3,
    iconClass: "fas fa-star",
    name: "Top Rated",
    type: "top_rated"
  },
  {
    id: 4,
    iconClass: "fas fa-plus-square",
    name: "Upcoming",
    type: "upcoming"
  }
];

const Header = () => {
  const [navClass, setNavClass] = useState(false);
  const [menuClass, setMenuClass] = useState(false);

  const toggleMenu = () => {
    setNavClass(!navClass);
    setMenuClass(!menuClass);
    // if (navClass) {
    //   document.body.classList.add("header-nav-open");
    // } else {
    //   document.body.classList.remove("header-nav-open");
    // }
  };

  return (
    <>
      <div className="header-nav-wrapper">
        <div className="header-bar"></div>
        <div className="header-navbar">
          <div className="header-image">
            {/* <img src={logo} alt="logo" /> */}
            Input Logo Here
          </div>
          <div className={`${menuClass ? "header-menu-toggle is-active" : "header-menu-toggle"}`} id="header-mobile-menu" onClick={toggleMenu}>
            <span className="bar"></span>
            <span className="bar"></span>
            <span className="bar"></span>
          </div>
          <ul className={`${menuClass ? "header-nav header-mobile-nav" : "header-nav"}`}>
            {HEADER_CATEGORIES.map((cat) => (
              <li key={cat.id} className="header-nav-item">
                <span className="header-list-name">
                  <i className={cat.iconClass}></i>
                </span>
                &nbsp;
                <span className="header-list-name">{cat.name}</span>
              </li>
            ))}
            <li className="header-nav-item">New Movies</li>
            <input className="search-input" type="text" placeholder="Search for a movie" />
          </ul>
        </div>
      </div>
    </>
  );
};

export default Header;
