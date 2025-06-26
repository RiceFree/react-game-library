import GameCard from "../../components/GameCard";
import useFetchSolution from "../../hook/useFetchSolution";

export default function Homepage() {
    const initialUrl = 'https://api.rawg.io/api/games?key=72f626f7ecf846e6b62ea66064e32cfd&dates=2025-01-01,2025-12-31&page=1'
    const { data, loading, error } = useFetchSolution(initialUrl);

    return (
        <>
            <h1 className="text-6xl mb-6 font-jersey">Tutti i giochi</h1>
            
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