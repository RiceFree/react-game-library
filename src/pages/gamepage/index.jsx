import { useEffect, useState } from "react";
import { useParams } from "react-router"
import useFetchSolution from "../../hook/useFetchSolution";

export default function GamePage() {
    const { id } = useParams()

    const initialUrl = `https://api.rawg.io/api/games/${id}?key=72f626f7ecf846e6b62ea66064e32cfd`
    const { data, loading, error, updateUrl } = useFetchSolution(initialUrl);

    return (
        <>
            <h1 className="text-6xl mb-6 font-jersey">{data && data.name}</h1>
        </>
    )
}