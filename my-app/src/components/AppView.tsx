import { BrowserRouter, Routes, Route } from "react-router-dom";
import CountryPage from "../routes/CountryPage";
import HomePage from "../routes/HomePage";
import MyPostsPage from "../routes/MyPostsPage";
import AuthModal from "./AuthModal";
import ResponsiveAppBar from "./ResponsiveAppBar";
import useGetUser from "../hooks/useGetUser";
import ChatPage from "../routes/ChatPage";
import MyProfile from "../routes/MyProfile";

const AppView = () => {
    useGetUser();

    return (
        <>
            <BrowserRouter>
                <ResponsiveAppBar/>
                <Routes>
                    <Route path="/" element={<HomePage />}></Route>
                    <Route path="/country/:name" element={<CountryPage/>}></Route>
                    <Route path="/myposts" element={<MyPostsPage/>}></Route>
                    <Route path="/chat" element={<ChatPage />}></Route>
                    <Route path="/myProfile" element={<MyProfile />}></Route>
                </Routes>
            </BrowserRouter>
            <AuthModal/>
        </>
    )
}

export default AppView;