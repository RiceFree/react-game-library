import { BrowserRouter, Route, Routes } from "react-router";
import Layout from "../layout/Layout";
import Homepage from "../pages/Homepage";
import ErrorPage from "../error/Index";

export default function Routing() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<Layout />}>
                    <Route path="/" element={<Homepage />} />
                    <Route path="*" element={<ErrorPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}