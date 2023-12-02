import React from "react";
import "./App.scss";
import Header from "./components/topHeader/Header";
import Main from "./components/main/Main";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Details from "./components/content/details/Details";
import ErrorBoundary from "./error/errorBoundary";

const App = (props) => {
  const routesArray = [
    {
      id: 1,
      path: "/",
      component: <Main />
    },
    {
      id: 2,
      path: "/:movieId/:name/details",
      component: <Details />
    }
  ];

  return (
    <Router>
      <ErrorBoundary>
        <Header />
      </ErrorBoundary>
      <div className="app">
        <Routes>
          {routesArray.map((routeData) => {
            return (
              <Route
                key={routeData.id}
                exact
                path={routeData.path}
                element={routeData.component}
                {...props}
              />
            );
          })}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
