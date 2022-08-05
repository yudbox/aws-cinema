import React from "react";
import "./App.scss";
import Header from "./components/topHeader/Header";
import Main from "./components/main/Main";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Details from "./components/content/details/Details";
import ErrorPage from "./error/ErrorPage";
const App = () => {
  return (
    <Router>
      <Header />
      <div className="app">
        <Routes>
          <Route
            exact
            path="/"
            element={<Main />}
          />
          <Route
            exact
            path="/:movieId/:name/details"
            element={<Details />}
          />
          <Route
            path="*"
            element={<ErrorPage />}
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
