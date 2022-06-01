import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "./SlideShow.scss";
import * as constants from "../../../constants";

const SlideShow = (props) => {
  const { images, auto, showArrows } = props;
  const [state, setState] = useState({
    slideShow: images[0],
    slideIndex: 0
  });
  const [currentIndex, setCurrentIndex] = useState(0);
  // const [sliderInterval, setSliderInterval] = useState(null);
  let currentSlideIndex = 0;

  useEffect(() => {
    let timerId;
    if (auto) {
      timerId = setInterval(autoMoveSlide, 5000);
    }
    return () => {
      clearInterval(timerId);
    };
  }, []);

  const autoMoveSlide = () => {
    const lastIndex = currentSlideIndex + 1;
    currentSlideIndex = lastIndex >= images.length ? 0 : lastIndex;
    setState((state) => ({
      ...state,
      slideShow: images[currentSlideIndex],
      slideIndex: +currentSlideIndex
    }));
  };

  const Indicators = ({ currentSlide }) => {
    const listIndicators = images.map((slide, index) => {
      const btnClasses = index === currentSlide ? "slider-navButton slider-navButton--active" : "slider-navButton";
      return <button className={btnClasses} key={index} />;
    });
    return <div className="slider-nav">{listIndicators}</div>;
  };

  const RenderArrows = () => {
    return (
      <div className="slider-arrows">
        <div className="slider-arrow slider-arrow--left" onClick={() => moveSlideWithArrowa(constants.PREV)} />
        <div className="slider-arrow slider-arrow--right" onClick={() => moveSlideWithArrowa(constants.NEXT)} />
      </div>
    );
  };

  const moveSlideWithArrowa = (type) => {
    let index = currentIndex;
    if (type === constants.PREV) {
      if (currentIndex <= 0) {
        index = images.length - 1;
      } else {
        index -= 1;
      }
    } else {
      if (currentIndex < images.length) {
        index += 1;
      }
      if (index === images.length) {
        index = 0;
      }
    }
    setCurrentIndex(index);
    setState((state) => ({
      ...state,
      slideShow: images[index],
      slideIndex: index
    }));
  };
  const { slideShow, slideIndex } = state;
  return (
    <>
      <div className="slider">
        <div className="slider-slides">
          {images && images.length && slideShow && (
            <div
              className="slider-image"
              style={{
                backgroundImage: `url(${slideShow.url})`
              }}
            ></div>
          )}
        </div>
        <Indicators currentSlide={slideIndex} />
        {showArrows && <RenderArrows />}
      </div>
    </>
  );
};

export default SlideShow;

// Indicators.propTypes = {
//   currentSlide: PropTypes.number
// };

SlideShow.propTypes = {
  images: PropTypes.array.isRequired,
  auto: PropTypes.bool.isRequired,
  showArrows: PropTypes.bool.isRequired,
  currentSlide: PropTypes.number
};
