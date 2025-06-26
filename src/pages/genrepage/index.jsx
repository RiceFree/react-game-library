import { useEffect, useState } from "react"
import { useParams } from "react-router"
import GameCard from "../../components/GameCard";
import useFetchSolution from "../../hook/useFetchSolution";

export default function GenrePage() {
    const { genre } = useParams()

    const initialUrl = `https://api.rawg.io/api/games?key=9269195f491e44539d7a2d10ce87ab15&genres=${genre}&page=1`
    const { data, loading, error, updateUrl } = useFetchSolution(initialUrl);

    useEffect(() => {
        updateUrl(initialUrl)
    }, [initialUrl, updateUrl])

    return (
        <>
            <h1 className="text-6xl mb-6 font-jersey">Genere: {genre}</h1>
             <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                {error && <div>{error}</div>}
                {loading && ([...Array(16)].map((e,i) => {
                    return (
                        <div key={'skel'+i} className="flex flex-col gap-4">
                            <div className="skeleton h-42 w-full"></div>
                            <div className="skeleton h-4 w-28"></div>
                            <div className="skeleton h-4 w-full"></div>
                            <div className="skeleton h-4 w-full"></div>
                        </div>
                    )}))
                }
                {data && data.results.map((game, key) => <GameCard key={key} game={game} />)}
            </div>
        </>
    )
}