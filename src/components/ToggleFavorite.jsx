import { useContext, useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import FavoritesContext from "../context/FavoritesContext";
import SessionContext from "../context/SessionContext";


export default function ToggleFavorite({ data }) {
    const { session } = useContext(SessionContext)
    const { favorites, addFavorites, removeFavorites } = useContext(FavoritesContext)
    const isFavorite = () => favorites.find((el) => el.game_id === data?.id)

    return (
        <>
            {
                session ? (
                    isFavorite() ? (
                        <button type='button' onClick={() => removeFavorites(data)} className="btn btn-primary btn-circle">
                            <FaHeart />
                        </button>
                    ) : (
                        <button type='button' onClick={() => addFavorites(data)} className="btn btn-secondary btn-circle">
                            <FaRegHeart />
                        </button>
                    )
                ) : 
                (
                    <div></div>
                )
            }
           
        </>
    );
}