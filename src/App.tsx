import React from 'react';
import {Route, Routes } from 'react-router-dom';
import HomePage from "./pages/HomePage";
import FavoritesPage from "./pages/FavoritesPage";
import Navigation from "./components/Navigation";

function App() {
  return (
    <>
        <Navigation/>
        <Routes>
            <Route path={'/'} element={<HomePage />}></Route>
            <Route path={'/favorites'} element={<FavoritesPage />}></Route>
        </Routes>
    </>
  );
}

export default App;
