import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import placeholderImg from "../../assets/lazy_loader.gif";
import Raiting from "../content/raiting/Raiting";
import { formatMovieTitle } from "../../helpers";
import "./LazyImage.scss";

export const LazyImage = (props) => {
  const { src, alt, data, className } = props;
  const [imgSrc, setImgSrc] = useState(placeholderImg);
  const [imgRef, setImgRef] = useState();

  useEffect(() => {
    let observer;
    let didCancel = false;

    if (imgRef && imgSrc !== src) {
      // IntersectionObserver это возможность браузера запускать функцию-колбек когда указанный элемент попадает
      // в область видимости
      // threshold: 0.01 - колбек сработает когда элемент покажется на 1% (не обязательна если есть rootMargin)
      // threshold: [0.1, 0,4, 0,85, 0.9] - колбек сработает при каждом совпадении значений
      //   rootMargin: "75%" заставляет колбек срабатывать раньше чем картинка подходит
      //   к зоне видимости на 75% (или в пикселях) от верхней границы
      if (IntersectionObserver) {
        // создаем обсервер который будет следить за указанным элементом,
        // в него ложим колбек. Аргументом является массив сущностей которые нужно отслеживать
        observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              // для каждого элемента проверяем если
              // entry.intersectionRatio элемент появился более 0%
              // entry.isIntersecting элемент пересек визуальную область
              // бывает что isIntersecting: false а intersectionRatio уже не 0. Поэтому лучше делать обе проверки
              if (!didCancel && (entry.intersectionRatio > 0 || entry.isIntersecting)) {
                // тогда ложим его src в стейт
                setImgSrc(src);
                // прекращаем наблюдать за элементом
                observer.unobserve(imgRef);
              }
            });
          },
          {
            // threshold: 0.01,
            rootMargin: "75%"
          }
        );
        // указываем элемент за которым нужно следить
        observer.observe(imgRef);
      } else {
        // если браузер не поддерживает IntersectionObserver тогда сразу сохраняем src в стейт
        setImgSrc(src);
      }
    }
    return () => {
      didCancel = true;
      //   при размонтировании компоненты отписываемся от слушателя
      if (observer && observer.unobserve) {
        observer.unobserve(imgRef);
      }
    };
  }, [src, imgRef, imgSrc]);
  return (
    <>
      <div
        className={className}
        ref={setImgRef}
        style={{ backgroundImage: `url(${imgSrc})` }}
        alt={alt}
      >
        <div className="grid-read-more">
          <button className="grid-cell-button">
            <Link to={`${data.id}/${formatMovieTitle(data.title)}/details`}>Read more</Link>
          </button>
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
      </div>
    </>
  );
};

LazyImage.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string,
  data: PropTypes.object.isRequired,
  className: PropTypes.string
};
