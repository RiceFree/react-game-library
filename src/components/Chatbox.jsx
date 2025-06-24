import { useContext } from "react"
import SessionContext from "../context/SessionContext"
import supabase from "../supabase/supabase-client"
import RealtimeChat from "./RealtimeChat"

export default function Chatbox({ data }) {
    const { session } = useContext(SessionContext)

    const handleMessageSubmit = async (event) => {
        event.preventDefault();
        const inputMessage = event.currentTarget;
        const { message } = Object.fromEntries(new FormData(inputMessage));
        
        if (typeof message === 'string' && message.trim().length !== 0) {
            const { error } = await supabase
                .from("messages")
                .insert([
                    {
                        profile_id: session?.user.id,
                        profile_username: session?.user.user_metadata.username,
                        game_id: data.id,
                        content: message,
                    }
                ])
                .select();

            if (error) {
                console.log(error)
            } else {
                inputMessage.reset();
            }
        }
    }
    return (
        <>
            <h1 className="text-2xl font-pixelify">Chatbox</h1>
            <RealtimeChat data={data && data} />
            { session ? (
                    <form className="mt-4 flex flex-col gap-2" onSubmit={handleMessageSubmit}>
                        <textarea 
                            placeholder="Cosa ne pensi?" 
                            name="message"
                            className="textarea textarea-primary w-full"></textarea>
                        <button type="submit" className="btn btn-primary">Invia</button>
                    </form>
                ) : (
                    <div></div>
                )
            }
            
        </>
    )
}