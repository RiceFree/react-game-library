import { Link, useNavigate } from "react-router";
import Searchbar from "./Searchbar";
import { useContext, useEffect, useState } from "react";
import supabase from "../supabase/supabase-client";
import SessionContext from "../context/SessionContext";

export default function Header() {
    const navigate = useNavigate();
    const { session } = useContext(SessionContext)
    const [ avatar_url, setAvatarUrl ] = useState(null);

     useEffect(() => {
        const getAvatar = async () => {
            const { user } = session

            const { data, error } = await supabase
                .from('profiles')
                .select('avatar_url')
                .eq('id', user.id)
                .single()

            if (error) {
                console.warn(error)
            } else if (data) {
                const path =data.avatar_url;
                 try {
                    const { data, error } = await supabase.storage.from('avatars').download(path)
                    if (error) {
                        throw error
                }
                const url = URL.createObjectURL(data)
                setAvatarUrl(url)
                } catch (error) {
                    console.log('Error downloading image: ', error.message)
                }
            }
        }

        getAvatar()

    }, [session])
    

    const signOut = async () => {
        const { error } = await supabase.auth.signOut()
        if (error) console.log(error)
        navigate(`/`);
    }

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
                                    {avatar_url ? (
                                        <img src={avatar_url} />
                                    ) : (
                                        <img src="https://img.daisyui.com/images/profile/demo/yellingcat@192.webp" />
                                    )}
                                
                                </div>
                            </div>
                            <ul
                                tabIndex={0}
                                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                                <li>Ciao, {session?.user.user_metadata.first_name}!</li>
                                <li><Link to={`/profilo`}>Profilo</Link></li>
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