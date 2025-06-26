import { useCallback, useEffect, useRef, useState } from "react";
import supabase from "../supabase/supabase-client";

export default function RealtimeChat({ data }) {
    const [messages, setMessages] = useState([]);
    const [loadingInitial, setLoadingInitial] = useState(false);
    const [error, setError] = useState("");
    const messageRef = useRef(null);

    const getInitialMessages = useCallback(async () => {
        setLoadingInitial(true);
        const { data: messages, error } = await supabase
            .from("messages")
            .select()
            .eq("game_id", data?.id)
        if (error) {
            setError(error.message);
            return;
        }
        setLoadingInitial(false);
        setMessages(messages);
    }, [data?.id])

    useEffect(() => {
        if (!data?.id) return;

        if (data) {
            getInitialMessages();
        }
        const channel = supabase
            .channel("messages")
            .on(
                "postgres_changes",
                {
                    event: "*",
                    schema: "public",
                    table: "messages",
                },
                () => getInitialMessages()
            )
            .subscribe();

        return () => {
            if (channel) {
                supabase.removeChannel(channel);
            };
            channel.unsubscribe();
        };
    }, [data, getInitialMessages])

    return (
        <div ref={messageRef}>
            { error && <p>{error}</p> }
            { messages && messages.map((message) => (
                <div key={message.id} className="chat chat-start">
                    <div className="chat-header">
                        {message.profile_username}
                        <time className="text-xs opacity-50">
                            {new Date(message.updated_at).toLocaleString('it-IT', {year: "numeric", month: "numeric", day: "numeric", hour: "2-digit", minute: "2-digit"})}
                        </time>
                    </div>
                <div className="chat-bubble">{ message.content }</div>
            </div>
            ))}
        </div>
    )
}