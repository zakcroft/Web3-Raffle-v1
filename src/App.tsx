import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store";

import { PageLayout, Home, NoMatch } from "./components";

import "./css/main.css";

export const App = () => (
  <Routes>
    <Route element={<PageLayout />}>
      <Route index element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path="*" element={<NoMatch />} />
    </Route>
  </Routes>
);

export default function Root() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  );
}
