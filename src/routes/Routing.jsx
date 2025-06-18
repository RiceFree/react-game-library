import { BrowserRouter, Route, Routes } from "react-router";
import Layout from "../layout/Layout";
import Homepage from "../pages/homepage";
import ErrorPage from "../pages/error";
import GenrePage from "../pages/genrepage";
import GamePage from "../pages/gamepage";

export default function Routing() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<Layout />}>
                    <Route path="/" element={<Homepage />} />
                    <Route path="/games/:genre" element={<GenrePage />} />
                    <Route path="/games/:slug/:id" element={<GamePage />} />
                    <Route path="*" element={<ErrorPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}