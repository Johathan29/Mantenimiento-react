import { useEffect, useState } from "react";
import { getFirestore, doc, setDoc, getDoc, collection, getDocs } from "firebase/firestore/lite";
import { db } from "../Firebase/congif";


async function getUserIP() {
  const res = await fetch("https://api.ipify.org?format=json");
  const data = await res.json();
  return data.ip;
}

export function useProductRating(productId) {
  const [rating, setRating] = useState(0);
  const [avgRating, setAvgRating] = useState(0);
  const [totalVotes, setTotalVotes] = useState(0);

  useEffect(() => {
    async function fetchRatings() {
      const colRef = collection(db, `products/${productId}/ratings`);
      const snap = await getDocs(colRef);

      let sum = 0;
      snap.forEach((doc) => (sum += doc.data().rating));
      const total = snap.size;

      setAvgRating(total ? sum / total : 0);
      setTotalVotes(total);
    }
    fetchRatings();
  }, [productId]);

  const vote = async (value) => {
    const ip = await getUserIP();
    const ref = doc(db, `products/${productId}/ratings`, ip);

    // revisa si ya existe el voto
    const existing = await getDoc(ref);
    if (existing.exists()) {
      alert("Ya votaste por este producto.");
      return;
    }

    await setDoc(ref, {
      rating: value,
      createdAt: new Date(),
    });

    setRating(value);
  };

  return { rating, avgRating, totalVotes, vote };
}
function ProductCard({ product }) {
  const { rating, avgRating, totalVotes, vote } = useProductRating(product.id);

  return (
    <div>
      <h3>{product.Name}</h3>

      {/* Estrellas */}
      <div className="flex gap-1">
        {[...Array(5)].map((_, i) => (
          <Star key={i} filled={i + 1 <= rating} onClick={() => vote(i + 1)} />
        ))}
      </div>

      <p className="text-sm text-gray-500">
        Promedio: {avgRating.toFixed(1)} ⭐ ({totalVotes} votos)
      </p>
    </div>
  );
}
