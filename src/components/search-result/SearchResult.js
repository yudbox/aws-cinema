import React from "react";
import { useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";

import "./SearchResult.scss";
import { LazyImage } from "../lazy-image/LazyImage";
import { IMAGE_URL } from "../../services/movies.service";

const SearchResult = () => {
  const searchQueryData = useSelector((state) => state.movies.searchQuery);
  const searchResultData = useSelector((state) => state.movies.searchResult);
  return (
    <div className="searchKeyword">
      <div className="grid-search-title">
        <span className="grid-text1">Your search keyword:</span>
        <span className="grid-text2">{searchQueryData}</span>
      </div>
      <div className="grid">
        {searchResultData.map((data, index) => {
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
    </div>
  );
};

export default SearchResult;
