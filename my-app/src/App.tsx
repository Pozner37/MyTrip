import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ResponsiveAppBar from "./components/ResponsiveAppBar";
import HomePage from "./routes/HomePage";
import CountryPage from "./routes/CountryPage";
import { GoogleOAuthProvider } from "@react-oauth/google";
import AuthModal from "./components/AuthModal";
import { Provider, useDispatch } from "react-redux";
import store from "./redux/store";
import MyPostsPage from "./routes/MyPostsPage";
import AppView from "./components/AppView";

function App() {
  return (
    <Provider store={store}>
    <GoogleOAuthProvider clientId="my-key">
        <AppView/>
    </GoogleOAuthProvider>
    </Provider>
  );
}

export default App;
