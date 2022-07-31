import React from "react";
import { useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";

import { IMAGE_URL } from "../../../../services/movies.service";
import noImage from "../../../../assets/no_image_avatar.jpg";
import * as constants from "../../../../constants";
import "./Crew.scss";

const Crew = () => {
  const movieDetails = useSelector((state) => state.movies.movieDetails);
  const crew = movieDetails[constants.MOVIE_DETAIL_TABS.credits]?.crew;
  return (
    <>
      <div className="cast">
        <div className="div-title">Crew</div>
        <table>
          <thead>
            <tr>
              <th></th>
              <th></th>
              <th className="head">Department</th>
              <th className="head">Job</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(crew) &&
              crew.length &&
              crew.map((crewPerson) => (
                <tr key={uuidv4()}>
                  <td>
                    <img
                      src={crewPerson.profile_path ? `${IMAGE_URL}${crewPerson.profile_path}` : noImage}
                      alt={crewPerson.name}
                    />
                  </td>
                  <td>{crewPerson.name}</td>
                  <td>{crewPerson.department}</td>
                  <td>{crewPerson.job}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Crew;
