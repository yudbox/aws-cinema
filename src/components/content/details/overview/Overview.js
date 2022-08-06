import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";

import * as constants from "../../../../constants";
import { IMAGE_URL } from "../../../../services/movies.service";
import noImage from "../../../../assets/no_image_avatar.jpg";

import "./Overview.scss";

const Overview = () => {
  const [items, setItems] = useState([]);
  const movieDetails = useSelector((state) => state.movies.movieDetails);

  useEffect(() => {
    const budget = movieDetails[constants.MOVIE_DETAIL_TABS.details]?.budget;
    const revenue = movieDetails[constants.MOVIE_DETAIL_TABS.details]?.revenue;
    const detailItems = [
      {
        id: 0,
        name: "Tagline",
        value: movieDetails[constants.MOVIE_DETAIL_TABS.details]?.tagline
      },
      {
        id: 1,
        name: "Budget",
        value: budget ? `${numberFormatter(budget, 1)}` : "N/A"
      },
      {
        id: 2,
        name: "Revenue",
        value: revenue ? `${numberFormatter(revenue, 1)}` : "N/A"
      },
      {
        id: 3,
        name: "Status",
        value: movieDetails[constants.MOVIE_DETAIL_TABS.details]?.status
      },
      {
        id: 4,
        name: "Release Date",
        value: movieDetails[constants.MOVIE_DETAIL_TABS.details]?.release_date
      },
      {
        id: 5,
        name: "Run Time",
        value: `${movieDetails[constants.MOVIE_DETAIL_TABS.details]?.runtime} min`
      }
    ];
    setItems(detailItems);
  }, []);

  const numberFormatter = (number, digits) => {
    const symbolArray = [
      { value: 1, symbol: "" },
      { value: 1e3, symbol: "K" },
      { value: 1e6, symbol: "M" },
      { value: 1e9, symbol: "B" }
    ];
    const regex = /\.0+$|(\.[0-9]*[1-9])0+$/;
    let result = "";

    for (let i = 0; i < symbolArray.length; i++) {
      if (number >= symbolArray[i].value) {
        result = (number / symbolArray[i].value).toFixed(digits).replace(regex, "$1") + symbolArray[i].symbol;
      }
    }
    return result;
  };

  const prodCompanies = movieDetails[constants.MOVIE_DETAIL_TABS.details]?.production_companies;
  const cast = movieDetails[constants.MOVIE_DETAIL_TABS.credits]?.cast;
  const languages = movieDetails[constants.MOVIE_DETAIL_TABS.details]?.spoken_languages;

  return (
    <div className="overview">
      <div className="overview-column-1">
        <div className="description">{movieDetails[constants.MOVIE_DETAIL_TABS.details]?.overview}</div>

        <div className="cast">
          <div className="div-title">Cast</div>
          <table>
            <tbody>
              {Array.isArray(cast) &&
                cast.length &&
                cast.map((actor) => {
                  return (
                    <tr key={uuidv4()}>
                      <td>
                        <img
                          src={actor.profile_path ? `${IMAGE_URL}${actor.profile_path}` : noImage}
                          alt={actor.name}
                        />
                      </td>
                      <td>{actor.name}</td>
                      <td>{actor.character}</td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
      <div className="overview-column-2">
        <div className="overview-detail">
          <h6>Production Companies</h6>
          {Array.isArray(prodCompanies) &&
            prodCompanies.length &&
            prodCompanies.map((company) => (
              <div
                key={uuidv4()}
                className="product-company"
              >
                <img
                  src={company.logo_path ? `${IMAGE_URL}${company.logo_path}` : noImage}
                  alt={company.name}
                />
                <span>{company.name}</span>
              </div>
            ))}
        </div>
        <div className="overview-detail">
          <h6>Language(s)</h6>
          {Array.isArray(languages) &&
            languages.length &&
            languages.map((language) => (
              <p key={language.english_name}>
                <a href="!#">{language.english_name}</a>
              </p>
            ))}
        </div>
        {items.map((data) => (
          <div
            className="overview-detail"
            key={data.id}
          >
            <h6>{data.name}</h6>
            <p>
              <a href="!#">{data.value}</a>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Overview;
