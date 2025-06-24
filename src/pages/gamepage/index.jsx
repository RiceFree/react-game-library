import { useParams } from "react-router"
import useFetchSolution from "../../hook/useFetchSolution";
import ToggleFavorite from "../../components/ToggleFavorite";
import Chatbox from "../../components/Chatbox";

export default function GamePage() {
    const { id } = useParams()

    const initialUrl = `https://api.rawg.io/api/games/${id}?key=72f626f7ecf846e6b62ea66064e32cfd`
    const { data, loading, error, updateUrl } = useFetchSolution(initialUrl);

    return (
        <>
            <h1 className="text-6xl mb-6 font-jersey">{data && data.name}</h1>
            <ToggleFavorite data={data && data} />
            <div className="grid grid-cols-1 md:grid-cols-3 mt-4">
                <div className="md:col-span-2">
                    <img src={ data?.background_image} alt="game image" />
                    <div className="my-6">
                        { data?.description_raw}
                    </div>
                </div>
                <div className="mx-3 border border-primary rounded px-6 py-4">
                    <Chatbox data={data && data} />
                </div>

            </div>
        </>
    )
}