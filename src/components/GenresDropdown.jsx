import { useEffect, useState } from "react";
import { Link } from "react-router";

export default function GenresDropdown() {
    const [genres, setGenres] = useState([]);
    const [error, setError] = useState(null);

    const initialUrl = `https://api.rawg.io/api/genres?key=72f626f7ecf846e6b62ea66064e32cfd`

    const load = async () => {
        try {
            const response = await fetch(initialUrl);
            if (!response.ok) {
                throw new Error(response.statusText);
            }
            const json = await response.json();
            setGenres(json);
        } catch (error) {
            setError(error.message);
            setGenres(null);
        }
    }

    useEffect(() => {
        load();
    }, []);

    return (
        <>
            <details>
                <summary>Generi</summary>
                <ul>
                    {genres && genres.results && genres.results.map((genre) => (
                        <li key={genre.id}>
                            <Link to={`/games/${genre.slug}`}>{genre.name}</Link>
                        </li>
                    ))}    
                </ul>
            </details>
        </>
    )
}