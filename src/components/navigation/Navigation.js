import { Routes, Route } from "react-router-dom";
import { routes, AppRoutes } from "./Routes";

import React from "react";

export const Navigation = () => {
  return (
    <Routes>
      {routes.map((item, index) => {
        return (
          <Route key={index} path={item.path} element={<item.component />} />
        );
      })}
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
