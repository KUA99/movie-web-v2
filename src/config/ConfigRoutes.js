import React from "react";
import { Route, Routes } from "react-router-dom";

import { Catalog } from "../components/catalog/Catalog";
import { Detail } from "../components/detail/Detail";
import { Home } from "../components/home/Home";
import Login from "../components/login/Login";

export const ConfigRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Home />} />
      <Route path="/:category" element={<Catalog />} />
      <Route path="/:category/:id" element={<Detail />} />
      <Route path="/:category/search/:keyword" element={<Catalog />} />
    </Routes>
  );
};
