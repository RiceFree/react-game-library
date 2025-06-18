import { Outlet } from "react-router";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { SidebarGame } from "../components/SidebarGame";

export default function Layout() {
    return (
        <div>
            <Header />
            <div className="drawer lg:drawer-open">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content">
                    <div className="pt-8 pb-4 px-2 md:px-16">
                        <Outlet />
                    </div>
                </div>
                <SidebarGame />
            </div>
            <Footer />
        </div>
    )
}