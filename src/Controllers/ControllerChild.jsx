import { useState, useEffect } from 'react';
import ModelChild from '../Models/modelChild.jsx';
import GetChild from '../Services/serviceChild.jsx';
export default function ControllerChild() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    GetChild().then((data) => {
      const userModels = data.map((user) => new ModelChild(user));
      setUsers(userModels);
    });
  }, []);
  return users;
}
