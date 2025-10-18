import { useEffect, useState } from "react";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  collection,
  getDocs,
} from "firebase/firestore";
import  {getAuth}  from "firebase/auth";

export function useProductRating(productId) {
  const db = getFirestore();
  const auth = getAuth();

  const [avgRating, setAvgRating] = useState(0);
  const [totalVotes, setTotalVotes] = useState(0);
  const [rating, setRating] = useState(0); // rating del usuario actual

  // 🔹 Obtener rating promedio y usuario
  useEffect(() => {
    if (!productId) return;

    const fetchRatings = async () => {
      const statsRef = doc(db, "ratings", productId, "meta", "stats");
      const user = auth.currentUser;
      const userId = user?.uid;

      try {
        // obtener stats
        const statsSnap = await getDoc(statsRef);
        if (statsSnap.exists()) {
          setAvgRating(statsSnap.data().avgRating);
          setTotalVotes(statsSnap.data().totalVotes);
        }

        // obtener rating del usuario si existe
        if (userId) {
          const userRatingRef = doc(db, "ratings", productId, "votes", userId);
          const userSnap = await getDoc(userRatingRef);
          if (userSnap.exists()) setRating(userSnap.data().rating);
        }
      } catch (e) {
        console.error("Error obteniendo rating:", e);
      }
    };

    fetchRatings();
  }, [productId]);

  // 🔹 Cuando el usuario hace click en una estrella
  const vote = async (value) => {
    const user = auth.currentUser;
    if (!user) return alert("Debes iniciar sesión para votar");

    const userId = user.uid;
    const userRef = doc(db, "ratings", productId, "votes", userId);
    const statsRef = doc(db, "ratings", productId, "meta", "stats");

    try {
      // Guardar el voto del usuario
      await setDoc(userRef, { rating: value });

      // Recalcular promedio global
      const votesSnap = await getDocs(collection(db, "ratings", productId, "votes"));
      const allRatings = votesSnap.docs.map((d) => d.data().rating);
      const avg = allRatings.reduce((a, b) => a + b, 0) / allRatings.length;

      await setDoc(statsRef, { avgRating: avg, totalVotes: allRatings.length });

      setRating(value);
      setAvgRating(avg);
      setTotalVotes(allRatings.length);
    } catch (e) {
      console.error("Error guardando voto:", e);
    }
  };

  return { rating, avgRating, totalVotes, vote };
}
