import React from "react";
import { useSelector } from "react-redux";

import * as constants from "../../../../constants";
import { IMAGE_URL } from "../../../../services/movies.service";
import noImage from "../../../../assets/no_image_avatar.jpg";

import "./Media.scss";

const Media = () => {
  const movieDetails = useSelector((state) => state.movies.movieDetails);
  const videos = movieDetails[constants.MOVIE_DETAIL_TABS.videos]?.results;
  const posters = movieDetails[constants.MOVIE_DETAIL_TABS.images]?.posters;
  return (
    <>
      <div className="media">
        <div>
          <div className="media-title">Watch Trailer</div>
          <div className="media-videos">
            {Array.isArray(videos) &&
              videos.length &&
              videos.map((videoData) => (
                <div
                  key={videoData.id}
                  className="video"
                >
                  <iframe
                    key={videoData.id}
                    title={videoData.name}
                    style={{
                      width: "100%",
                      height: "100%"
                    }}
                    src={`https://www.youtube.com/embed/${videoData.key}`}
                    frameBorder="0"
                    allowFullScreen
                  />
                </div>
              ))}
          </div>
        </div>
        <div>
          <div className="media-title">Photos ({posters.length})</div>
          <div className="media-images">
            {Array.isArray(posters) &&
              posters.length &&
              posters.map((poster) => (
                <div
                  key={poster.file_path}
                  className="image-cell"
                  style={{
                    backgroundImage: poster.file_path ? `url(${IMAGE_URL}${poster.file_path})` : `url(${noImage})`
                  }}
                ></div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Media;
