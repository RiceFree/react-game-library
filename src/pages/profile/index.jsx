import { useContext } from "react";
import GameFavoriteCard from "../../components/GameFavoriteCard";
import SessionContext from "../../context/SessionContext";
import FavoritesContext from "../../context/FavoritesContext";

export default function Profile() {
    const { session } = useContext(SessionContext);
    const { favorites } = useContext(FavoritesContext)

    return (
        <>
            <h1 className="text-6xl mb-6 font-jersey">{session?.user.user_metadata.username}</h1>
            <h2 className="text-2xl mb-4">I tuoi giochi preferiti:</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                {favorites && favorites.map((data) => <GameFavoriteCard key={data.id} data={data} />)}
            </div>
        </>
    )
}