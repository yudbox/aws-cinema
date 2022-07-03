import React from "react";
import { useSelector } from "react-redux";
import { IMAGE_URL } from "../../../services/movies.service";
// import PropTypes from "prop-types";
import Raiting from "../raiting/Raiting";
import { v4 as uuidv4 } from "uuid";
import "./Grid.scss";
import { LazyImage } from "../../lazy-image/LazyImage";

const Grid = () => {
  const movieData = useSelector((state) => state.movies.list);
  return (
    <>
      <div className="grid">
        {movieData.map((data, index) => {
          return (
            <div key={uuidv4()}>
              {data.poster_path && (
                <LazyImage
                  className="grid-cell"
                  src={`${IMAGE_URL}${data.poster_path}`}
                  alt="placeholder"
                >
                  <div className="grid-read-more">
                    <button className="grid-cell-button">Read More</button>
                  </div>
                  <div className="grid-detail">
                    <span className="grid-detail-title">{data.title && data.title}</span>
                    <div className="grid-detail-raiting">
                      <Raiting
                        raiting={data.vote_average && data.vote_average}
                        totalStars={5}
                      />
                      {/* &nbsp;&nbsp; */}
                      <div className="grid-vote-average">{data.vote_average && data.vote_average}</div>
                    </div>
                  </div>
                </LazyImage>
              )}
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Grid;

// Grid.propTypes = {};
