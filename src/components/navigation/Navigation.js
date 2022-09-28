import { Routes, Route, useLocation } from "react-router-dom";
import { routes, AppRoutes } from "./Routes";

import React from "react";
import { mapPaths } from "./routePaths";
import ImageMapperPage from "../pages/ImageMapperPage";

export const PrototypeNavigation = () => {
  // const location = useLocation();
  return (
    <Routes>
      {routes.map((item, index) => {
        return (
          <Route
            key={index}
            path={item.path}
            exact={item}
            element={<item.component />}
          />
        );
      })}

      <Route
        key={"image Mapper"}
        path={mapPaths.IMAGEMAPPERPAGE}
        // exact={item}
        element={<ImageMapperPage />}
      />
    </Routes>
  );
};

export const AppNavigation = () => {
  return (
    <Routes>
      {AppRoutes.map((item, index) => {
        return (
          <Route key={index} path={item.path} element={<item.component />} />
        );
      })}
    </Routes>
  );
};
