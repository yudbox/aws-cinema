import React from "react";
import Raiting from "../raiting/Raiting";
import Crew from "./crew/Crew";
import "./Details.scss";
import Media from "./media/Media";
import Overview from "./overview/Overview";
import Reviews from "./reviews/Reviews";
import Tabs from "./tabs/Tabs";

const Details = () => {
  return (
    <>
      <div className="movie-container">
        <div
          className="movie-bg"
          style={{ backgroundImage: "url(https://image.tmdb.org/t/p/w500/9Gtg2DzBhmYamXBS1hKAhiwbBKS.jpg)" }}
        >
          <div className="movie-overlay"></div>
          <div className="movie-details">
            <div className="movie-image">
              <img
                src="https://image.tmdb.org/t/p/w500/9Gtg2DzBhmYamXBS1hKAhiwbBKS.jpg"
                alt=""
              />
            </div>
            <div className="movie-body">
              <div className="movie-overview">
                <div className="title">
                  Avengers <span>2020-12-03</span>
                </div>
                <div className="movie-genres">
                  <ul className="genres">
                    <li>Action</li>
                    <li>Comedy</li>
                    <li>Sci-fi</li>
                  </ul>
                </div>
                <div className="rating">
                  <Raiting
                    raiting={6.5}
                    totalStars={10}
                  />
                  &nbsp;
                  <span>6.5</span>
                  <p>(200) reviews</p>
                </div>
                <Tabs>
                  <div label="Overview">
                    <Overview />
                  </div>
                  <div label="Crew">
                    <Crew />
                  </div>
                  <div label="Media">
                    <Media />
                  </div>
                  <div label="Reviews">
                    <Reviews />
                  </div>
                </Tabs>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Details;
