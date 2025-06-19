import { useContext, useEffect, useState } from "react"
import SessionContext from "../../context/SessionContext"
import supabase from "../../supabase/supabase-client";
import Avatar from "../../components/Avatar";

export default function AccountPage() {
    const { session } = useContext(SessionContext);

    const [ loading, setLoading ] = useState(true);
    const [ username, setUsername ] = useState(null);
    const [ first_name, setFirstName ] = useState(null);
    const [ last_name, setLastName ] = useState(null);
    const [ avatar_url, setAvatarUrl ] = useState(null);

    useEffect(() => {
        let ignore = false
        const getProfile = async () => {
            setLoading(true)
            const { user } = session

            const { data, error } = await supabase
                .from('profiles')
                .select('first_name, last_name, username, avatar_url')
                .eq('id', user.id)
                .single()

            if (!ignore) {
                if (error) {
                    console.log(error)
                } else if (data) {
                    setUsername(data.username);
                    setFirstName(data.first_name);
                    setLastName(data.last_name);
                    setAvatarUrl(data.avatar_url);
                }
            }
            setLoading(false)
        }

        getProfile()

        return () => {
            ignore = true
        }
    }, [session])

    const updateProfile = async(event, avatarUrl) => {
        event.preventDefault()

        setLoading(true)

        const { user } = session

        const updates = {
            id: user.id,
            username,
            first_name,
            last_name,
            avatar_url: avatarUrl,
            updated_at: new Date()
        }

        const { error } = await supabase.from('profiles').upsert(updates)

        if (error) {
            alert(error.message)
        } else {
            setAvatarUrl(avatarUrl)
        }

        setLoading(false)
    }

    return (
        <form onSubmit={updateProfile} noValidate className="flex w-full h-screen sm:h-180 items-center justify-center">
            <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
            <legend className="fieldset-legend">Profilo</legend>

            <Avatar
                url={avatar_url}
                onUpload={(event, url) => {
                    updateProfile(event, url)
                }}
            />

            <label className="label pt-6">Email</label>
            <input 
                type="email" 
                id="email" 
                name="email" 
                value={session?.user.email}
                className="input"
                disabled
            />

            <label className="label">Nome</label>
            <input 
                type="text" 
                id="first_name" 
                name="first_name" 
                value={first_name || ''}
                onChange={(e) => setFirstName(e.target.value)}
                className="input" 
                required
            />

            <label className="label">Cognome</label>
            <input 
                type="text" 
                id="last_name" 
                name="last_name" 
                value={last_name || ''}
                onChange={(e) => setLastName(e.target.value)}
                className="input" 
                required
            />

            <label className="label">Username</label>
            <input 
                type="text" 
                id="username" 
                name="username" 
                value={username || ''}
                onChange={(e) => setUsername(e.target.value)}
                className="input" 
                required
            />

            <button type="submit" disabled={loading} className="btn btn-neutral mt-4">{loading ? 'Attendi...' : 'Salva'}</button>
            </fieldset>
        </form>
    )
}