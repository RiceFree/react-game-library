import { BrowserRouter, Route, Routes } from "react-router";
import Layout from "../layout/Layout";
import Homepage from "../pages/homepage";
import ErrorPage from "../pages/error";
import GenrePage from "../pages/genrepage";
import GamePage from "../pages/gamepage";
import SearchPage from "../pages/searchpage";
import Register from "../pages/register";
import Login from "../pages/login";
import AccountPage from "../pages/account";

export default function Routing() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<Layout />}>
                    <Route path="/" element={<Homepage />} />
                    <Route path="/games/:genre" element={<GenrePage />} />
                    <Route path="/games/:slug/:id" element={<GamePage />} />
                    <Route path="/search" element={<SearchPage />} />
                    <Route path="/registrati" element={<Register />}/>
                    <Route path="/accedi" element={<Login />}/>
                    <Route path="/profilo" element={<AccountPage />}/>
                    <Route path="*" element={<ErrorPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}