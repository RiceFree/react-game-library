import { Link } from "react-router";
import LazyLoadGameImage from "./LazyLoadGameImage";

export default function GameCard({ game }) {
    return (
        <div className="card bg-base-300 shadow-lg">
            <figure className="md:h-30 2xl:h-40">
                <LazyLoadGameImage image={game.background_image} />
            </figure>
            <div className="card-body">
                <h2 className="card-title">
                    {game.name}
                    <div className="badge badge-secondary">NEW</div>
                </h2>
                <p>{game.released}</p>
                <div className="card-actions justify-end">
                    {
                        game.genres.map((genre) => <div key={game.name+genre.id} className="badge badge-outline">{genre.name}</div>)
                    }                    
                </div>
                <div className="card-actions justify-end">
                    <button className="btn btn-primary">
                        <Link to={`/games/${game.slug}/${game.id}`}>
                            Vedi
                        </Link>
                    </button>
                </div>
            </div>
        </div>
    )
}