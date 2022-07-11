import React from "react";
import "./App.scss";
import Header from "./components/header/Header";
import Main from "./components/main/Main";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Details from "./components/content/details/Details";
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
        </Routes>
      </div>
    </Router>
  );
};

export default App;
