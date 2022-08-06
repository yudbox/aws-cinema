import React, { Fragment, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";

import "./Raiting.scss";

const Raiting = ({ raiting, totalStars }) => {
  const [numberOfStars, setNumberOfStars] = useState();
  const raitingRef = useRef();

  useEffect(() => {
    const starsArray = [...Array(totalStars).keys()].map((index) => index + 1);
    setNumberOfStars(starsArray);
    let percentage;
    if (raiting <= 5) {
      percentage = (raiting / 5) * 100;
    } else {
      percentage = (raiting / 10) * 100;
    }
    const percentageWidth = `${Math.floor(percentage)}%`;
    raitingRef.current.style.width = percentageWidth;
  }, [raiting, totalStars]);
  return (
    <div className="star-raiting">
      <div className="back-stars">
        {numberOfStars &&
          numberOfStars.map((i) => (
            <Fragment key={i}>
              <i
                className="fa fa-star"
                aria-hidden="true"
              ></i>
            </Fragment>
          ))}

        <div
          className="front-stars"
          ref={raitingRef}
        >
          {numberOfStars &&
            numberOfStars.map((i) => (
              <Fragment key={i}>
                <i
                  className="fa fa-star"
                  aria-hidden="true"
                ></i>
              </Fragment>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Raiting;

Raiting.propTypes = {
  raiting: PropTypes.number.isRequired,
  totalStars: PropTypes.number.isRequired
};
