import React from "react";
import { useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";

import { IMAGE_URL } from "../../../services/movies.service";
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
                  data={data}
                />
              )}
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Grid;
