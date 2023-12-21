import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CountryPage from "./components/CountryPage";
import ResponsiveAppBar from "./components/ResponsiveAppBar";
import HomePage from "./routes/HomePage";

function App() {
  return (
    <>
    <BrowserRouter>
    <ResponsiveAppBar/>
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/country/:name" element={<CountryPage/>}></Route>
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
