import { useParams } from "react-router"
import useFetchSolution from "../../hook/useFetchSolution";
import ToggleFavorite from "../../components/ToggleFavorite";
import Chatbox from "../../components/Chatbox";
import LazyLoadGameImage from "../../components/LazyLoadGameImage";

export default function GamePage() {
    const { id } = useParams()

    const initialUrl = `https://api.rawg.io/api/games/${id}?key=72f626f7ecf846e6b62ea66064e32cfd`
    const { data, loading } = useFetchSolution(initialUrl);

    return (
        <>
            {loading && (
                <div>
                    <div className="skeleton w-full h-20 mb-6"></div>
                </div>
            )}
            <h1 className="text-6xl mb-6 font-jersey">{data && data.name}</h1>
            <ToggleFavorite data={data && data} />
            <div className="grid grid-cols-1 md:grid-cols-3 mt-4">
                <div className="md:col-span-2">
                    {loading && (
                        <div className="flex flex-col gap-4">
                            <div className="skeleton w-full h-96 mb-6"></div>
                            <div className="skeleton w-full h-4"></div>
                            <div className="skeleton w-full h-4"></div>
                            <div className="skeleton w-full h-4"></div>
                            <div className="skeleton w-full h-4"></div>
                            <div className="skeleton w-full h-4"></div>
                        </div>
                    )}
                    <LazyLoadGameImage image={ data?.background_image} />
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