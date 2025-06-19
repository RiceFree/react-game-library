import { Link } from "react-router";
import LazyLoadGameImage from "./LazyLoadGameImage";

export default function GameCard({ game }) {
    const currentdate = new Date();
    const threeMonthsAgo = new Date(currentdate.setMonth(currentdate.getMonth()-3));
    const isNew = threeMonthsAgo < new Date(game.released) && new Date() > new Date(game.released);
    const futureRelease = new Date() < new Date(game.released)
    
    return (
        <div className="card bg-base-300 shadow-lg">
            <figure className="md:h-30 2xl:h-40">
                <LazyLoadGameImage image={game.background_image} />
            </figure>
            <div className="card-body">
                <h2 className="card-title">
                    {game.name}
                    {futureRelease && <div className="badge badge-warning uppercase">presto</div>}
                    {isNew && <div className="badge badge-success uppercase">nuovo</div>}
                </h2>
                <p>{new Date(game.released).toLocaleString('it-IT', {year: "numeric", month: "long", day: "numeric",})}</p>
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