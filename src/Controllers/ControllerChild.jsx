import { useState, useEffect } from 'react';
import ModelChild from '../Models/modelChild.jsx';
import GetChild from '../Services/serviceChild.jsx';

export default function useChildData() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    GetChild()
      .then((data) => {
        const userModels = data.map((user) => new ModelChild(user));
        setUsers(userModels);
      })
      .catch((err) => {
        console.error('Error fetching users:', err);
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return { users, loading, error };
}
