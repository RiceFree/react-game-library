import { useCallback, useContext, useEffect, useState } from "react";
import supabase from "../supabase/supabase-client";
import FavoritesContext from "./FavoritesContext";
import SessionContext from "./SessionContext";

export default function FavoritesProvider({ children }) {
    const { session } = useContext(SessionContext)
    const [ favorites, setFavorites ] = useState([]);

    const userId = session?.user.id;

    const getFavorites = useCallback(async () => {
        if (!userId) return;
        let { data: favourites, error } = await supabase
        .from("favorites")
        .select("*")
        .eq("user_id", userId);
        if (error) {
        console.log(error);
        console.log("Errore in console");
        } else {
        setFavorites(favourites);
        }
    }, [userId]);

    const addFavorites = async (game) => {
        await supabase
        .from("favorites")
        .insert([
            {
            user_id: userId,
            game_id: game.id,
            game_name: game.name,
            game_image: game.background_image,
            },
        ])
        .select();

        getFavorites();
    };

    const removeFavorite = async (gameId) => {
        const { error } = await supabase
            .from("favorites")
            .delete()
            .eq("game_id", gameId)
            .eq("user_id", userId)

        getFavorites();
    };

    useEffect(() => {
        if (!userId) return;
            
        getFavorites()
        const favorites = supabase
            .channel("favorites")
            .on(
                "postgres_changes",
                { event: "*", schema: "public", table: "favorites" },
                () => getFavorites()
            )
            .subscribe();

        return () => {
            if (favorites) {
                supabase.removeChannel(favorites);
            }
            favorites.unsubscribe();
        };
    }, [getFavorites, userId]);

    return (
        <FavoritesContext.Provider value={{ 
            favorites, setFavorites, addFavorites, removeFavorite
         }}>
            { children }
        </FavoritesContext.Provider>
    )
}