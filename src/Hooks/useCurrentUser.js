// src/hooks/useCurrentUser.js
import { useEffect, useState } from "react";

export default function useCurrentUser() {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  // 🧭 Escucha los cambios de userUpdated
  useEffect(() => {
    const handleUserUpdate = () => {
      const updated = JSON.parse(localStorage.getItem("user"));
      setCurrentUser(updated);
    };

    window.addEventListener("userUpdated", handleUserUpdate);
    return () => window.removeEventListener("userUpdated", handleUserUpdate);
  }, []);

  return currentUser;
}
