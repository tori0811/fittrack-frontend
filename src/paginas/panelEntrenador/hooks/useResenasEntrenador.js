import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";

export default function useResenasEntrenador() {
    const { token, user, role } = useContext(AuthContext);

    const [loading, setLoading] = useState(true);
    const [rating, setRating] = useState(null);
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        // solo si está logueado y es ENTRENADOR (tu rol real)
        if (!user || !token || role !== "entrenador") {
            console.log("⛔ No carga reseñas porque role es:", role);
            setLoading(false);
            return;
        }

        const trainerId = user.id;

        const fetchDatos = async () => {
            try {
                const resRating = await fetch(
                    `http://localhost:8000/api/entrenador/${trainerId}/rating`,
                    {
                        headers: {
                            "Authorization": `Bearer ${token}`,
                            "Accept": "application/json"
                        }
                    }
                );

                const resReviews = await fetch(
                    `http://localhost:8000/api/entrenador/${trainerId}/reviews`,
                    {
                        headers: {
                            "Authorization": `Bearer ${token}`,
                            "Accept": "application/json"
                        }
                    }
                );

                const jsonRating = await resRating.json();
                const jsonReviews = await resReviews.json();

                setRating(jsonRating);
                setReviews(jsonReviews);

            } catch (err) {
                console.error("Error cargando reseñas:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchDatos();
    }, [user, token, role]);

    return { loading, rating, reviews };
}
