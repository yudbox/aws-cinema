import React from "react";
import PropTypes from "prop-types";
import "./Grid.scss";
import Raiting from "../raiting/Raiting";

const Grid = ({ images }) => {
  return (
    <>
      <div className="grid">
        {images.map((image, index) => {
          return (
            <div key={index}>
              <div className="grid-cell" style={{ backgroundImage: `url(${image.url})` }}>
                <div className="grid-read-more">
                  <button className="grid-cell-button">Read More</button>
                </div>
                <div className="grid-detail">
                  <span className="grid-detail-title">Mission imposible Mission imposible Mission imposible Mission imposible</span>
                  <div className="grid-detail-raiting">
                    <Raiting raiting={image.raiting} totalStars={5} />
                    {/* &nbsp;&nbsp; */}
                    <div className="grid-vote-average">{image.raiting}</div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Grid;

Grid.propTypes = {
  images: PropTypes.array
};
