import { useEffect, useState } from "react";
import GameCard from "../../components/GameCard";
import GenresDropdown from "../../components/GenresDropdown";

export default function Homepage() {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    const initialUrl = 'https://api.rawg.io/api/games?key=72f626f7ecf846e6b62ea66064e32cfd&dates=2024-01-01,2024-12-31&page=1'

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
    }, []);

    return (
        <>
            <h1 className="text-6xl mb-6 font-pixelify">Tutti i giochi</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                {error && <div>{error}</div>}
                {data && data.results.map((game, key) => <GameCard key={key} game={game} />)}
            </div>
        </>
    )
}