import { BrowserRouter, Routes, Route } from "react-router-dom";
import CountryPage from "../routes/CountryPage";
import HomePage from "../routes/HomePage";
import MyPostsPage from "../routes/MyPostsPage";
import AuthModal from "./AuthModal";
import ResponsiveAppBar from "./ResponsiveAppBar";
import useGetUser from "../hooks/useGetUser";

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
                    </Routes>
                </BrowserRouter>
            <AuthModal/>
        </>
    )
}

export default AppView;