import React from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store";

import { ProtectedRoutes } from "./components/utils/ProtectedRoute";
import { PageLayout, Home, NoMatch, Landing } from "./components";

import "./css/main.css";

export const App = () => {
  return (
    <Routes>
      <Route element={<PageLayout />}>
        <Route index element={<Landing />} />
        <Route element={<ProtectedRoutes />}>
          <Route path="/home" element={<Home />} />
        </Route>
        <Route path="*" element={<NoMatch />} />
      </Route>
    </Routes>
  );
};

export default function Root() {
  return (
    <Provider store={store}>
      <HashRouter>
        <App />
      </HashRouter>
    </Provider>
  );
}
