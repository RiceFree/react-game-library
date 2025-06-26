import LazyLoadGameImage from "./LazyLoadGameImage";
import { useContext } from "react";
import FavoritesContext from "../context/FavoritesContext";
import { Link } from "react-router";

export default function GameCard({ data }) {
    const { removeFavorite } = useContext(FavoritesContext)
    const slug = data.game_name.trim().toLowerCase().replace(/[^a-z0-9 -]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-')
    return (
        <div className="card bg-base-300 shadow-lg">
            <figure className="md:h-30 2xl:h-40">
                <LazyLoadGameImage image={data.game_image} />
            </figure>
            <div className="card-body">
                <h2 className="card-title">
                    {data.game_name}
                </h2>
                <div className="card-actions justify-between">
                    <Link to={`/games/${slug}/${data.game_id}`} className="btn btn-primary">Vedi</Link>
                    <button type="button" onClick={() => removeFavorite(data.game_id)} className="btn btn-primary"> Rimuovi dai preferiti </button>
                </div>
            </div>
        </div>
    )
}