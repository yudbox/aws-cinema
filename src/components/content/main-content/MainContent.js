import React from "react";
import SlideShow from "../slide-show/SlideShow";
import "./MainContent.scss";

const images = [
  {
    url: "https://images.pexels.com/photos/15286/pexels-photo.jpg"
  },
  {
    url: "https://images.pexels.com/photos/3408744/pexels-photo-3408744.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
  },
  {
    url: "https://images.pexels.com/photos/15286/pexels-photo.jpg"
  }
];

const MainContent = () => {
  return (
    <div className="main-content">
      <SlideShow images={images} auto={true} showArrows={true} />
      <div className="grid-movie-title">
        <div className="movie-type">Now playing</div>
        <div className="paginate">Paginate</div>
      </div>
    </div>
  );
};

export default MainContent;
