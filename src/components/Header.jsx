import { Link } from "react-router";
import Searchbar from "./Searchbar";
import { useEffect, useState } from "react";
import supabase from "../supabase/supabase-client";

export default function Header() {
    const [ session, setSession ] = useState(null);

    const getSession = async () => {
        const { data, error } = await supabase.auth.getSession()
        if (error) console.log(error)
        if (data.session) {
            setSession(data)
        } else {
            setSession(null)
        }
    }

    const signOut = async () => {
        const { error } = await supabase.auth.signOut()
        if (error) console.log(error)
        alert("Signout")
        getSession();
    }

    useEffect(() => {
        getSession()
    }, [])
    return (
        <div className="navbar bg-base-100 shadow-sm">
            <div className="flex-1">
                <label htmlFor="my-drawer-2" className="lg:hidden btn btn-square btn-ghost drawer-button">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block h-5 w-5 stroke-current"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path> </svg>
                </label>
                <Link to={`/`} className="hidden lg:inline btn btn-ghost text-xl font-pixelify">React Game Library</Link>
            </div>
            <div className="flex gap-2">
                <Searchbar />
                {
                    session ? (
                        <div className="dropdown dropdown-end">
                            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                <div className="w-10 rounded-full">
                                <img
                                    alt="Tailwind CSS Navbar component"
                                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                                </div>
                            </div>
                            <ul
                                tabIndex={0}
                                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                                <li>
                                <a className="justify-between">
                                    Profile
                                    <span className="badge">New</span>
                                </a>
                                </li>
                                <li><a>Settings</a></li>
                                <li><button onClick={signOut}>Logout</button></li>
                            </ul>
                        </div>
                    ) : (
                        <>
                            <Link to={`/registrati`} className="btn">Registrati</Link>
                            <Link to={`/accedi`} className="btn">Accedi</Link>
                        </>
                    )
                }
            </div>
        </div>
    )
}