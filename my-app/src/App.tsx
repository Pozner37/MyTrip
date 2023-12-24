import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ResponsiveAppBar from "./components/ResponsiveAppBar";
import HomePage from "./routes/HomePage";
import CountryPage from "./routes/CountryPage";
import { GoogleOAuthProvider } from "@react-oauth/google";

function App() {
  return (
    <GoogleOAuthProvider clientId="999188403168-50hsegkfkhput286r1ie6q208balov63.apps.googleusercontent.com">
    <BrowserRouter>
    <ResponsiveAppBar/>
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/country/:name" element={<CountryPage/>}></Route>
      </Routes>
    </BrowserRouter>
    </GoogleOAuthProvider>
  );
}

export default App;
