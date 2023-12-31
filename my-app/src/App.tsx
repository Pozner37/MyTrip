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

function App() {
  return (
    <Provider store={store}>
    <GoogleOAuthProvider clientId="999188403168-50hsegkfkhput286r1ie6q208balov63.apps.googleusercontent.com">
        <BrowserRouter>
        <ResponsiveAppBar/>
          <Routes>
            <Route path="/" element={<HomePage />}></Route>
            <Route path="/country/:name" element={<CountryPage/>}></Route>
            <Route path="/myposts" element={<MyPostsPage/>}></Route>
          </Routes>
        </BrowserRouter>
    <AuthModal/>
    </GoogleOAuthProvider>
    </Provider>
  );
}

export default App;
