import { useEffect, useState } from "react";
import { Link } from "react-router";
import useFetchSolution from "../hook/useFetchSolution";

export default function GenresDropdown() {
    const initialUrl = `https://api.rawg.io/api/genres?key=72f626f7ecf846e6b62ea66064e32cfd`
    const { data: genres, loading, error, updateUrl } = useFetchSolution(initialUrl);

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