import React, { useState } from "react";
import Grid from "../grid/Grid";
import Paginate from "../paginate/Paginate";
import SlideShow from "../slide-show/SlideShow";
import "./MainContent.scss";

const images = [
  {
    url: "https://images.pexels.com/photos/15286/pexels-photo.jpg",
    raiting: 7.5
  },
  {
    url: "https://images.pexels.com/photos/3408744/pexels-photo-3408744.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    raiting: 8.5
  },
  {
    url: "https://images.pexels.com/photos/15286/pexels-photo.jpg",
    raiting: 7.8
  },
  {
    url: "https://images.pexels.com/photos/3408744/pexels-photo-3408744.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    raiting: 9.7
  },
  {
    url: "https://images.pexels.com/photos/15286/pexels-photo.jpg",
    raiting: 6.5
  },
  {
    url: "https://images.pexels.com/photos/3408744/pexels-photo-3408744.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    raiting: 8.5
  }
];

const MainContent = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const paginate = (type) => {
    if (type === "prev" && currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    } else {
      setCurrentPage((prev) => prev + 1);
    }
  };
  return (
    <div className="main-content">
      <SlideShow images={images} auto={false} showArrows={true} />
      <div className="grid-movie-title">
        <div className="movie-type">Now playing</div>
        <div className="paginate">
          <Paginate currentPage={currentPage} totalPages={10} paginate={paginate} />
        </div>
      </div>
      <Grid images={images} />
    </div>
  );
};

export default MainContent;
