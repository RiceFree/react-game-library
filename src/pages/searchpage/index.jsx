import { useSearchParams } from "react-router"
import useFetchSolution from "../../hook/useFetchSolution";
import GameCard from "../../components/GameCard";
import { useEffect } from "react";

export default function SearchPage() {
    let [ searchParams ] = useSearchParams()
    const game = searchParams.get("query")

    const initialUrl = `https://api.rawg.io/api/games?key=72f626f7ecf846e6b62ea66064e32cfd&search=${game}`
    const { data, loading, error, updateUrl } = useFetchSolution(initialUrl);

    useEffect(() => {
        updateUrl(initialUrl)
    }, [initialUrl, updateUrl])

    return (
        <>
        <h1 className="text-6xl mb-6 font-jersey">Risultati per: {game}</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            {error && <div>{error}</div>}
            {data && data.results.map((game, key) => <GameCard key={key} game={game} />)}
        </div>
        </>
  )
}