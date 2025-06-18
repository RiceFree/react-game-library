import { useEffect, useState } from "react";
import { useParams } from "react-router"

export default function GamePage() {
    const { id } = useParams()

    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    const initialUrl = `https://api.rawg.io/api/games/${id}?key=72f626f7ecf846e6b62ea66064e32cfd`

    const load = async () => {
        try {
            const response = await fetch(initialUrl);
            if (!response.ok) {
                throw new Error(response.statusText);
            }
            const json = await response.json();
            setData(json);
            
        } catch (error) {
            setError(error.message);
            setData(null);
        }
    }

    useEffect(() => {
        load();
    }, [id]);
    return (
        <>
            <h1 className="text-6xl mb-6 font-pixelify">{data && data.name}</h1>
        </>
    )
}