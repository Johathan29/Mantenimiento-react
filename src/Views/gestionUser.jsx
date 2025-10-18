import React, { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, collection, onSnapshot, doc, getDoc } from "firebase/firestore";

// AdminRolesPanel.jsx
// Requisitos:
//  - Tener firebase client configurado (initializeApp) y exportar auth + db.
//  - Un endpoint backend protegido: POST /api/assign-role { uid, role }
//    que usa Firebase Admin SDK para setCustomUserClaims(uid, { role })
//    (idealmente el backend también actualiza users/{uid}.role en Firestore).

export default function AdminRolesPanel({ backendUrl = "/api" }) {
  const auth = getAuth();
  const db = getFirestore();

  const [currentUser, setCurrentUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [savingUid, setSavingUid] = useState(null);
  const [error, setError] = useState(null);

  // Roles disponibles
  const ROLES = ["user", "seller", "admin"];

  // Escuchar sesión y obtener claims
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (u) => {
      if (!u) {
        setCurrentUser(null);
        setIsAdmin(false);
        return;
      }
      setCurrentUser(u);
      try {
        const token = await u.getIdTokenResult(true);
        const role = token.claims.role || "user";
        setIsAdmin(role === "admin");
      } catch (e) {
        console.error("No se pudo obtener id token:", e);
        setIsAdmin(false);
      }
    });
    return () => unsub();
  }, [auth]);
console.log(users)
  // Escuchar colección `users` en Firestore en tiempo real
  useEffect(() => {
    if (!isAdmin) return;
    setLoading(true);
    const usersCol = collection(db, "users");
    const unsub = onSnapshot(
      usersCol,
      (snap) => {
        const arr = snap.docs.map((d) => ({ uid: d.id, ...d.data() }));
        setUsers(arr);
        setLoading(false);
      },
      (err) => {
        console.error("Error snapshot users:", err);
        setError(err.message);
        setLoading(false);
      }
    );
    return () => unsub();
  }, [db, isAdmin]);

  // Filtrar lista
  const filtered = users.filter((u) => {
    if (!query) return true;
    const q = query.toLowerCase();
    return (
      (u.email || "").toLowerCase().includes(q) ||
      (u.displayName || "").toLowerCase().includes(q) ||
      (u.uid || "").toLowerCase().includes(q)
    );
  });

  // Cambiar rol: llama al backend que usa Firebase Admin para setCustomUserClaims
  const changeRole = async (uid, role) => {
    if (!currentUser) return alert("Debes iniciar sesión como admin para hacer esto.");
    if (!isAdmin) return alert("Solo admins pueden asignar roles.");

    setSavingUid(uid);
    setError(null);

    try {
      const token = await currentUser.getIdToken();
      const res = await fetch(`${backendUrl}/assign-role`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ uid, role }),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body?.error || `Status ${res.status}`);
      }

      // Éxito: el backend idealmente actualiza users/{uid}.role en Firestore.
      // Si no lo hace, aquí hacemos una comprobación puntual para forzar refresco de la doc.
      const userDocRef = doc(db, "users", uid);
      const userSnap = await getDoc(userDocRef);
      if (userSnap.exists()) {
        // refrescamos manualmente la lista (opcional)
        setUsers((prev) => prev.map((p) => (p.uid === uid ? { ...p, role } : p)));
      }

      setSavingUid(null);
    } catch (e) {
      console.error("Error asignando rol:", e);
      setError(e.message);
      setSavingUid(null);
    }
  };

  if (!currentUser) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <p className="text-lg">Inicia sesión con una cuenta admin para ver este panel.</p>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <p className="text-lg text-yellow-700">Acceso denegado — necesitas rol <strong>admin</strong>.</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-4">Panel: Administrar Roles de Usuarios</h2>

      <div className="mb-4 flex items-center gap-3">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full border rounded-md px-3 py-2"
          placeholder="Buscar por email, nombre o uid..."
        />
      </div>

      {loading ? (
        <div className="p-6 bg-white rounded-md shadow">Cargando usuarios...</div>
      ) : (
        <div className="bg-white rounded-md shadow overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr className="text-left">
                <th className="px-4 py-3">UID</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Nombre</th>
                <th className="px-4 py-3">Rol</th>
                <th className="px-4 py-3">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((u) => (
                <tr key={u.uid} className="border-t">
                  <td className="px-4 py-3 text-sm font-mono text-gray-600">{u.uid}</td>
                  <td className="px-4 py-3">{u.email || "—"}</td>
                  <td className="px-4 py-3">{u.displayName || "—"}</td>
                  <td className="px-4 py-3">
                    <span className="inline-block px-3 py-1 rounded-full text-sm bg-gray-100">{u.role || "user"}</span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <select
                        value={u.role || "user"}
                        onChange={(e) => changeRole(u.uid, e.target.value)}
                        disabled={savingUid === u.uid}
                        className="border rounded-md px-2 py-1"
                      >
                        {ROLES.map((r) => (
                          <option key={r} value={r}>
                            {r}
                          </option>
                        ))}
                      </select>

                      <button
                        onClick={() => changeRole(u.uid, "user")}
                        disabled={savingUid === u.uid}
                        className="px-3 py-1 rounded-md bg-red-50 text-red-700 border"
                      >
                        Reset
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {error && (
        <div className="mt-4 text-sm text-red-600">Error: {error}</div>
      )}

      <div className="mt-6 text-sm text-gray-500">
        Nota: El endpoint <code className="bg-gray-100 px-2 py-1 rounded">POST {backendUrl}/assign-role</code> debe
        existir en tu backend y asignar custom claims (setCustomUserClaims) para que los cambios tengan efecto
        inmediato. Es recomendable que el backend también escriba el rol en <code>users/{'{uid}'}</code> para
        poder listar roles desde Firestore.
      </div>
    </div>
  );
}
